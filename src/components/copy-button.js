import { LitElement, html } from 'lit';
import { ContextConsumer } from '@lit/context';
import { eventBusContext } from '../assets/scripts/eventBusContext.js';

export class CopyButton extends LitElement {
	static properties = {
		lang: { type: String },
		isClicked: { type: Boolean }
	};

	createRenderRoot() {
		return this;
	}

	constructor() {
		super();
		this.isClicked = false;
		new ContextConsumer(this, {
			context: eventBusContext,
			callback: (bus) => {
				this.eventBus = bus;
			}
		});
	}

	clickHandler() {
		this.isClicked = true;
		this.eventBus.emit('request-copy', {
			detail: {
				lang: this.lang,
			}
		});

		setTimeout(() => {
			this.isClicked = false;
		}, 1000);
	}

	render() {
		return html`
			<button @click="${this.clickHandler}" class="D -Sz8u Bd-n Bdrd2u Bgc-tp Bgc-$brand_h -Ts -Ctx-button">
				<svg class="-Sz100p St-$accent800 Tsd-ih ^button:h:_St-$core800"
					style="display: ${this.isClicked ? 'none' : 'block'}">
					<use href="/img/icons.svg#copy"></use>
				</svg>
				<svg class="-Sz100p St-$accent800 Tsd-ih ^button:h:_St-$core800"
					style="display: ${this.isClicked ? 'block' : 'none'}">
					<use href="/img/icons.svg#check"></use>
				</svg>
			</button>
		`;
	}
}

customElements.define('copy-button', CopyButton);