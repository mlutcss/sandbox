import { LitElement, html } from 'lit';

export class ErrorMessage extends LitElement {
	static properties = {
		errorText: { type: String },
	};

	createRenderRoot() {
		return this;
	}

	render() {
		return html`
			<div id="error-wrapper" class="Ps-a Txa-l W20vw T-$headerH R0 Zi20 P2u Fns5u Tsd300ms"
			style="visibility: ${this.status === 'wrong' ? 'visible' : 'hidden' }; opacity:${this.status === 'wrong' ? '1' : '0'}">
				<span class="D-ib P3u;4u M0;0;2u Bdrd1u Bd2;s;red Bgc-$error C-$accent900 Txw-p">
					${this.errorText}
				</span>
			</div>
		`;
	}
}

customElements.define('error-message', ErrorMessage);