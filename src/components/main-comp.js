import { LitElement } from 'lit';
import { ContextProvider } from '@lit/context';
import { createContext } from '@lit/context';
import { eventBusContext, eventBus } from '/src/assets/scripts/eventBusContext.js';
import { websiteClient } from '../assets/scripts/website-client.js';
import { defaultConfig, defaultLayout, fallbackConfig } from '../assets/data/initial-code.js';
import { events } from '../assets/data/events.js';

export const currentCodeContext = createContext('currentCodeContext');

const currentCode = {
	currentLayout: '',
	currentConfig: ''
};

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
		if (websiteClient.sourceId) {
			await websiteClient.getInitialCode(websiteClient.sourceId)
				.then((res) => {
					this.checkpointLayout = res.replaceAll('\n\n', '').trim();
					this.checkpointConfig = fallbackConfig;
				})
				.catch((e) => {
					console.log(e);
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