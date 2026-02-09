import { LitElement } from 'lit';
import { ContextProvider } from '@lit/context';
import { eventBusContext, eventBus } from '/src/assets/scripts/eventBusContext.js';
import { currentCodeContext } from '../assets/scripts/currentCodeContext.js';
import { websiteClient } from '../assets/scripts/website-client.js';
import { defaultConfig, defaultLayout, fallbackConfig } from '../assets/data/initial-code.js';
import { events } from '../assets/data/events.js';

const currentCode = {
	currentLayout: '',
	currentConfig: ''
};

const artId = (new URLSearchParams(window.location.search)).get('art');

export class MainComp extends LitElement {
	_provider = new ContextProvider(this, {
		context: eventBusContext,
		initialValue: eventBus
	});

	_currentCodeProvider = new ContextProvider(this, {
		context: currentCodeContext,
		initialValue: currentCode
	});

	checkpointLayout = '';
	checkpointConfig = '';

	async firstUpdated() {
		if (artId) {
			await websiteClient.getArt(artId)
				.then((res) => {
					this.checkpointLayout = res;
					this.checkpointConfig = fallbackConfig;
				})
				.catch((e) => {
					this.checkpointLayout = defaultLayout;
					this.checkpointConfig = defaultConfig;

					eventBus.emit(events.showError, {
						detail: {
							description: 'wrong-art'
						}
					});
				});
		} else {
			this.checkpointLayout = defaultLayout;
			this.checkpointConfig = defaultConfig;
		}

		currentCode.currentLayout = this.checkpointLayout;
		currentCode.currentConfig = this.checkpointConfig;

		eventBus.emit(events.editorInit, {
			detail: {
				html: this.checkpointLayout,
				sass: this.checkpointConfig
			}
		});

		this.dispatchEvent(new CustomEvent('remove-loader', { bubbles: true }));
	}

	createRenderRoot() {
		return this;
	}
}

customElements.define('main-comp', MainComp);