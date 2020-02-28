import canvasRef from './canvas';
import colorStateRef from '../state/colorState';

export default class PaintBucket {
  static mousedown() {
    canvasRef.isDrawing = true;
    canvasRef.ctxo.fillStyle = colorStateRef.currentColor;
    canvasRef.ctxo.fillRect(0, 0, 512, 512);
    canvasRef.isDrawing = false;
  }
}
