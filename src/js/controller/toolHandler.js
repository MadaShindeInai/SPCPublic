import { toolBarRef, TOOL } from '../model/toolsBar';
import SwitchActiveProvider from '../servises/switchActiveProvider';
import FrameProvider from '../servises/frameProvider';
import FullScreenProvider from '../servises/fullScreenProvider';
import AnimationProvider from '../servises/animationProvider';
import SwitchCanvasParamsProvider from '../servises/switchCanvasParamsProvider';
import SwitchColorProvider from '../servises/switchColorProvider';
import { CANVASSIZES, CANVASSIZEM, CANVASSIZEL } from './variables';

const MODALWINDOW = document.querySelector('.modal');

export default class ToolHandler {
  static switchTool(event) {
    if (event.target.classList.contains('pencil') || (event.code === 'KeyK' && event.altKey)) {
      TOOL.link = toolBarRef.pencil;
      SwitchActiveProvider.switchActiveOnControlls('pencil', 'pencilCursor');
    }
    if (event.target.classList.contains('chooseColor') || (event.code === 'KeyC' && event.altKey)) {
      TOOL.link = toolBarRef.chooseColor;
      SwitchActiveProvider.switchActiveOnControlls('chooseColor', 'pippeteCursor');
    }
    if (event.target.classList.contains('paintBucket') || (event.code === 'KeyB' && event.altKey)) {
      TOOL.link = toolBarRef.paintBucket;
      SwitchActiveProvider.switchActiveOnControlls('paintBucket', 'bucketCursor');
    }
    if (event.target.classList.contains('eraser') || (event.code === 'KeyH' && event.altKey)) {
      TOOL.link = toolBarRef.eraser;
      SwitchActiveProvider.switchActiveOnControlls('eraser', 'eraserCursor');
    }
    if (event.target.classList.contains('line') || (event.code === 'KeyL' && event.altKey)) {
      TOOL.link = toolBarRef.line;
      SwitchActiveProvider.switchActiveOnControlls('line', 'strokeCursor');
    }
    if (event.target.classList.contains('rectangle') || (event.code === 'KeyR' && event.altKey)) {
      TOOL.link = toolBarRef.rect;
      SwitchActiveProvider.switchActiveOnControlls('rectangle', 'rectangleCursor');
    }
    if (event.target.classList.contains('previous') || (event.code === 'Digit1' && event.altKey)) {
      ToolHandler._pickBgk('previous');
    }
    if (event.target.classList.contains('red') || (event.code === 'Digit2' && event.altKey)) {
      ToolHandler._pickBgk('red');
    }
    if (event.target.classList.contains('blue') || (event.code === 'Digit3' && event.altKey)) {
      ToolHandler._pickBgk('blue');
    }
    if (event.target.classList.contains('bw') || (event.code === 'Digit4' && event.altKey)) {
      SwitchCanvasParamsProvider.greyScale();
    }
    if (event.target.classList.contains('button--XL') || (event.code === 'KeyA' && event.altKey)) {
      FrameProvider.createFrame();
    }
    if (event.target.classList.contains('sizeS') || (event.code === 'Digit5' && event.altKey)) {
      SwitchCanvasParamsProvider.switchSizeCanvas(CANVASSIZES);
      SwitchActiveProvider.switchActiveSizeButtons('sizeS');
    }
    if (event.target.classList.contains('sizeM') || (event.code === 'Digit6' && event.altKey)) {
      SwitchCanvasParamsProvider.switchSizeCanvas(CANVASSIZEM);
      SwitchActiveProvider.switchActiveSizeButtons('sizeM');
    }
    if (event.target.classList.contains('sizeL') || (event.code === 'Digit7' && event.altKey)) {
      SwitchCanvasParamsProvider.switchSizeCanvas(CANVASSIZEL);
      SwitchActiveProvider.switchActiveSizeButtons('sizeL');
    }
    if (event.target.classList.contains('getGif') || (event.code === 'Digit8' && event.altKey)) {
      AnimationProvider.makeGif();
    }
    if (event.target.classList.contains('getApng') || (event.code === 'Digit9' && event.altKey)) {
      AnimationProvider.makeApng();
    }
    if (event.target.classList.contains('deleteIcon')) {
      FrameProvider.deleteFrame(event);
    }
    if (event.target.classList.contains('cloneFrameIcon')) {
      FrameProvider.cloneFrame(event);
    }
    if (event.code === 'F11') {
      event.preventDefault();
      FullScreenProvider.toggleFullScreen();
    }
    if (event.target.classList.contains('modal-show')) {
      MODALWINDOW.style.display = 'block';
    }

    if (event.target.classList.contains('modal-hide')) {
      MODALWINDOW.style.display = 'none';
    }

    if (event.target === MODALWINDOW) {
      MODALWINDOW.style.display = 'none';
    }
  }

  static switcher(event) {
    event._x = event.offsetX;
    event._y = event.offsetY;
    if (event.type in TOOL.link) {
      TOOL.link[event.type](event);
    }
  }

  static _pickBgk(name) {
    const tempColor = window.getComputedStyle(document.querySelector(`.tool-bar__color--${name}`), null).getPropertyValue('background-color');
    return SwitchColorProvider.switchColor(tempColor);
  }
}
