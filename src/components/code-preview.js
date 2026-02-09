import { LitElement, html } from 'lit';
import { errorLayout, errorStyles } from '../assets/data/initial-code.js';

import { ContextConsumer } from '@lit/context';
import { eventBusContext } from '../assets/scripts/eventBusContext.js';
import { currentCodeContext } from '../assets/scripts/currentCodeContext.js';

import { events } from '../assets/data/events.js';

export class CodePreview extends LitElement {
	_markupPath = 'index.html';

	createRenderRoot() {
		return this;
	}

	static properties = {
		cssStyles: { type: String },
	};

	async firstUpdated() {
		this.eventBus.on(events.updateCode, this.handleUpdate);
		this.eventBus.on(events.editorInit, this.handleFirstUpdate);

		if (this.currentCode.currentLayout) {
			await this.initJitEngine(this.currentCode.currentLayout, this.currentCode.currentConfig);
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.eventBus.off(events.updateCode, this.handleUpdate);
	}

	handleFirstUpdate = async (event) => {
		await this.initJitEngine(event.detail.html, event.detail.sass);
	};

	async initJitEngine(layout, config) {
		this.htmlLayout = layout;
		this.sassConfig = config;
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
			this.eventBus.emit(events.updateCss, {
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
		new ContextConsumer(this, {
			context: currentCodeContext,
			callback: (currentCode) => {
				this.currentCode = currentCode;
			}
		});
	}

	render() {
		return html`<iframe class="-Sz100p Bd0" sandbox="allow-same-origin"></iframe>
		`;
	}
}

customElements.define('code-preview', CodePreview);
