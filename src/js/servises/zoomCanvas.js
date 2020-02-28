import canvasRef from '../model/canvas';
import { MAXZOOMVALUE } from '../controller/variables';

const CANVASSIZEHANDLE = document.querySelector('.canvas-size__input-px');
const CANVASSIZE = document.querySelector('.canvas-size__number');

export default class ZoomCanvas {
  static _resizeCanvas() {
    const scaleCoef = +((MAXZOOMVALUE / CANVASSIZEHANDLE.valueAsNumber).toFixed(2));
    const shiftCoef = (MAXZOOMVALUE - CANVASSIZEHANDLE.valueAsNumber) / 2;


    canvasRef.canvaso.style.transform = `scale(${scaleCoef})`;
    canvasRef.canvaso.style.left = `${shiftCoef}px`;
    canvasRef.canvaso.style.top = `${shiftCoef}px`;

    canvasRef.canvas.style.transform = `scale(${scaleCoef})`;
    canvasRef.canvas.style.left = `${shiftCoef}px`;
    canvasRef.canvas.style.top = `${shiftCoef}px`;
  }

  static managerZoom(e) {
    if (e.deltaY) {
      if (e.deltaY > 0 && CANVASSIZEHANDLE.valueAsNumber >= 32) {
        CANVASSIZEHANDLE.valueAsNumber += 10;
      }
      if (e.deltaY < 0 && CANVASSIZEHANDLE.valueAsNumber <= MAXZOOMVALUE) {
        CANVASSIZEHANDLE.valueAsNumber -= 10;
      }
    }
    const zoomValue = ((1 - (CANVASSIZEHANDLE.value / MAXZOOMVALUE)) + 1).toFixed(2);
    CANVASSIZE.innerHTML = `${zoomValue}`;
    ZoomCanvas._resizeCanvas();
  }
}
