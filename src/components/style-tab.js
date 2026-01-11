import { LitElement, html } from 'lit';

export class StyleTab extends LitElement {
	createRenderRoot() {
		return this;
	}

	static properties = {
		checked: { type: String },
		lang: { type: String },
		name: { type: String },
		text: { type: String }
	};

	constructor() {
		super();
	}

	render() {
		return html`
      <input type="radio" name=${this.name} id=${this.lang} ?checked=${this.checked}
       hidden >
      <label for=${this.lang} lang=${this.lang} class="Fnw600 C-$accent800 :c:+_C-$brand">
        ${this.text}
      </label>
    `;
	}

}

customElements.define('style-tab', StyleTab);