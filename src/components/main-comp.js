import { LitElement, html } from 'lit';
import { createContext, ContextProvider } from '@lit/context';

import { EventBus } from '../assets/scripts/event-bus.js';

export const eventBusContext = createContext('eventBus');
const eventBus = new EventBus();

export class MainComp extends LitElement {

	_provider = new ContextProvider(this, {
		context: eventBusContext,
		initialValue: eventBus
	});

	constructor() {
		super();
		this.inProgress = true;
	}

	createRenderRoot() {
		return this;
	}
	render() {
		return html``;
	}

}

customElements.define('main-comp', MainComp);