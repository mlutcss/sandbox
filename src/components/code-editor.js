import { LitElement, html } from 'lit';
import { ContextConsumer } from '@lit/context';

import { basicSetup } from 'codemirror';
import { EditorView, keymap, drawSelection } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorState, Prec } from '@codemirror/state';

import { html as langHTML } from '@codemirror/lang-html';
import { css as langCSS } from '@codemirror/lang-css';
import { sass as langSASS } from '@codemirror/lang-sass';

import { eventBusContext } from '../assets/scripts/eventBusContext.js';

const customTheme = Prec.highest(EditorView.theme({
	'.cm-scroller': {
		fontSize: '14px',
	},
	'.cm-selectionMatch': {
		backgroundColor: 'rgba(255, 200, 0, 0.2)'
	}
}));

export class CodeEditor extends LitElement {
	static properties = {
		lang: { type: String },
	};

	createRenderRoot() {
		return this;
	}

	firstUpdated() {
		if (this.lang === 'css') {
			this.eventBus.on('update-css', this.updateCss);
		}

		this.eventBus.on('first-update', this.handleFirstUpdate)
		this.eventBus.on('request-copy', this.handleCopy);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		if (this.lang === 'css') {
			this.eventBus.off('update-css', this.updateCss);
		}

		this.eventBus.off('request-copy', this.handleCopy);
	}

	handleFirstUpdate = (event) => {
		if (this.lang === 'html') {
			this.htmlLayout = event.detail.html
		} else if (this.lang === 'sass'){
			this.sassConfig = event.detail.sass
		}
		this.view = new EditorView(this.setEditorOptions(this.lang));
	}

	setEditorOptions(lang) {
		const editorSettings = {
			parent: this.querySelector(`#${this.lang}-editor`),
			extensions: [
				basicSetup,
				EditorView.lineWrapping,
				keymap.of([indentWithTab]),
				drawSelection(),
				this.setDocChangeHandler(),
				customTheme
			]
		};

		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			editorSettings.extensions.push(oneDark);
		}

		switch (lang) {
		case 'html':
			editorSettings.extensions.push(langHTML());

			return {
				...editorSettings,
				doc: this.htmlLayout.trim(),
			};
		case 'css':
			editorSettings.extensions.push(
				langCSS(),
				EditorState.readOnly.of(true),
				EditorView.editable.of(false));

			return {
				...editorSettings,
				doc: ''
			};
		case 'sass':
			editorSettings.extensions.push(langSASS());

			return {
				...editorSettings,
				doc: this.sassConfig.trim(),
			};
		}
	}

	setDocChangeHandler() {
		return EditorView.updateListener.of((update) => {
			if (update.docChanged) {
				clearTimeout(this.debounceTimeout);

				if (this.lang !== 'css') {
					this.debounceTimeout = setTimeout(() => {

						this.eventBus.emit('update-code', {
							detail: {
								target: this,
								updatedData: update.state.doc.toString(),
								lang: this.lang
							},
						});
					}, 750);
				}

			}
		});
	}

	updateCss = (event) => {
		const transition = this.view.state.update({
			changes: {
				from: 0,
				to: this.view.state.doc.length,
				insert: event.detail.updatedData
			}
		});

		this.view.dispatch(transition);
	};

	handleCopy = async (event) => {
		if (this.lang === event.detail.lang) {
			await navigator.clipboard.writeText(this.view.state.doc.toString());
		}
	};

	constructor() {
		super();
		new ContextConsumer(this, {
			context: eventBusContext,
			callback: (bus) => {
				this.eventBus = bus;
			}
		});
		this.htmlLayout = '';
		this.sassConfig = '';
	}

	render() {
		return html`
		<div id="${this.lang}-editor" class="H100p Bgc-$core750 Ov-a Fns4u">
		</div>
		`;
	}
}

customElements.define('code-editor', CodeEditor);
