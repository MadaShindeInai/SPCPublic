import colorStateRef from '../state/colorState';
import ImageUpdater from '../servises/imageUpdater';
import canvasRef from './canvas';

let startCoordinates = [0, 0];
let currentCoordinates = [0, 0];

export default class Eraser {
  static mousedown(ev) {
    canvasRef.isDrawing = true;
    canvasRef.ctx.fillStyle = colorStateRef.temporaryColor;
    startCoordinates = Eraser._getCoordinates(ev, canvasRef.pixelValue);

    canvasRef.ctx.fillRect(
      startCoordinates[0] * canvasRef.pixelValue,
      startCoordinates[1] * canvasRef.pixelValue,
      canvasRef.pixelValue,
      canvasRef.pixelValue,
    );
  }

  static mousemove(ev) {
    if (!canvasRef.isDrawing) return;
    currentCoordinates = Eraser._getCoordinates(ev, canvasRef.pixelValue);
    Eraser._draw(canvasRef.ctx, startCoordinates, currentCoordinates, canvasRef.pixelValue);
    startCoordinates = currentCoordinates;
  }

  static mouseup(ev) {
    if (canvasRef.isDrawing) {
      Eraser.mousemove(ev);
      canvasRef.isDrawing = false;
      ImageUpdater.imgUpdate();
    }
  }

  static mouseout() {
    canvasRef.isDrawing = false;
  }

  static _draw() {
    let x0 = startCoordinates[0];
    let y0 = startCoordinates[1];
    const x = currentCoordinates[0];
    const y = currentCoordinates[1];

    const deltaX = Math.abs(x - x0);
    const deltaY = Math.abs(y - y0);
    const signX = x0 < x ? 1 : -1;
    const signY = y0 < y ? 1 : -1;
    let difference = deltaX - deltaY;

    while (!(x0 === x && y0 === y)) {
      canvasRef.ctx.fillStyle = colorStateRef.temporaryColor;
      canvasRef.ctx.fillRect(
        x0 * canvasRef.pixelValue,
        y0 * canvasRef.pixelValue,
        canvasRef.pixelValue,
        canvasRef.pixelValue,
      );

      if (x0 === x && y0 === y) break;
      const differenceX2 = difference * 2;

      if (differenceX2 > -deltaY) {
        difference -= deltaY;
        x0 += signX;
      }

      if (differenceX2 < deltaX) {
        difference += deltaX;
        y0 += signY;
      }
    }
  }

  static _getCoordinates(event) {
    const x = Math.floor(event._x / canvasRef.pixelValue);
    const y = Math.floor(event._y / canvasRef.pixelValue);
    return [x, y];
  }
}
