import { LitElement } from 'lit';
import { ContextProvider } from '@lit/context';
import { eventBusContext, eventBus } from '/src/assets/scripts/eventBusContext.js';
import { client } from '../assets/scripts/client.js';
import { defaultConfig, defaultLayout } from '../assets/data/initial-code.js';

const urlParams = new URLSearchParams(window.location.search);
localStorage.clear();

export class MainComp extends LitElement {
	_provider = new ContextProvider(this, {
		context: eventBusContext,
		initialValue: eventBus
	});

	checkpointLayout = '';
	checkpointConfig = '';
	currentLayout = '';
	currentConfig = '';
	isToolbarAware = false;

	async firstUpdated() {
		this.isToolbarAware = false;

		if (urlParams.has('art')) {
			client.apiUrl = 'https://00017615-8bbc-455f-8757-eb63ba8c7d31.mock.pstmn.io/arts/';
			client.sketchId = urlParams.get('art');
		} else if (urlParams.has('sketch')) {
			client.apiUrl = 'https://00017615-8bbc-455f-8757-eb63ba8c7d31.mock.pstmn.io/sketches/';
			client.sketchId = urlParams.get('sketch');
		}

		try {
			const res = await client.getInitialCode(client.sketchId);
			[this.checkpointLayout, this.checkpointConfig] = [res.html, res.sass || '@use \'@mlut/core\';'];
		} catch {
			[this.checkpointLayout, this.checkpointConfig] = [defaultLayout, defaultConfig];

			if (urlParams.has('art')) {
				eventBus.emit('show-error', {
					detail: {
						description: 'wrong-art'
					}
				});
			} else if (urlParams.has('sketch')) {
				eventBus.emit('show-error', {
					detail: {
						description: 'wrong-sketch'
					}
				});
			}
		}

		[this.currentLayout, this.currentConfig] = [this.checkpointLayout, this.checkpointConfig];
		eventBus.emit('first-update', {
			detail: {
				html: this.checkpointLayout,
				sass: this.checkpointConfig
			}
		});

		this.dispatchEvent(new CustomEvent('first-loaded', { bubbles: true }));
		eventBus.on('update-code', this.handleUsersCodeUpdate);
		eventBus.on('request-sketch-share', this.handleShareRequest);
		eventBus.on('request-sketch-renew', this.handleRenewRequest);
		eventBus.on('request-sketch-update', this.handleUpdateRequest);
	}

	handleUsersCodeUpdate = (event) => {
		if (event.detail.lang === 'html') {
			this.currentLayout = event.detail.updatedData;
		} else if (event.detail.lang === 'sass') {
			this.currentConfig = event.detail.updatedData;
		}

		this.controlToolbar(this.currentLayout, this.currentConfig);
	};

	controlToolbar(layout, config) {
		if ((layout != this.checkpointLayout || config != this.checkpointConfig)) {
			if (!this.isToolbarAware) {
				eventBus.emit('enable-submit', {
					detail: {
						name: 'enable-submit'
					}
				});
				this.isToolbarAware = true;
			}
		} else {
			eventBus.emit('disable-submit', {
				detail: {
					name: 'disable-submit'
				}
			});

			this.isToolbarAware = false;
		}
	}

	handleShareRequest = async (event) => {
		console.log('Before request');

		try {
			console.log('Share requested');
			const res = await this.makePostRequest(event);
			client.sketchId = res.sketchId;
			client.editorsKey = res.editorsKey;
			console.log(client.editorsKey);
			history.pushState(null, null, `/?sketch=${client.sketchId}`);

			eventBus.emit('sketch-is-shared', {
				detail: {
					name: 'sketch-is-shared',
				}
			});

			this.controlToolbar(this.currentLayout, this.currentConfig);
			this.isToolbarAware = false;
			console.log('Share request sent');
		} catch (e) {
			console.log(e);
		}
	};

	handleRenewRequest = async (event) => {
		try {
			const res = await this.makePostRequest(event);
			client.sketchId = res.sketchId;
			history.pushState(null, null, `/?sketch=${client.sketchId}`);

			eventBus.emit('sketch-is-renewed', {
				detail: {
					name: 'sketch-is-renewed',
				}
			});

			this.controlToolbar(this.currentLayout, this.currentConfig);
			this.isToolbarAware = false;
		} catch (e) {
			console.log(e);
		}
	};

	makePostRequest = async (event) => {
		client.apiUrl = `https://00017615-8bbc-455f-8757-eb63ba8c7d31.mock.pstmn.io/sketches/${event.detail.type}`;

		const res = await client.createNewSketch('', 'POST', {
			editorsKey: client.editorsKey,
			html: this.currentLayout,
			sass: this.currentConfig
		});

		this.checkpointLayout = this.currentLayout;
		this.checkpointConfig = this.currentConfig;

		return res;
	};

	handleUpdateRequest = async () => {
		try {
			client.apiUrl = 'https://00017615-8bbc-455f-8757-eb63ba8c7d31.mock.pstmn.io/sketches/';

			const res = await client.createNewSketch(`${client.sketchId}`, 'PUT', {
				editorsKey: client.editorsKey,
				html: this.currentLayout,
				sass: this.currentConfig
			});

			console.log(res);
			this.checkpointLayout = this.currentLayout;
			this.checkpointConfig = this.currentConfig;

			eventBus.emit('sketch-is-updated', {
				detail: {
					name: 'sketch-is-updated',
				}
			});

			this.controlToolbar(this.currentLayout, this.currentConfig);
			this.isToolbarAware = false;
		} catch (e) {
			console.log(e);
			eventBus.emit('show-error', {
				detail: {
					description: 'console-mistake'
				}
			});
		}
	};

	createRenderRoot() {
		return this;
	}
}

customElements.define('main-comp', MainComp);

