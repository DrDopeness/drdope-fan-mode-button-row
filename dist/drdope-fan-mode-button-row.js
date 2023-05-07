window.customCards = window.customCards || [];
window.customCards.push({
  type: "drdope-fan-mode-button-row",
  name: "drdope fan mode button row",
  description: "A plugin to display your fan controls in a button row.",
  preview: false,
});

const LitElement = customElements.get("ha-panel-lovelace") ? Object.getPrototypeOf(customElements.get("ha-panel-lovelace")) : Object.getPrototypeOf(customElements.get("hc-lovelace"));
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;


class CustomFanModeRow extends LitElement {

	constructor() {
		super();
		this._config = {
			width: '30px',
			height: '30px',
			sendStateWithMode: false,
			modeOff: "none",
			modeZero: "unicorn",
			modeOne: "low",
			modeTwo: "medium",
			modeThree: "high",
			isOffColor: '#f44c09',
			isOnModeZer0Color: '#43A047',
			isOnModeOneColor: '#43A047',
			isOnModeTwoColor: '#43A047',
			isOnModeThreeColor: '#43A047',
			buttonInactiveColor: '#759aaa',
		};
	}
	
	static get properties() {
		return {
			hass: Object,
			_config: Object,
			_stateObj: Object,
			_modeOff: String,
			_modeZero: String,
			_modeOne: String,
			_modeTwo: String,
			_modeThree: String,
			_width: String,
			_height: String,
			_leftColor: String,
			_midLeftColor: String,
			_midRightColor: String,
			_rightColor: String,
			_leftText: String,
			_midLeftText: String,
			_midRightText: String,
			_rightText: String,
			_leftName: String,
			_midLeftName: String,
			_midRightName: String,
			_rightName: String,
			_leftState: Boolean,
			_midLeftState: Boolean,
			_midRightState: Boolean,
			_rightState: Boolean,
			_hideLeft: Boolean,
			_hideMidLeft: Boolean,
			_hideMidRight: Boolean,
			_hideRight: Boolean,
		};
	}

	static get styles() {
		return css`
			:host {
				line-height: inherit;
			}
			.mode {
				margin-left: 2px;
				margin-right: 2px;
				background-color: #759aaa;
				border: 1px solid lightgrey; 
				border-radius: 4px;
				font-size: 10px !important;
				color: inherit;
				text-align: center;
				float: left !important;
				padding: 1px;
				cursor: pointer;
			}
		`;
	}

	render() {
		return html`
			<hui-generic-entity-row .hass="${this.hass}" .config="${this._config}">
				<div id='button-container' class='horizontal justified layout'>
					<button
						class='mode'
						style='${this._leftColor};min-width:${this._width};max-width:${this._width};height:${this._height};${this._hideLeft}'
						toggles name="${this._leftName}"
						@click=${this.setMode}
						.disabled=${this._leftState}>${this._leftText}</button>
					<button
						class='mode'
						style='${this._midLeftColor};min-width:${this._width};max-width:${this._width};height:${this._height};${this._hideMidLeft}'
						toggles name="${this._midLeftName}"
						@click=${this.setMode}
						.disabled=${this._midLeftState}>${this._midLeftText}</button>
					<button
						class='mode'
						style='${this._midRightColor};min-width:${this._width};max-width:${this._width};height:${this._height};${this._hideMidRight}'
						toggles name="${this._midRightName}"
						@click=${this.setMode}
						.disabled=${this._midRightState}>${this._midRightText}</button>
					<button
						class='mode'
						style='${this._rightColor};min-width:${this._width};max-width:${this._width};height:${this._height};${this._hideRight}'
						toggles name="${this._rightName}"
						@click=${this.setMode}
						.disabled=${this._rightState}>${this._rightText}</button>
				</div>
			</hui-generic-entity-row>
		`;
	}

	firstUpdated() {
		super.firstUpdated();
		this.shadowRoot.getElementById('button-container').addEventListener('click', (ev) => ev.stopPropagation());
	}

	setConfig(config) {
		this._config = { ...this._config, ...config };
	}

	updated(changedProperties) {
		if (changedProperties.has("hass")) {
			this.hassChanged();
		}
	}

