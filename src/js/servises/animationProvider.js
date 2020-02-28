import UPNG from 'upng-js';
import download from 'downloadjs';
import Gif from 'gif.js-upgrade/dist/gif';
import canvasRef from '../model/canvas';
import { IMAGES, ARRAYBUFFER, ONESECINMILISEC } from '../controller/variables';

let animReqId;
let fps = parseInt(document.querySelector('.range-fps__input-fps').value, 10);
localStorage.setItem('piskelFps', fps);
document.querySelector('.value__number').innerText = localStorage.getItem('piskelFps');

const ANIMATIONDIV = document.querySelector('.animation-preview__preview-frame');


export default class AnimationProvider {
  static changeValueFPS(event) {
    cancelAnimationFrame(animReqId);
    fps = event.target.value;
    localStorage.removeItem('piskelFps');
    localStorage.setItem('piskelFps', fps);
    document.querySelector('.value__number').innerText = localStorage.getItem('piskelFps');
    AnimationProvider.animationHandler();
  }

  static animationHandler() {
    AnimationProvider._animate(
      (i) => {
        AnimationProvider._drawImageOnCanvas(IMAGES[i]);
      },
    );
  }

  static _drawImageOnCanvas(frame) {
    if (!frame) {
      ANIMATIONDIV.style.backgroundImage = "url('./images/default.png')";
    } else {
      ANIMATIONDIV.style.backgroundImage = `url('${frame}')`;
    }

    ANIMATIONDIV.style.backgroundColor = '#ffffff';
    ANIMATIONDIV.style.backgroundSize = 'contain';
    ANIMATIONDIV.style.backgroundRepeat = 'no-repeat';
    ANIMATIONDIV.style.backgroundPosition = 'top center';
  }

  static _animate(draw) {
    if (IMAGES.length === 0) return;

    const start = performance.now();
    let i = 0;
    let timeFraction = 0;
    let prev = timeFraction;
    let duration;

    function animateFrame(time) {
      fps = localStorage.getItem('piskelFps');

      if (+fps !== 0) {
        duration = ONESECINMILISEC / fps;
        prev = timeFraction;

        timeFraction = Math.abs(Math.floor((time - start) / duration));
        if (timeFraction !== prev) {
          draw(i); // draw frame
          i += 1;
          i %= IMAGES.length;
        }
        if (timeFraction >= 0) {
          animReqId = requestAnimationFrame(animateFrame);
        }
      }
    }

    animReqId = requestAnimationFrame(animateFrame);
  }

  static makeGif() {
    const gif = new Gif({
      workers: 2,
      quality: 10,
      workerScript: 'gif.worker.js',
      width: canvasRef.canvaso.width,
      height: canvasRef.canvaso.height,
    });

    IMAGES.forEach((el) => {
      const tempImg = document.createElement('img');
      tempImg.src = `${el}`;
      gif.addFrame(tempImg, {
        delay: ONESECINMILISEC / fps,
      });
    });

    gif.on('finished', (blob) => {
      download(blob, 'piskelGIF.gif', 'gif');
    });

    gif.render();
  }

  static makeApng() {
    const tempImg = UPNG.encode(
      ARRAYBUFFER,
      canvasRef.canvaso.width,
      canvasRef.canvaso.height,
      0,
      Array.from({ length: ARRAYBUFFER.length }, () => ONESECINMILISEC / fps),
    );
    download(tempImg, 'piskelApng.apng', 'apng');
  }
}
