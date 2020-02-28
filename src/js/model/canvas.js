import { DEMOPIXELVALUE } from '../controller/variables';

class Canvas {
  get canvaso() {
    return this._canvaso;
  }

  get ctxo() {
    return this._ctxo;
  }

  get isDrawing() {
    return this._isDrawing;
  }

  get ctx() {
    return this._ctx;
  }

  get canvas() {
    return this._canvas;
  }

  get pixelValue() {
    return this._pixelValue;
  }

  set isDrawing(isDrawing) {
    this._isDrawing = isDrawing;
  }

  set pixelValue(pixelValue) {
    this._pixelValue = pixelValue;
  }

  constructor() {
    this._canvaso = document.querySelector('.canvas-field');
    this._ctxo = this._canvaso.getContext('2d');
    this._ctxo.fillStyle = '#ffffff';
    this._ctxo.fillRect(0, 0, 512, 512);
    this._isDrawing = false;
    this._pixelValue = DEMOPIXELVALUE;

    this._addTempCanvas();
  }

  _addTempCanvas() {
    this._canvas = document.createElement('canvas');
    this._canvas.className = 'canvas-field-temp';
    this._canvas.width = this._canvaso.width;
    this._canvas.height = this._canvaso.height;
    this._ctx = this._canvas.getContext('2d');
    this._container = this._canvaso.parentNode;
    this._container.appendChild(this._canvas);
  }
}

const canvasRef = new Canvas();

export default canvasRef;
