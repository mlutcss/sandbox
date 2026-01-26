import { LitElement, html } from 'lit';
import { errorLayout, errorStyles } from '../assets/data/initial-code.js';

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
		this.eventBus.on('update-code', this.handleUpdate);
		this.eventBus.on('first-update', this.handleFirstUpdate)

	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.eventBus.off('update-code', this.handleUpdate);
	}

	handleFirstUpdate = async (event) => {
		this.htmlLayout = event.detail.html;
		this.sassConfig = event.detail.sass;
		const { jitEngine } = await import('https://unpkg.com/@mlut/core@latest/dist/index.js');
		this.mlutEngine = jitEngine;
		await this.mlutEngine.init(['config.scss', this.sassConfig]);
		this.iframeDoc = this.querySelector('iframe').contentDocument;
		await this.updateCSS(this.htmlLayout, this.sassConfig);
		this.classList.remove('loader');
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
