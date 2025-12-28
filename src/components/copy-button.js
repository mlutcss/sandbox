import { LitElement, html } from 'lit';
import { ContextConsumer } from '@lit/context';
import { eventBusContext } from './main-comp';

export class CopyButton extends LitElement {
	_eventBus = new ContextConsumer(this, { context: eventBusContext });

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
	}

	clickHandler() {
		try {
			this.isClicked = true;
			this._eventBus.value.emit('request-copy', {
				detail: {
					lang: this.lang,
				}
			});
		} catch (e) {
			console.log(e.message);
		}

		setTimeout(() => {
			this.isClicked = false;
		}, 1000);
	}

	render() {
		return html`
			<button @click="${this.clickHandler}" class="D -Sz8u Bd-n Bdrd2u Bgc-tp Bgc-$brand_h -Ts -Ctx-button">
				<svg class="-Sz100p St-$accent800 Tsd-ih ^button:h:_St-$core800"
					style="display: ${this.isClicked ? 'none' : 'block'}">
					<use href="src/assets/img/icons.svg#copy"></use>
				</svg>
				<svg class="-Sz100p St-$accent800 Tsd-ih ^button:h:_St-$core800"
					style="display: ${this.isClicked ? 'block' : 'none'}">
					<use href="src/assets/img/icons.svg#check"></use>
				</svg>
			</button>
		`;
	}
}

customElements.define('copy-button', CopyButton);