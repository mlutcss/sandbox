import { LitElement, html } from 'lit';

export class TabSwitch extends LitElement {
	static properties = {
		cssChecked: { type: String },
		sassChecked: { type: String }
	};

	createRenderRoot() {
		return this;
	}

	constructor() {
		super();
		this.cssChecked = 'unchecked';
		this.sassChecked = 'checked';
	}

	handleClick(event) {
		if (event.target.lang === 'css') {
			this.cssChecked = 'checked';
			this.sassChecked = 'unchecked';
		} else if (event.target.lang === 'sass') {
			this.sassChecked = 'checked';
			this.cssChecked = 'unchecked';
		}
	}

	render() {
		return html`
		<div class="H100p D-f Fld-c -Ctx-wrapper">
			<!-- Header-->
			<div class="H-$sectionHeaderH P0;5u Bgc-$core800 Bdt1;s;$accent700 Bdb1;s;$accent700 D-f Jc-sb Ai-c">
				<div class="D-f Jc-sb Gap5u C-$accent800">
					<style-tab checked="${this.cssChecked}" @click="${this.handleClick}" lang="css" name="Style" text="CSS"> </style-tab>
					<style-tab checked="${this.sassChecked}" @click="${this.handleClick}" lang="sass" name="Style" text="SASS"> </style-tab>
				</div>
				<div class="D-f Jc-c Ai-c">
					<copy-button class="D-ib" style="display:${this.cssChecked === 'checked' ? 'block' : 'none'}" lang='css'></copy-button>
					<copy-button class="D-ib" style="display:${this.sassChecked === 'checked' ? 'block' : 'none'}" lang='sass'></copy-button>
				</div>
			</div>

			<!-- CSS part's body-->

			<div class="H-calc(100%;-;$sectionHeaderH) Bgc-$core700"
				style="display:${this.cssChecked === 'checked' ? 'block' : 'none'}">
				<code-editor lang="css"></code-editor>
			</div>
			<div class="H-calc(100%;-;$sectionHeaderH) Bgc-$core700"
				style="display:${this.sassChecked === 'checked' ? 'block' : 'none'}">
				<code-editor lang="sass"></code-editor>
			</div>
		</div>
		`;
	}
}

customElements.define('tab-switch', TabSwitch);