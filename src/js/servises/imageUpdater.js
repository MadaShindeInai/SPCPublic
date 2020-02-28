import canvasRef from '../model/canvas';

export default class ImageUpdater {
  static imgUpdate() {
    canvasRef.ctxo.drawImage(canvasRef.canvas, 0, 0);
    canvasRef.ctx.clearRect(0, 0, canvasRef.canvas.width, canvasRef.canvas.height);
  }
}
