import { LitElement, html } from 'lit';
import { ContextProvider } from '@lit/context';
import { eventBusContext, eventBus } from '/src/assets/scripts/eventBusContext.js';
import { client } from '../assets/scripts/client.js'
import { initialConfig, initialLayout } from '../assets/data/initial-code.js';

const urlParams = new URLSearchParams(window.location.search)

export class MainComp extends LitElement {
	_provider = new ContextProvider(this, {
		context: eventBusContext,
		initialValue: eventBus
	});

	async firstUpdated(){
	  let sourceId = ''
		if (urlParams.has('art')){
			client.apiUrl = 'https://00017615-8bbc-455f-8757-eb63ba8c7d31.mock.pstmn.io/arts/'
			sourceId = urlParams.get('art')
		} else if (urlParams.has('sketch')){
			client.apiUrl = 'https://00017615-8bbc-455f-8757-eb63ba8c7d31.mock.pstmn.io/sketches/'
			sourceId = urlParams.get('sketch')
		}
		console.log(sourceId)
		try{
			const res = await client.getInitialCode(sourceId)
			eventBus.emit('first-update', {
				detail: {
					html: res.html,
					sass: res.sass || "@use '@mlut/core';"
				}
			})
		} catch {
			history.pushState(null, null, '/')
			eventBus.emit('first-update', {
				detail: {
					html: initialLayout,
					sass: initialConfig
				}
			})
		}

		this.dispatchEvent(new CustomEvent('first-loaded', {bubbles: true}))
	}

	createRenderRoot() {
		return this;
	}
}

customElements.define('main-comp', MainComp);

