import SwitchColorProvider from './servises/switchColorProvider';
import colorStateRef from './state/colorState';
import DragAndDropProvider from './servises/dragAndDropProvider';
import { IMAGES } from './controller/variables';

describe('Test class SwitchColorProvider', () => {
  describe('Test of the correct switchColor method execution with string:', () => {
    it('check swap color in colorStateRef.currentColor if string is coming', () => {
      document.body.innerHTML = '<div class="tool-bar__color--current">' + '</div>' + '<div class="tool-bar__color--previous">' + '</div>';
      SwitchColorProvider.switchColor('#080080');
      expect(colorStateRef.currentColor).toEqual('#080080');
    });
    it('check swap color in colorStateRef.previousColor if string is coming', () => {
      SwitchColorProvider.switchColor('#ffff00');
      expect(colorStateRef.previousColor).toEqual('#080080');
    });
    it('check correct setting color to DOM element of previous color', () => {
      const prev = document.querySelector('.tool-bar__color--previous');

      SwitchColorProvider.switchColor('#e0e0e0');
      expect(prev.style.background).toEqual('rgb(255, 255, 0)');
    });
    it('check correct setting color to DOM element of current color', () => {
      const curr = document.querySelector('.tool-bar__color--current');

      SwitchColorProvider.switchColor('#dc143c');
      expect(curr.style.background).toEqual('rgb(220, 20, 60)');
    });
  });
  describe('Test of the correct switchColor method execution with event:', () => {
    it('check swap color in colorStateRef.currentColor if string is coming', () => {
      const event = {
        target: {
          value: '#808000',
        },
      };
      SwitchColorProvider.switchColor(event);
      expect(colorStateRef.currentColor).toEqual('#808000');
    });
    it('check swap color in colorStateRef.previousColor if string is coming', () => {
      const event = {
        target: {
          value: '#00ff00',
        },
      };
      SwitchColorProvider.switchColor(event);
      expect(colorStateRef.previousColor).toEqual('#808000');
    });
    it('check correct setting color to DOM element of previous color', () => {
      const event = {
        target: {
          value: '#00ff00',
        },
      };
      const prev = document.querySelector('.tool-bar__color--previous');

      SwitchColorProvider.switchColor(event);
      expect(prev.style.background).toEqual('rgb(128, 128, 0)');
    });
    it('check correct setting color to DOM element of previous color', () => {
      const event = {
        target: {
          value: '#dc143c',
        },
      };
      const curr = document.querySelector('.tool-bar__color--current');

      SwitchColorProvider.switchColor(event);
      expect(curr.style.background).toEqual('rgb(220, 20, 60)');
    });
  });
});

