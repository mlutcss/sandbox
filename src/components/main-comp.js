import { LitElement, html } from 'lit';
import { layout, styles, config } from '../assets/scripts/lit-context';

const cssEditor = document.querySelector('code-editor[lang="css"]');

export class MainComp extends LitElement {

	createRenderRoot() {
		return this.querySelector('main');
	}

	constructor() {
		super();
		this.addEventListener('editor-update', (event) => this.handleChildUpdate(event));
	}

	handleChildUpdate(event) {

		if (event.detail.lang === 'html') {
			layout.set(event.detail.updatedData);
		} else if (event.detail.lang === 'sass') {
			config.set(event.detail.updatedData);
		}
		console.log(event.detail.lang)

		try {
			this.buildStyles(layout.get(), config.get());
			cssEditor.updateFromParent();
		} catch (err) {
			console.log(err.message);
			layout.set(`
				<h1 style="color: red; text-align: center">
					${err.message}
				</h1>`)
		}1
	}

	buildStyles(layout, config) {
		// throw new Error('Something went wrong!');
		const array = layout.split('\n');
		styles.set(array[0]);
	}

	render() {
		return html`
			<main class="D-f Ai-str H100vh Pt-$headerH">
				<slot></slot>
			</main>
		`;
	}

}

customElements.define('main-comp', MainComp);