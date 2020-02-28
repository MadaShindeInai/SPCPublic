import canvasRef from '../model/canvas';

export default class SwitchActiveProvider {
  static switchActiveOnControlls(activeTool, cursor) {
    document.querySelector('.work-place__tool-bar .active').classList.remove('active');
    document.querySelector(`.work-place__tool-bar .${activeTool}`).classList.add('active');
    if (canvasRef.canvas.classList.contains('bucketCursor')) {
      canvasRef.canvas.classList.remove('bucketCursor');
    }
    if (canvasRef.canvas.classList.contains('pippeteCursor')) {
      canvasRef.canvas.classList.remove('pippeteCursor');
    }
    if (canvasRef.canvas.classList.contains('pencilCursor')) {
      canvasRef.canvas.classList.remove('pencilCursor');
    }
    if (canvasRef.canvas.classList.contains('eraserCursor')) {
      canvasRef.canvas.classList.remove('eraserCursor');
    }
    if (canvasRef.canvas.classList.contains('strokeCursor')) {
      canvasRef.canvas.classList.remove('strokeCursor');
    }
    if (canvasRef.canvas.classList.contains('rectangleCursor')) {
      canvasRef.canvas.classList.remove('rectangleCursor');
    }
    canvasRef.canvas.classList.add(`${cursor}`);
  }

  static switchActiveSizeButtons(activeTool) {
    document.querySelector('.canvas-size__tool-bar .active').classList.remove('active');
    document.querySelector(`.canvas-size__tool-bar .${activeTool}`).classList.add('active');
  }
}
