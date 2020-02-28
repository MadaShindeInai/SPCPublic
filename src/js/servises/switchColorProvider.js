import colorStateRef from '../state/colorState';

export default class SwitchColorProvider {
  static switchColor(event) {
    let tempColorValue = '';
    if (typeof event === 'string') {
      tempColorValue = event;
    } else {
      tempColorValue = event.target.value;
    }

    if (colorStateRef.currentColor !== tempColorValue) {
      colorStateRef.previousColor = colorStateRef.currentColor;
      colorStateRef.currentColor = tempColorValue;
      SwitchColorProvider._changeBackgroundColorElement();
    }
  }

  static _changeBackgroundColorElement() {
    document.querySelector('.tool-bar__color--current').style.background = colorStateRef.currentColor;
    document.querySelector('.tool-bar__color--previous').style.background = colorStateRef.previousColor;
  }
}
