import { LitElement, html } from 'lit';

export class ErrorFallback extends LitElement {
	createRenderRoot() {
		return this;
	}

	render() {
		return html`
			<div class="Bgc-$core800 -Sz100p D-f Jc-c Aic Fld-c">
				<h1 class="C-$brand Txa-c W100p P0 M0;0;4u"> Ooops... </h1>
				<h2  class="C-$brand Txa-c W100p P0 M0;0;4u">
					Something went wrong in your Sass-config!
				</h2>
				<h2  class="C-$brand Txa-c W100p P0 M0;0;4u">
					Check out the console
				</h2>
			</div>
		`;
	}
}

customElements.define('error-fallback', ErrorFallback);