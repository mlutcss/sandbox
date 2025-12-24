import { LitElement, html } from 'lit';

export class StyleTab extends LitElement {

	createRenderRoot() {
		return this;
	}

	static properties = {
		checked: { type: String },
		radioId: { type: String },
		name: { type: String },
		text: { type: String }
	};

	constructor() {
		super();
	}

	firstUpdated() {
		// если checked выставлен по атрибуту — синхронизируем с внутренним input
		const input = this.renderRoot.querySelector('input');

		if (input) {
			input.checked = this.checked;

			if (this.checked === 'checked') {
				this.displayEditor();
			}
		}
	}

	displayEditor() {
		const editors = document.querySelectorAll('div[data-type="style"]');
		editors.forEach((el) => {
			if (el.getAttribute('data-lang') === `${this.radioId.toLowerCase()}`) {
				el.classList.add('D');
				el.classList.remove('D-n');
			} else {
				el.classList.add('D-n');
				el.classList.remove('D');
			}
		});
	}

	handleChange(e) {
		this.checked = e.target.checked;
		this.displayEditor();
	}

	render() {
		return html`
      <input type="radio" name=${this.name} id=${this.radioId} ?checked=${this.checked}
        @change=${this.handleChange} hidden >
      <label for=${this.radioId} class="Fnw600 C-$accent800 :c:+_C-$brand">
        ${this.text}
      </label>
    `;
	}

	__getStatus(e) {
		console.log(this.checked);
	}
}

customElements.define('style-tab', StyleTab);