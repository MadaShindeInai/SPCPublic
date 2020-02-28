import canvasRef from './canvas';
import colorStateRef from '../state/colorState';
import ImageUpdater from '../servises/imageUpdater';

let x0;
let y0;

export default class Line {
  static mousedown(ev) {
    canvasRef.isDrawing = true;
    x0 = ev._x;
    y0 = ev._y;
  }

  static mousemove(ev) {
    if (!canvasRef.isDrawing) return;
    canvasRef.ctx.strokeStyle = colorStateRef.currentColor;
    canvasRef.ctx.lineWidth = canvasRef.pixelValue;
    canvasRef.ctx.clearRect(0, 0, canvasRef.canvas.width, canvasRef.canvas.height);
    canvasRef.ctx.beginPath();
    canvasRef.ctx.moveTo(x0, y0);
    canvasRef.ctx.lineTo(ev._x, ev._y);
    canvasRef.ctx.stroke();
    canvasRef.ctx.closePath();
  }

  static mouseup(ev) {
    if (canvasRef.isDrawing) {
      Line.mousemove(ev);
      canvasRef.isDrawing = false;
      ImageUpdater.imgUpdate();
    }
  }

  static mouseout() {
    canvasRef.isDrawing = false;
  }
}
