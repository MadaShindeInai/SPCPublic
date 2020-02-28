import { IMAGES } from '../controller/variables';

let frameArrElem;
let dragSrcEl;

export default class DragAndDropProvider {
  static handleDragStart(e) {
    const frameNum = parseInt(e.target.getAttribute('id'), 10);
    frameArrElem = IMAGES.splice(frameNum, 1);
    e.target.style.opacity = '0.4';
    dragSrcEl = e.target;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.style.order);
  }

  static handleDragOver(e) {
    if (e.preventDefault) e.preventDefault();

    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  static handleDragEnter(e) {
    e.target.classList.add('over');
  }

  static handleDragLeave(e) {
    e.target.classList.remove('over');
  }

  static handleDrop(event) {
    if (event.stopPropagation) event.stopPropagation();

    const frameNum = parseInt(event.target.getAttribute('id'), 10);
    IMAGES.splice(frameNum, 0, ...frameArrElem);
    dragSrcEl.style.opacity = '1';

    if (dragSrcEl !== event.target) {
      dragSrcEl.style.order = event.target.style.order;
      event.target.style.order = event.dataTransfer.getData('text/html');
    }

    return false;
  }

  static handleDragEnd() {
    const listOfFrames = document.querySelectorAll('.frame');

    for (const item of listOfFrames) {
      item.classList.remove('over');
    }
  }
}
