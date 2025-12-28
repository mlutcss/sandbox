import { LitElement, html } from 'lit';
import { initialLayout, initialConfig } from '../assets/data/initial-code.js';

import { ContextConsumer } from '@lit/context';
import { eventBusContext } from './main-comp.js';

export class CodePreview extends LitElement {
	_eventBus = new ContextConsumer(this, { context: eventBusContext });

	createRenderRoot() {
		return this;
	}

	static properties = {
		htmlLayout: { type: String },
		cssStyles: { type: String },
		config: { type: String },
		isValid: { type: Boolean },
		inProgress: { type: Boolean },
		mlutEngine: { type: Object },
		timeoutID: { type: Number }
	};

	async firstUpdated() {
		this._eventBus.value.on('update-html', this.handleUpdate);
		this._eventBus.value.on('update-sass', this.handleUpdate);
		const { jitEngine } = await import('https://unpkg.com/@mlut/core@latest/dist/index.js');
		await jitEngine.init(['config.scss', initialConfig]);
		jitEngine.putContent('index.html', initialLayout);
		this.mlutEngine = jitEngine;
		await this.debounceCssUpdate(initialLayout, initialConfig);
	}

	disconnectedCallback() {
		this._eventBus.value.off('update-html', this.debounceHandleUpdate);
		this._eventBus.value.off('update-sass', this.debounceHandleUpdate);
	}

	handleUpdate = async (event) => {
		if (event.detail.lang === 'html') {
			this.htmlLayout = event.detail.updatedData;
		} else if (event.detail.lang === 'sass') {
			this.config = event.detail.updatedData;
		}

		await this.debounceCssUpdate(this.htmlLayout, this.config);
	};

	async updateCSS(layout, config) {
		await this.mlutEngine.updateSassConfig(config);
		this.mlutEngine.putContent('layout.html', layout);
		this.cssStyles = await this.mlutEngine.generateCss();
		console.log(this.cssStyles);

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

		this.inProgress = false;
	}

	async debounceCssUpdate(layout, config) {
		clearTimeout(this.timeoutID);
		this.timeoutID = setTimeout(await this.updateCSS(layout, config), 500);
	}

	constructor() {
		super();
		this.documentContent = '';
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
		} else if (!this.isValid) {
			return html`
				<error-fallback></error-fallback>
			`;
		}

		return html`
				<iframe srcdoc='<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<style>
						${this.cssStyles}
					</style>
				</head>
				<body style="margin:0" class="">
					${this.htmlLayout}
				</body>
				</html>'
				 class="D -Sz100p Bd-n P0">
				</iframe>
			`;

	}
}

customElements.define('code-preview', CodePreview);