describe('Test class DragAndDropProvider', () => {
  describe('Test of handleDragEnter and handleDragLeave method:', () => {
    it('check adding class "over" to DOM element', () => {
      document.body.innerHTML = '<div class="classToTest">' + '</div>';
      const element = document.querySelector('.classToTest');
      const e = {
        target: element,
      };

      DragAndDropProvider.handleDragEnter(e);
      expect(element.classList).toContain('over');
    });
    it('check removing class "over" from DOM element', () => {
      const element = document.querySelector('.classToTest');
      const e = {
        target: element,
      };

      DragAndDropProvider.handleDragLeave(e);
      expect(element.classList).not.toContain('over');
    });
  });
  describe('Test of handleDragEnd method:', () => {
    it('check removing class "over" from DOM element', () => {
      document.body.innerHTML = '<div class="frame over">' + '</div>';
      const element = document.querySelector('.frame');
      DragAndDropProvider.handleDragEnd();
      expect(element.classList).not.toContain('over');
    });
    it('check removing class "over" from multiply DOM elements', () => {
      document.body.innerHTML = '<div class="frame over">' + '</div>'
      + '<div class="frame over">' + '</div>'
      + '<div class="frame test over">' + '</div>';
      const element = document.querySelector('.test');
      DragAndDropProvider.handleDragEnd();
      expect(element.classList).not.toContain('over');
    });
    it('check not removing class "over" from element without class "frame"', () => {
      document.body.innerHTML = '<div class="frame over">' + '</div>'
      + '<div class="frame over">' + '</div>'
      + '<div class=" test over">' + '</div>';
      const element = document.querySelector('.test');
      DragAndDropProvider.handleDragEnd();
      expect(element.classList).toContain('over');
    });
  });
  describe('Test of handleDragStart method:', () => {
    it('check removimg element from array', () => {
      document.body.innerHTML = '<div id="0" class="frame">' + '</div>'
      + '<div id="1" class="frame test">' + '</div>';
      const element = document.querySelector('.frame');
      const element1 = document.querySelector('.test');
      const e = {
        target: element,
        dataTransfer: {
          element1,
          setData(a, b) {
            element.style.order = b;
            element.content = a;
          },
        },
      };
      IMAGES.push(1111);
      DragAndDropProvider.handleDragStart(e);
      expect(IMAGES[1]).toBeUndefined();
    });
    it('check adding attr content with "text/html" to DOM element', () => {
      document.body.innerHTML = '<div id="0" class="frame">' + '</div>'
      + '<div id="1" class="frame test">' + '</div>';
      const element = document.querySelector('.frame');
      const element1 = document.querySelector('.test');
      const e = {
        target: element,
        dataTransfer: {
          element1,
          setData(a, b) {
            element.style.order = b;
            element.content = a;
          },
        },
      };
      IMAGES.push(1111);
      DragAndDropProvider.handleDragStart(e);
      expect(element.content).toEqual('text/html');
    });
    it('check element.style.order to be set', () => {
      document.body.innerHTML = '<div id="0" class="frame" style="order:2">' + '</div>'
      + '<div id="1" class="frame test">' + '</div>';
      const element = document.querySelector('.frame');
      const element1 = document.querySelector('.test');
      const e = {
        target: element,
        dataTransfer: {
          element1,
          setData(a, b) {
            element.style.order = b;
            element.content = a;
          },
        },
      };
      IMAGES.push(1111);
      DragAndDropProvider.handleDragStart(e);
      expect(element.style.order).toEqual('2');
    });
    it('check element.style.opacity to be set', () => {
      document.body.innerHTML = '<div id="0" class="frame" style="order:2">' + '</div>'
      + '<div id="1" class="frame test">' + '</div>';
      const element = document.querySelector('.frame');
      const element1 = document.querySelector('.test');
      const e = {
        target: element,
        dataTransfer: {
          element1,
          setData(a, b) {
            element.style.order = b;
            element.content = a;
          },
        },
      };
      IMAGES.push(1111);
      DragAndDropProvider.handleDragStart(e);
      expect(element.style.opacity).toEqual('0.4');
    });
    it('check e.dataTransfer.effectAllowed to be set "move"', () => {
      document.body.innerHTML = '<div id="0" class="frame" style="order:2">' + '</div>'
      + '<div id="1" class="frame test">' + '</div>';
      const element = document.querySelector('.frame');
      const element1 = document.querySelector('.test');
      const e = {
        target: element,
        dataTransfer: {
          element1,
          effectAllowed: '',
          setData(a, b) {
            element.style.order = b;
            element.content = a;
          },
        },
      };
      IMAGES.push(1111);
      DragAndDropProvider.handleDragStart(e);
      expect(e.dataTransfer.effectAllowed).toEqual('move');
    });
  });
  describe('Test of handleDragOver method:', () => {
    it('check e.dataTransfer.dropEffect to be set "move"', () => {
      document.body.innerHTML = '<div id="0" class="frame">' + '</div>'
      + '<div id="1" class="frame test">' + '</div>';
      const element = document.querySelector('.frame');
      const element1 = document.querySelector('.test');
      const e = {
        target: element,
        dataTransfer: {
          element1,
          effectAllowed: '',
          setData(a, b) {
            element.style.order = b;
            element.content = a;
          },
        },
      };
      IMAGES.push(1111);
      DragAndDropProvider.handleDragOver(e);
      expect(e.dataTransfer.dropEffect).toEqual('move');
    });
    it('check e.dataTransfer.dropEffect to be set "move"', () => {
      document.body.innerHTML = '<div id="0" class="frame">' + '</div>'
      + '<div id="1" class="frame test">' + '</div>';
      const element = document.querySelector('.frame');
      const element1 = document.querySelector('.test');
      const e = {
        target: element,
        dataTransfer: {
          element1,
          effectAllowed: '',
          setData(a, b) {
            element.style.order = b;
            element.content = a;
          },
        },
      };
      IMAGES.push(1111);
      DragAndDropProvider.handleDragOver(e);
      expect(DragAndDropProvider.handleDragOver(e)).toBeFalsy();
    });
  });
});
