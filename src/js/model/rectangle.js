import colorStateRef from '../state/colorState';
import canvasRef from './canvas';
import ImageUpdater from '../servises/imageUpdater';

let x0;
let y0;

export default class Rect {
  static mousedown(ev) {
    canvasRef.isDrawing = true;
    x0 = ev._x;
    y0 = ev._y;
  }

  static mousemove(ev) {
    if (!canvasRef.isDrawing) return;
    canvasRef.ctx.strokeStyle = colorStateRef.currentColor;
    canvasRef.ctx.lineWidth = canvasRef.pixelValue;
    const x = Math.min(ev._x, x0);
    const y = Math.min(ev._y, y0);
    const w = Math.abs(ev._x - x0);
    const h = Math.abs(ev._y - y0);

    canvasRef.ctx.clearRect(0, 0, canvasRef.canvas.width, canvasRef.canvas.height);

    if (!w || !h) return;

    canvasRef.ctx.strokeRect(x, y, w, h);
  }

  static mouseup(ev) {
    if (canvasRef.isDrawing) {
      Rect.mousemove(ev);
      canvasRef.isDrawing = false;
      ImageUpdater.imgUpdate();
    }
  }

  static mouseout() {
    canvasRef.isDrawing = false;
  }
}
