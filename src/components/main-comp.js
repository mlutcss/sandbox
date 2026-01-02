import { LitElement, html } from 'lit';
import { ContextProvider } from '@lit/context';
import { eventBusContext, eventBus } from '/src/assets/scripts/eventBusContext.js';

export class MainComp extends LitElement {
	_provider = new ContextProvider(this, {
		context: eventBusContext,
		initialValue: eventBus
	});

	constructor() {
		super();
		this.inProgress = true;
		this.unbindLoaderRemover = eventBus.on('remove-loader', this.removeLoader);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.unbindLoaderRemover();
	}

	removeLoader = () => {
		this.querySelector('.loader').classList.remove('loader');
	};

	createRenderRoot() {
		return this;
	}
	render() {
		return html``;
	}

}

customElements.define('main-comp', MainComp);