// Lit imports
import { LitElement, html } from 'lit';
import { watch, SignalWatcher } from '@lit-labs/signals';

// General CodeMirror imports
import { basicSetup } from 'codemirror';
import { EditorView, keymap, drawSelection} from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorState, Prec } from '@codemirror/state';


// Language CodeMirror imports
import { html as langHTML } from '@codemirror/lang-html';
import { css as langCSS } from '@codemirror/lang-css';
import { sass as langSASS } from '@codemirror/lang-sass';

// Data imports

import { layout, styles, config } from '../assets/scripts/lit-context';

const customTheme = Prec.highest(EditorView.theme({
	".cm-editor": {
		backgroundColor: "transparent !important"
	},
	".cm-editor>*": {
		backgroundColor: "transparent !important"
	},
	".cm-content": {
		backgroundColor: "transparent !important"
	},
	".cm-selectionMatch": {
    backgroundColor: "rgba(255, 200, 0, 0.2)"
  },
	".cm-line::selection": {
		backgroundColor: "red !important"
	}
}))

export class CodeEditor extends LitElement {

	static properties = {
		lang: { type: String },
		content: { type: Object },
		timeoutID: { type: Number, state: false },
		view: { type: Object }
	};

	createRenderRoot() {
		return this;
	}

	constructor() {
		super();
		this.content = '';
	}

	firstUpdated() {
		this.view = new EditorView(this.setEditorOptions(this.lang));
	}

	setEditorOptions(lang) {

		basicSetup.highlightSelectionMatches = false

		const editorSettings = {
			parent: this.querySelector('#wrapper'),
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
				doc: layout.get().trim(),
			};
		case 'css':
			editorSettings.extensions.push(
				langCSS(),
				EditorState.readOnly.of(true),
				EditorView.editable.of(false));

			return {
				...editorSettings,
				doc: styles.get().trim()
			};
		case 'sass':
			editorSettings.extensions.push(langSASS());

			return {
				...editorSettings,
				doc: config.get().trim(),
			};
		}
	}

	ы

	setDocChangeHandler() {
		return EditorView.updateListener.of((update) => {
			if (update.docChanged) {
				clearTimeout(this.timeoutID);

				if (this.lang !== 'css') {
					this.timeoutID = setTimeout(() => {

						this.dispatchEvent(new CustomEvent('editor-update', {
							detail: {
								target: this,
								updatedData: update.state.doc.toString(),
								lang: this.lang
							},
							bubbles: true
						}));
					}, 1000);
				}

			}
		});
	}

	updateFromParent() {
		const transition = this.view.state.update({
			changes: {
				from: 0,
				to: this.view.state.doc.length,
				insert: styles.get()
			}
		});

		this.view.dispatch(transition);
	}

	render() {
		return html`
		<div id="wrapper" class="Mxh100p Bgc-$core700 Ov-a"> <div>
		`;
	}
}

customElements.define('code-editor', CodeEditor);