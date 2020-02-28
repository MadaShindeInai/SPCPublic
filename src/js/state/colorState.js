import { DEMOCURRENTCOLOR, DEMOPREVIOUSCOLOR, DEMOTEMPORARYCOLOR } from '../controller/variables';

class ColorState {
  get currentColor() {
    return this._currentColor;
  }

  get previousColor() {
    return this._previousColor;
  }

  get temporaryColor() {
    return this._temporaryColor;
  }

  set currentColor(currentColor) {
    this._currentColor = currentColor;
  }

  set previousColor(previousColor) {
    this._previousColor = previousColor;
  }

  set temporaryColor(temporaryColor) {
    this._temporaryColor = temporaryColor;
  }

  constructor() {
    this._currentColor = DEMOCURRENTCOLOR;
    this._previousColor = DEMOPREVIOUSCOLOR;
    this._temporaryColor = DEMOTEMPORARYCOLOR;
  }
}

const colorStateRef = new ColorState();

export default colorStateRef;
