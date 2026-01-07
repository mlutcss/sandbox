import { LitElement } from 'lit';
import { ContextProvider } from '@lit/context';
import { eventBusContext, eventBus } from '/src/assets/scripts/eventBusContext.js';

export class MainComp extends LitElement {
	_provider = new ContextProvider(this, {
		context: eventBusContext,
		initialValue: eventBus
	});

	constructor() {
		super();
		this.unbindLoaderRemover = eventBus.on('remove-loader', this.removeLoader);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.unbindLoaderRemover = eventBus.off('remove-loader', this.removeLoader);
	}

	removeLoader = () => {
		this.querySelector('.loader').classList.remove('loader');
	};

	createRenderRoot() {
		return this;
	}
}

customElements.define('main-comp', MainComp);