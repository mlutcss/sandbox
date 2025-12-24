import { LitElement, html } from 'lit';
import { initialCode } from '../assets/data/initialCode';
import { watch, SignalWatcher } from '@lit-labs/signals';
import { layout, styles, config, count } from '../assets/scripts/lit-context';

export class CodePreview extends SignalWatcher(LitElement) {

	createRenderRoot() {
		return this;
	}

	static properties = {
		documentContent: { type: String }
	};

	constructor() {
		super();
		this.documentContent = '';
	}

	render() {
		return html`
      <iframe srcdoc='<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<style>
					${ watch(styles) }
				</style>
			</head>
			<body style="margin:0">
				${ watch(layout) }
			</body>
			</html>'
			 class="D -Sz100p Bd-n P0">
      </iframe>
		`;
	}
}

customElements.define('code-preview', CodePreview);