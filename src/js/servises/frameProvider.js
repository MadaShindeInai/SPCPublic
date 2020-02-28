import { IMAGES, ARRAYBUFFER, FRAMEARRAY } from '../controller/variables';
import AnimationProvider from './animationProvider';
import canvasRef from '../model/canvas';

export default class FrameProvider {
  static createFrame() {
    const { parentNode } = document.querySelector('.frames__item');
    const frame = document.createElement('div');
    const deleteIcon = document.createElement('div');
    const cloneFrameIcon = document.createElement('div');

    cloneFrameIcon.className = 'cloneFrameIcon';
    cloneFrameIcon.innerHTML = '&';
    deleteIcon.className = 'deleteIcon';
    deleteIcon.innerHTML = 'x';
    frame.className = 'frame';
    frame.setAttribute('draggable', 'true');
    frame.style.background = `url('${FrameProvider._getImage()}')`;
    frame.style.backgroundSize = 'cover';
    frame.id = `${IMAGES.length - 1}`;
    frame.style.order = `${IMAGES.length}`;
    FRAMEARRAY.push(frame);

    parentNode.append(frame);
    frame.append(deleteIcon);
    frame.append(cloneFrameIcon);

    FrameProvider._clearCanvas();
    AnimationProvider.animationHandler();
  }

  static _getImage() {
    const canvas = document.querySelector('canvas');
    const imageData = canvas.toDataURL();
    const image = new Image();
    image.src = imageData;
    IMAGES.push(image.src);

    const { data } = canvasRef.ctxo.getImageData(0, 0,
      canvasRef.ctxo.canvas.width,
      canvasRef.ctxo.canvas.height);
    ARRAYBUFFER.push(data.buffer);
    return image.src;
  }

  static _clearCanvas() {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvasRef.ctxo.fillStyle = '#ffffff';
    canvasRef.ctxo.fillRect(0, 0, 512, 512);
  }

  static deleteFrame(event) {
    const frame = event.target.parentNode;
    frame.className = 'deleted';
    const { id } = frame;
    IMAGES.splice(id, 1);
    ARRAYBUFFER.splice(id, 1);
    const listOfFrames = document.querySelectorAll('.frame');
    listOfFrames.forEach((item, index) => { item.id = index; });
    frame.remove();
  }

  static cloneFrame(event) {
    const oldFrame = event.target.parentNode;
    const frame = document.createElement('div');
    const deleteIcon = document.createElement('div');
    const cloneFrameIcon = document.createElement('div');

    cloneFrameIcon.className = 'cloneFrameIcon';
    cloneFrameIcon.innerHTML = '&';
    frame.id = `${oldFrame.id} + 1`;
    deleteIcon.className = 'deleteIcon';
    deleteIcon.innerHTML = 'x';
    frame.className = 'frame';
    frame.style.background = `${oldFrame.style.background}`;
    frame.style.backgroundSize = 'cover';
    frame.id = `${+oldFrame.id + 1}`;
    oldFrame.after(frame);
    frame.append(deleteIcon);
    frame.append(cloneFrameIcon);
    IMAGES.splice(oldFrame.id, 0, `${IMAGES[oldFrame.id]}`);
    ARRAYBUFFER.splice(frame.id, 0, `${ARRAYBUFFER[oldFrame.id]}`);
    const listOfFrames = document.querySelectorAll('.frame');
    listOfFrames.forEach((item, index) => { item.id = index; });
  }
}
