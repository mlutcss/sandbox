import { LitElement, html } from 'lit';

export class TabSwitch extends LitElement {
	static properties = {
		checkedLang: { type: String }
	};

	createRenderRoot() {
		return this;
	}

	constructor() {
		super();
		this.checkedLang = 'sass';
	}

	handleChange(event) {
		this.checkedLang = event.target.id;
		console.log(event.target);
	}

	render() {
		return html`
		<div class="H100p D-f Fld-c -Ctx-wrapper">
			<!-- Header-->
			<div class="H-$sectionHeaderH P0;5u Bgc-$core800 Bdt1;s;$accent700 Bdb1;s;$accent700 D-f Jc-sb Ai-c">
				<div class="D-f Jc-sb Gap5u C-$accent800">
					<style-tab checked="${this.checkedLang === 'css' ? 'checked' : 'unchecked'}" @change="${this.handleChange}" lang="css" name="Style" text="CSS"> </style-tab>

					<style-tab checked="${this.checkedLang === 'sass' ? 'checked' : 'unchecked'}" @change="${this.handleChange}" lang="sass" name="Style" text="SASS"> </style-tab>
				</div>
				<div class="D-f Jc-c Ai-c">
					<copy-button class="D-ib" style="display:${this.checkedLang === 'css' ? 'block' : 'none'}" lang='css'></copy-button>
					<copy-button class="D-ib" style="display:${this.checkedLang === 'sass' ? 'block' : 'none'}" lang='sass'></copy-button>
				</div>
			</div>

			<!-- CSS part's body-->

			<div class="H-calc(100%;-;$sectionHeaderH) Bgc-$core700"
				style="display:${this.checkedLang === 'css' ? 'block' : 'none'}">
				<code-editor lang="css"></code-editor>
			</div>
			<div class="H-calc(100%;-;$sectionHeaderH) Bgc-$core700"
				style="display:${this.checkedLang === 'sass' ? 'block' : 'none'}">
				<code-editor lang="sass"></code-editor>
			</div>
		</div>
		`;
	}
}

customElements.define('tab-switch', TabSwitch);