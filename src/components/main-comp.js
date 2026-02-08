import { LitElement } from 'lit';
import { ContextProvider } from '@lit/context';
import { eventBusContext, eventBus } from '/src/assets/scripts/eventBusContext.js';
import { eleventyClient } from '../assets/scripts/eleventy-client.js';
import { defaultConfig, defaultLayout } from '../assets/data/initial-code.js';

export class MainComp extends LitElement {
	_provider = new ContextProvider(this, {
		context: eventBusContext,
		initialValue: eventBus
	});

	checkpointLayout = ''
	checkpointConfig = ''
	currentLayout = ''
	currentConfig = ''

	async firstUpdated() {
		await eleventyClient.getInitialCode(eleventyClient.sourceId)
		.then((res) => {
			this.checkpointLayout = res;
			this.checkpointConfig = '@use \'@mlut/core\';'
		})
		.catch((e) => {
			console.log(e)
			this.checkpointLayout = defaultLayout;
			this.checkpointConfig = defaultConfig

			eventBus.emit('show-error', {
				detail: {
					description: 'wrong-art'
				}
			});
		})

		this.currentLayout = this.checkpointLayout;
		this.currentConfig = this.checkpointConfig;

		eventBus.emit('editor-init', {
			detail: {
				html: this.checkpointLayout,
				sass: this.checkpointConfig
			}
		});
		console.log('The editor-init event should have been emitted')

		this.dispatchEvent(new CustomEvent('remove-loader', { bubbles: true }));
	}

	createRenderRoot() {
		return this;
	}
}

customElements.define('main-comp', MainComp);