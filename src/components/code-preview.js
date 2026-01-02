import { LitElement, html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { initialLayout, initialConfig, errorLayout, errorStyles } from '../assets/data/initial-code.js';

import { ContextConsumer } from '@lit/context';
import { eventBusContext } from '../assets/scripts/eventBusContext.js';

export class CodePreview extends LitElement {
	_eventBusContext = new ContextConsumer(this, {
		context: eventBusContext,
		callback: (bus) => {
			this.eventBus = bus;
		}
	});
	_markupPath = 'index.html';

	static properties = {
		htmlLayout: { type: String },
		config: { type: String },
		isValid: { type: Boolean },
	};

	async firstUpdated() {
		this.unbindUpdateHtml = this.eventBus.on('update-html', this.handleUpdate);
		this.unbindUpdateSass = this.eventBus.on('update-sass', this.handleUpdate);
		const { jitEngine } = await import('https://unpkg.com/@mlut/core@latest/dist/index.js');
		await jitEngine.init(['config.scss', initialConfig]);
		this.mlutEngine = jitEngine;
		await this.updateCSS(initialLayout, initialConfig);
		this.shadowRoot.adoptedStyleSheets = [
			this.generatedStyleSheets
		];
		this.eventBus.emit('remove-loader');
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.unbindUpdateHtml();
		this.unbindUpdateSass();
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
		const generatedStyles = await this.mlutEngine.generateCss();
		this.generatedStyleSheets.replaceSync(generatedStyles);

		if (generatedStyles) {
			this.isValid = true;
			this.eventBus.emit('update-css', {
				detail: {
					target: this,
					updatedData: generatedStyles,
					lang: 'css'
				}
			});
		} else {
			this.isValid = false;
			this.generatedStyleSheets.replaceSync(errorStyles);
		}
	}

	constructor() {
		super();
		this.htmlLayout = initialLayout;
		this.config = initialConfig;
		this.generatedStyleSheets = new CSSStyleSheet();
		this.isValid = true;
	}

	render() {
		return html`${this.isValid ? unsafeHTML(this.htmlLayout) : unsafeHTML(errorLayout)}`;
	}
}

customElements.define('code-preview', CodePreview);
