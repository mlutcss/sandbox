import { LitElement, html } from 'lit';
import { initialLayout, initialConfig, errorLayout, errorStyles } from '../assets/data/initial-code.js';

import { ContextConsumer } from '@lit/context';
import { eventBusContext } from '../assets/scripts/eventBusContext.js';

export class CodePreview extends LitElement {
	_markupPath = 'index.html';

	createRenderRoot() {
		return this;
	}

	static properties = {
		cssStyles: { type: String },
	};

	async firstUpdated() {
		this.eventBus.on('update-html', this.handleUpdate);
		this.eventBus.on('update-sass', this.handleUpdate);
		const { jitEngine } = await import('https://unpkg.com/@mlut/core@latest/dist/index.js');
		await jitEngine.init(['config.scss', initialConfig]);
		this.mlutEngine = jitEngine;
		this.iframeDoc = this.querySelector('iframe').contentDocument;
		await this.updateCSS(initialLayout, initialConfig);
		this.classList.remove('loader');
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.eventBus.off('update-html', this.handleUpdate);
		this.eventBus.off('update-sass', this.handleUpdate);
	}

	handleUpdate = async (event) => {
		if (event.detail.lang === 'html') {
			this.htmlLayout = event.detail.updatedData;
		} else if (event.detail.lang === 'sass') {
			this.sassConfig = event.detail.updatedData;
		}

		await this.updateCSS(this.htmlLayout, this.sassConfig, event.detail.lang);
	};

	async updateCSS(layout, config, lang) {
		if (lang === 'sass') {
			await this.mlutEngine.updateSassConfig(config);
		}

		this.mlutEngine.putContent(this._markupPath, layout);
		this.cssStyles = await this.mlutEngine.generateCss();

		if (this.cssStyles) {
			this.fillIframe(layout, this.cssStyles);
			this.eventBus.emit('update-css', {
				detail: {
					target: this,
					updatedData: this.cssStyles,
					lang: 'css'
				}
			});
		} else {
			this.fillIframe(errorLayout, errorStyles);
		}
	}

	fillIframe(layout, styles) {
		this.iframeDoc.head.innerHTML = `<style>${styles}</style>`;
		this.iframeDoc.body.innerHTML = layout;
	}

	constructor() {
		super();
		new ContextConsumer(this, {
			context: eventBusContext,
			callback: (bus) => {
				this.eventBus = bus;
			}
		});
	}

	render() {
		return html`<iframe class="-Sz100p Bd0" sandbox="allow-same-origin"></iframe>
		`;
	}
}

customElements.define('code-preview', CodePreview);

