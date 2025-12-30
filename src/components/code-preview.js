import { LitElement, html } from 'lit';
import { initialLayout, initialConfig, errorLayout, errorStyles } from '../assets/data/initial-code.js';

import { ContextConsumer } from '@lit/context';
import { eventBusContext } from './main-comp.js';

export class CodePreview extends LitElement {
	_eventBus = new ContextConsumer(this, { context: eventBusContext });
	_markupPath = 'index.html';

	createRenderRoot() {
		return this;
	}

	static properties = {
		htmlLayout: { type: String },
		cssStyles: { type: String },
		isValid: { type: Boolean },
		inProgress: { type: Boolean },
	};

	async firstUpdated() {
		this._eventBus.value.on('update-html', this.handleUpdate);
		this._eventBus.value.on('update-sass', this.handleUpdate);
		const { jitEngine } = await import('https://unpkg.com/@mlut/core@latest/dist/index.js');
		await jitEngine.init(['config.scss', initialConfig]);
		this.mlutEngine = jitEngine;
		await this.updateCSS(initialLayout, initialConfig);
		this.inProgress = false;
	}

	disconnectedCallback() {
		this._eventBus.value.off('update-html', this.handleUpdate);
		this._eventBus.value.off('update-sass', this.handleUpdate);
	}

	handleUpdate = async (event) => {
		if (event.detail.lang === 'html') {
			this.htmlLayout = event.detail.updatedData;
		} else if (event.detail.lang === 'sass') {
			this.config = event.detail.updatedData;
		}

		await this.updateCSS(this.htmlLayout, this.config, event.detail.lang);
	};

	async updateCSS(layout, config, lang) {
		if (lang === 'sass') {
			await this.mlutEngine.updateSassConfig(config);
		}

		this.mlutEngine.putContent(this._markupPath, layout);
		this.cssStyles = await this.mlutEngine.generateCss();

		if (this.cssStyles) {
			this.isValid = true;
			this._eventBus.value.emit('update-css', {
				detail: {
					target: this,
					updatedData: this.cssStyles,
					lang: 'css'
				}
			});
		} else {
			this.isValid = false;
		}
	}

	constructor() {
		super();
		this.htmlLayout = initialLayout;
		this.config = initialConfig;
		this.isValid = true;
		this.inProgress = true;
	}

	render() {
		if (this.inProgress) {
			return html`
				<content-loader></content-loader>
			`;
		}

		return html`
				<iframe srcdoc='<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<style>
					${this.isValid ? this.cssStyles : errorStyles}
					</style>
				</head>
				<body style="margin:0" class="">
					${this.isValid ? this.htmlLayout : errorLayout}
				</body>
				</html>'
				 class="D -Sz100p Bd-n P0">
				</iframe>
			`;

	}
}

customElements.define('code-preview', CodePreview);
