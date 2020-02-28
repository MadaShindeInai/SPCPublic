import Pencil from './pencil';
import Eraser from './eraser';
import PaintBucket from './paintBucket';
import ChooseColor from './chooseColor';
import Line from './line';
import Rect from './rectangle';

class ToolsBar {
  get pencil() {
    return this._pencil;
  }

  get line() {
    return this._line;
  }

  get chooseColor() {
    return this._chooseColor;
  }

  get rect() {
    return this._rect;
  }

  get eraser() {
    return this._eraser;
  }

  get paintBucket() {
    return this._paintBucket;
  }

  constructor() {
    this._pencil = Pencil;
    this._chooseColor = ChooseColor;
    this._line = Line;
    this._rect = Rect;
    this._eraser = Eraser;
    this._paintBucket = PaintBucket;
  }
}

export const toolBarRef = new ToolsBar();

export const TOOL = {
  link: toolBarRef.pencil,
};
