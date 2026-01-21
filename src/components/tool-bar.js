import { LitElement, html} from "lit";

export class ToolBar extends LitElement {
	static properties = {
		editorKey: {type: String},
		canUpdate: {type: Boolean},
		canShare: {type: Boolean}
	}

	createRenderRoot(){
		return this
	}

	copyKey() {
		navigator.clipboard.writeText(this.editorKey)
	}

	typeKey(e) {
		this.editorKey = e.target.value;
	}

	constructor(){
		super();
		this.editorKey = '';
	}

	render(){
		return html`
			<ul class="Lsst-n P0 M0 H100p D-f Gap4u Ai-c Jc-fs Fns5u Flg1">
				<li class="M0 P0 D-f Ai-str">
					<input name="editor-key" type="text" value="${this.editorKey}" @keyup="${this.typeKey}" placeholder="Editor key" class="M0  P1u;3u Bdtlr5u Bdblr5u Fns4u Bd1;s;$accent800 Ol-n_f Bgc-$core800 C-$accent700">

					<button @click="${this.copyKey}" class="btn -Ctx-button D M0 Mnw10u P1u;2u Bd1;s;$accent800 Bdl-n Bdtrr5u Bdbrr5u Bgc-$core800 -Ts Bgc-$brand_h">
						<svg class="D -Sz5u St-$accent800 Tsd-ih ^button:h:_St-$core800">
							<use href="/img/icons.svg#copy"></use>
						</svg>
					</button>
					
				</li>
				<li class="M0">
					<button class="btn D Txd-n C-$accent800 C-$brand_h -Ts Fnw600"> Share </button>
				</li>
				<li class="M0">
					<button class="btn D Txd-n C-$accent800 C-$brand_h -Ts Fnw600"> Update</button>
				</li>
			</ul>
		`
	}
}

customElements.define('tool-bar', ToolBar)