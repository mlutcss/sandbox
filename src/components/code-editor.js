
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

import { initialLayout, initialConfig } from '../assets/data/initial-code.js';
import { eventBusContext } from './main-comp';

const customTheme = Prec.highest(EditorView.theme({
	'.cm-scroller': {
		fontSize: '14px',
	},
	'.cm-selectionMatch': {
		backgroundColor: 'rgba(255, 200, 0, 0.2)'
	}
}));

export class CodeEditor extends LitElement {
	_eventBus = new ContextConsumer(this, { context: eventBusContext });

	static properties = {
		lang: { type: String },
		timeoutID: { type: Number, state: false },
		view: { type: Object },
	};

	createRenderRoot() {
		return this;
	}

	firstUpdated() {
		this.view = new EditorView(this.setEditorOptions(this.lang));

		if (this.lang === 'css') {
			this._eventBus.value.on('update-css', this.updateCss);
		}

		this._eventBus.value.on('request-copy', this.handleCopy);
	}

	disconnectedCallback() {
		if (this.lang === 'css') {
			this._eventBus.value.off('update-css', this.updateCss);
		}

		this._eventBus.value.off('request-copy', this.handleCopy);
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
				doc: initialLayout.trim(),
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
				doc: initialConfig.trim(),
			};
		}
	}

	setDocChangeHandler() {
		return EditorView.updateListener.of((update) => {
			if (update.docChanged) {
				clearTimeout(this.timeoutID);

				if (this.lang !== 'css') {
					this.timeoutID = setTimeout(() => {

						this._eventBus.value.emit(`update-${this.lang}`, {
							detail: {
								target: this,
								updatedData: update.state.doc.toString(),
								lang: this.lang
							},
						});
					}, 1000);
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

	render() {
		return html`
		<div id="${this.lang}-editor" class="H100p Bgc-$core700 Ov-a Fns10u" style="height: ${this.inProgress ? '0' : '100%'}">
		</div>
		`;
	}
}

customElements.define('code-editor', CodeEditor);