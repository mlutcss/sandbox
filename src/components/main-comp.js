import { LitElement } from 'lit';
import { ContextProvider } from '@lit/context';
import { eventBusContext, eventBus } from '/src/assets/scripts/eventBusContext.js';

export class MainComp extends LitElement {
	_provider = new ContextProvider(this, {
		context: eventBusContext,
		initialValue: eventBus
	});

	createRenderRoot() {
		return this;
	}
}

customElements.define('main-comp', MainComp);