	hassChanged(hass) {

		const config = this._config;
		const stateObj = this.hass.states[config.entity];
		const sendStateWithMode = config.sendStateWithMode;
		const buttonWidth = config.width;
		const buttonHeight = config.height;
		const onM0Clr = config.isOnModeZeroColor;
		const onM1Clr = config.isOnModeOneColor;
		const onM2Clr = config.isOnModeTwoColor;
		const onM3Clr = config.isOnModeThreeColor;
		const offClr = config.isOffColor;
		const buttonOffClr = config.buttonInactiveColor;
		const mOff = config.modeOff;
		const m0 = config.modeZero;
		const m1 = config.modeOne;
		const m2 = config.modeTwo;
		const m3 = config.modeThree;

		let offstate;
		let mode0;
		let mode1;
		let mode2;
		let mode3;

		if (stateObj && stateObj.attributes) {
			if (stateObj.state == 'on' && stateObj.attributes.preset_mode == "unicorn") {
				mode0 = 'on';
			} else if (stateObj.state == 'on' && stateObj.attributes.preset_mode == "low") {
				mode1 = 'on';
			} else if (stateObj.state == 'on' && stateObj.attributes.preset_mode == "medium") {
				mode2 = 'on';
			} else if (stateObj.state == 'on' && stateObj.attributes.preset_mode == "high") {
				mode3 = 'on';
			} else {
				offstate = 'on';
			}
		}

		let offtext;
		let m0text;
		let m1text;
		let m2text;
		let m3text;


		offtext = "OFF";
		m0text = "UNICORN"
		m1text = "LOW";
		m2text = "MED";
		m3text = "HIGH";


		let mode0color;
		let mode1color;
		let mode2color;
		let mode3color;
		let offcolor;

		if (mode0 == 'on') {
			mode0color = 'background-color: var(--switch-checked-color)';
		} else {
			mode0color = 'background-color: var(--switch-unchecked-color)';
		}
		if (mode1 == 'on') {
			mode1color = 'background-color: var(--switch-checked-color)';
		} else {
			mode1color = 'background-color: var(--switch-unchecked-color)';
		}
		if (mode2 == 'on') {
			mode2color = 'background-color: var(--switch-checked-color)';
		} else {
			mode2color = 'background-color: var(--switch-unchecked-color)';
		}
		if (mode3 == 'on') {
			mode3color = 'background-color: var(--switch-checked-color)';
		} else {
			mode3color = 'background-color: var(--switch-unchecked-color)';
		}
		if (offstate == 'on') {
			offcolor = 'background-color: var(--switch-checked-color)';
		} else {
			offcolor = 'background-color: var(--switch-unchecked-color)';
		}


		let buttonwidth = buttonWidth;
		let buttonheight = buttonHeight;

		let offname = 'off'
		let m0name = 'mode0'
		let m1name = 'mode1'
		let m2name = 'mode2'
		let m3name = 'mode3'


		this._stateObj = stateObj;
		this._leftState = mode0 == 'on';
		this._midLeftState = mode1 === 'on';
		this._midRightState = mode2 === 'on';
		this._rightState = mode3 === 'on';
		this._width = buttonwidth;
		this._height = buttonheight;
		this._leftColor = mode0color;
		this._midLeftColor = mode1color;
		this._midRightColor = mode2color;
		this._rightColor = mode3color;
		this._modeZero = m0;
		this._modeOne = m1;
		this._modeTwo = m2;
		this._modeThree = m3;
		this._leftText = m0text;
		this._midLeftText = m1text;
		this._midRightText = m2text;
		this._rightText = m3text;
		this._leftName = m0name;
		this._midLeftName = m1name;
		this._midRightName = m2name;
		this._rightName = m3name;
		this._hideLeft = hideoff;
		this._hideMidLeft = twomodes_left;
		this._hideMidRight = twomodes_right;
		this._hideRight = nohide;
	}

	setMode(e) {
		const mode = e.currentTarget.getAttribute('name');
		const param = {entity_id: this._config.entity};
		if(mode == 'off' ){
			this.hass.callService('fan', 'turn_off', param);
		} else {
			if (this._config.sendStateWithMode) {
				this.hass.callService('fan', 'turn_on', param);
			} if (mode == 'mode0') {
				param.preset_mode = this._modeZero;
				this.hass.callService('fan', 'set_preset_mode', param);
			} else if (mode == 'mode1') {
				param.preset_mode = this._modeOne;
				this.hass.callService('fan', 'set_preset_mode', param);
			} else if (mode == 'mode2') {
				param.preset_mode = this._modeTwo;
				this.hass.callService('fan', 'set_preset_mode', param);
			} else if (mode == 'mode3') {
				param.preset_mode = this._modeThree;
				this.hass.callService('fan', 'set_preset_mode', param);
			}
		}
	}
}
	
customElements.define('drdope-fan-mode-button-row', CustomFanModeRow);
