import { LitElement, html } from 'lit';

export class ContentLoader extends LitElement {
	createRenderRoot() {
		return this;
	}

	render() {
		return html`
			<div class="-Sz100p Bgc-$core800 D-f Jc-c Ai-c Ct_af Bgc-$core800_af H15p_af Apcr1_af Bd2u;s;$brand_af Bdtw1u_af Bdbw0_af Bdlw0_af Bdrd50p_af Ann-spin_af And1s_af Anic-i_af Antf-l_af">
			</div>
		`;
	}
}

customElements.define('content-loader', ContentLoader);