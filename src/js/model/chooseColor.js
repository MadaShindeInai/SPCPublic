import colorStateRef from '../state/colorState';
import canvasRef from './canvas';
import { OPACITYCOEFFICIENT } from '../controller/variables';

export default class ChooseColor {
  static mousedown(event) {
    const x = Math.floor(event._x);
    const y = Math.floor(event._y);
    const { data } = canvasRef.ctxo.getImageData(x, y, 1, 1);

    const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / OPACITYCOEFFICIENT})`;
    if (colorStateRef.currentColor !== rgba) {
      colorStateRef.previousColor = colorStateRef.currentColor;
      colorStateRef.currentColor = rgba;
      ChooseColor._changeBackgroundColorElement();
    } else if (rgba === 'rgba(0, 0, 0, 0)' && colorStateRef.currentColor === '#008000') {
      colorStateRef.previousColor = colorStateRef.currentColor;
      colorStateRef.currentColor = '#E0E0E0';
      ChooseColor._changeBackgroundColorElement();
    }
  }

  static _changeBackgroundColorElement() {
    document.querySelector('.tool-bar__color--current').style.background = colorStateRef.currentColor;
    document.querySelector('.tool-bar__color--previous').style.background = colorStateRef.previousColor;
  }
}
