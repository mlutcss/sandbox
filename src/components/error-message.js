import { LitElement, html } from 'lit';
import { ContextConsumer } from '@lit/context';
import { eventBusContext } from '../assets/scripts/eventBusContext';
import { events } from '../assets/data/events';
import { errorTexts } from '../assets/data/error-texts';

export class ErrorMessage extends LitElement {
	static properties = {
		text: { type: String },
		isShown: { type: Boolean }
	};

	showError = (event) => {
		this.text = errorTexts[event.detail.description];
		this.isShown = true;
		setTimeout(() => {
			this.isShown = false;
		}, 5000);
	};

	createRenderRoot() {
		return this;
	}

	constructor() {
		super();
		new ContextConsumer( this, {
			context: eventBusContext,
			callback: (bus) => {
				bus.on(events.showError, this.showError);
				this.eventBus = bus;
			}
		});
		this.isShown = false;
	}

	render() {
		return html`
			<div class="Ps-a W20vw T-$headerH R0 Zi20 P2u Fns5u Tsd300ms"
				style="visibility: ${this.isShown ? 'visible' : 'hidden'}; opacity:${this.isShown ? '1' : '0'};">
				<span class="D-ib P3u;4u M0;0;2u Bdrd1u Bd2;s;red Bgc-$error C-$accent900 Txw-p">
					${this.text}
				</span>
			</div>
		`;
	}
}

customElements.define('error-message', ErrorMessage);