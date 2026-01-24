import { LitElement, html } from 'lit';

export class ToolBar extends LitElement {
	static properties = {
		editorKey: { type: String },
		isKeyCorrect: { type: String },
		canUpdate: { type: Boolean },
		canShare: { type: Boolean }
	};

	createRenderRoot() {
		return this;
	}

	copyKey() {
		navigator.clipboard.writeText(this.editorKey);
	}

	typeKey(e) {
		this.editorKey = e.target.value;

		if (this.editorKey === 'wrong') {
			this.isKeyCorrect = false;
		} else {
			this.isKeyCorrect = true;
		}
	}

	constructor() {
		super();
		this.editorKey = '';
		this.isKeyCorrect = true;
	}

	render() {
		return html`
			<ul class="Lsst-n P0 M0 H100p D-f Ai-c Jc-fs Flg1">
				<li class="M0 P0 Pr4u D-f Ai-str Ps -Ctx">
					<label for="editor-key" hidden> Editor's key</label>
					<input name="editor-key" type="text" value="${this.editorKey}" @keyup="${this.typeKey}" placeholder="Editor's key" autocomplete="off"
					 class="M0 P1u;3u Bdtlr1u Bdblr1u Fns4u Bd1;s;$accent800 Ol-n_f Bgc-$core800 C-$accent900_ph C-$accent800_f:ph -Ts_ph C-$accent900">


					<button @click="${this.copyKey}" class="btn -Ctx-button D M0 Mnw10u P1u;2u Bd1;s;$accent800 Bdl-n Bdtrr1u Bdbrr1u Bgc-$core800 -Ts Bgc-$brand_h">
						<svg class="D -Sz5u St-$accent800 Tsd-ih ^button:h:_St-$core800">
							<use href="/img/icons.svg#copy"></use>
						</svg>
					</button>

					<button class="D W6u Bgc-tp Apcr1 C-$accent800 Bdrd100p Bd2;s;$accent800 As-c Ml2u Bdc-$brand_f,h C-$brand_f,h -Ts">
						<span class="D M-a Lnh1 Fnw600">?</span>
					</button>

					<div class="Ps-a P2u;4u;0;0 L0 T100p W100p C-$accent900 O0 Zi-1 :f:+,:h:+:_O1 :f:+,:h:+:_Zi20 Tsd300ms Fns3u">
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
					<button class="btn D P1.5u;4u Lnh1.2 Bgc-$brand Bgc-$brand500_h C#fff Bdrd1u Txd-n C-$accent800 -Ts"> Share </button>
				</li>
				<li class="M0">
					<button class="btn D P1.5u;4u Lnh1.2 Bgc-$brand Bgc-$brand500_h C#fff Bdrd1u Txd-n C-$accent800 -Ts"> Update</button>
				</li>
			</ul>

			<div class="Ps-a Txa-l W20vw T-$headerH R0 Zi20 P2u Fns5u Tsd300ms"
				style="visibility: ${this.isKeyCorrect ? 'hidden' : 'visible'}; opacity:${this.isKeyCorrect ? '0' : '1'} ">
				<span class="D-ib P3u;4u Bdrd1u Bd2;s;red Bgc-$error C-$accent900 Txw-p">
					The editor's key you've entered didn't work!
				</span>
			</div>
		`;
	}
}

customElements.define('tool-bar', ToolBar);