import { LitElement, html } from 'lit';
import { ContextConsumer } from '@lit/context';
import { eventBusContext } from '../assets/scripts/eventBusContext';
import { client } from '../assets/scripts/client.js';
import { errorTexts } from '../assets/data/error-texts';

export class SandboxToolbar extends LitElement {
	static properties = {
		canSubmit: { type: Boolean },
		isShared: { type: Boolean },
		errorStatus: { type: Boolean }
	};

	firstUpdated() {
		this.errorSpan = this.querySelector('error-message');
		this.input = this.querySelector('input[name="editors-key"]');
		this.eventBus.on('enable-submit', this.handleControl);
		this.eventBus.on('disable-submit', this.handleControl);
		this.eventBus.on('sketch-is-shared', this.handleControl);
		this.eventBus.on('sketch-is-renewed', this.handleControl);
		this.eventBus.on('show-error', this.showError);
	}

	createRenderRoot() {
		return this;
	}

	handleControl = (event) => {
		console.log(event.detail.name);

		switch (event.detail.name) {
		case 'enable-submit':
			this.canSubmit = true;
			break;
		case 'disable-submit':
			this.canSubmit = false;
			break;
		case 'sketch-is-shared':
			this.isShared = true;
			break;
		}

		this.input.value = client.editorsKey || '';
	};

	copyKey() {
		navigator.clipboard.writeText(client.editorsKey);
	}

	requestShare() {
		if (this.canSubmit) {
			this.eventBus.emit('request-sketch-share', {
				detail: {
					type: 'share'
				}
			});
		}

		return;
	}

	requestRenew() {
		if (this.canSubmit) {
			this.eventBus.emit('request-sketch-renew', {
				detail: {
					type: 'renew'
				}
			});
		}

		return;
	}

	requestSketchUpdate() {
		if (this.canSubmit) {
			this.eventBus.emit('request-sketch-update', {
				detail: {
					editorsKey: client.editorsKey
				}
			});
		}
	}

	showError = (event) => {
		this.errorStatus = 'wrong';
		this.errorSpan.setAttribute('errorText', errorTexts[event.detail.description]);
		setTimeout(() => {
			this.errorStatus = 'ok';
		}, 5000);
	};

	typeKey(e) {
		client.editorsKey = e.target.value;

		if (!client.editorsKey) {
			this.isShared = false;
		} else {
			this.isShared = true;
		}
	}

	putButtonStyles(isEnabled) {
		return `btn D P1.5u;4u Lnh1.2 ${isEnabled ? 'Bgc-$brand Bgc-$brand500_h' : 'Bgc-$brand O0.5'} C#fff Bdrd1u Txd-n C-$accent800 -Ts`;
	}
	constructor() {
		super();
		new ContextConsumer(this, {
			context: eventBusContext,
			callback: (bus) => {
				this.eventBus = bus;
			}
		});
		this.isWrong = false;
		client.editorsKey = localStorage.getItem('editorsKey') || '';
		[this.canSubmit, this.canRenew, this.isShared] = [false, false, false];
	}

	render() {
		return html`
			<ul class="Lsst-n P0 M0 H100p D-f Ai-c Jc-fs Flg1 Mnw15u">
				<li class="M0 P0 Pr4u D-f Ai-str Ps -Ctx Mnw15u">
					<label class=" Mnw15u -Ctx-label">
						<span class="-D-vh"> Editor's key </span>
						<input name="editors-key" type="text" value="${client.editorsKey}" @keyup="${this.typeKey}" placeholder="Editor's key" autocomplete="off"
						 class="M0 W100p Mnw15u P1u;3u Bdtlr1u -Ts Bdblr1u Fns4u Bd1;s;$accent800 Ol-n_f Bdc-$brand_f Bdrc-$accent800_f Bgc-$core800 C-$accent900_ph C-$accent800_f:ph -Ts_ph C-$accent900">
					</label>


					<button @click="${this.copyKey}" class="btn -Ctx-button D M0 Mnw10u P1u;2u Bd1;s;$accent800 Bdl-n Bdtrr1u Bdbrr1u Bgc-$core800 :fw:+_Bdc-$brand :fw:+_Bdl-n -Ts Bgc-$brand_h">
						<svg class="D -Sz5u St-$accent800 Tsd-ih ^button:h:_St-$core800">
							<use href="/img/icons.svg#copy"></use>
						</svg>
					</button>

					<button class="D W6u Bgc-tp Apcr1 C-$accent800 Bdrd100p Bd2;s;$accent800 As-c Ml2u Bdc-$brand_f,h C-$brand_f,h -Ts">
						<span class="D M-a Lnh1 Fnw600">?</span>
					</button>

					<div class="Ps-a P2u;4u;0;0 L0 T100p W100p Mnw60u C-$accent900 Tsd300ms O0 Zi-1 :f:+,:h:+:_O1 :f:+,:h:+:_Zi20 Fns3u">
						<ul class="P3u;4u;3u;6u Lsst-d W100p Bgc-$core800 Bdrd1u Bd1;s;$accent800">
							<li class="M0;0;1u">
								Save this key to edit your sketch in the future;
							</li>
							<li>
								When you open this sketch again - enter the key (if it is not there) into the input in the header and you will be able to continue editing
							</li>
						</ul>
					</div>

				</li>
				<li class="M0 Mr4u">
					<button class="${this.putButtonStyles(this.canSubmit)}"
						style="display: ${this.isShared ? 'none' : 'false'}"
						@click="${this.requestShare}">
						Share
					</button>
					<button class="${this.putButtonStyles(this.canSubmit)}"
						style="display: ${this.isShared ? 'block' : 'none'}"
						@click="${this.requestRenew}">
						Renew
					</button>
				</li>
				<li class="M0 Mr4u">
					<button class="${this.putButtonStyles(this.canSubmit)}"
						style="display: ${this.isShared ? 'block' : 'none'}"
						@click="${this.requestSketchUpdate}">
						Update
					</button>
				</li>
				<li>
					<button @click="${this.copyKey}" class="btn -Ctx-button D M0 Tf -Rt-45d -Ts"
						style="display: ${this.isShared ? 'block' : 'none'}">
						<svg class="D -Sz2gg Mnw7u St-$accent800 Fi-$accent800 St-$brand_h Fi-$brand_h Tsd-ih">
							<use href="/img/icons.svg#share"></use>
						</svg>
					</button>
				</li>

			</ul>

			<error-message status="${this.errorStatus}">
			</error-message>
		`;
	}
}

customElements.define('sandbox-toolbar', SandboxToolbar);