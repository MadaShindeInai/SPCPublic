import canvasRef from './model/canvas';
import ToolHandler from './controller/toolHandler';
import ZoomCanvas from './servises/zoomCanvas';
import AnimationProvider from './servises/animationProvider';
import SwitchCanvasParamsProvider from './servises/switchCanvasParamsProvider';
import SwitchColorProvider from './servises/switchColorProvider';
import AuthorizationProvider from './servises/authorizationProvider';
import DragAndDropProvider from './servises/dragAndDropProvider';

const INPUTCOLOR = document.querySelector('.input-color');
const INPUTFPS = document.querySelector('.range-fps__input-fps');
const PENVALUE = document.querySelector('.pen-size__input-px');
const CANVASSIZEHANDLE = document.querySelector('.canvas-size__input-px');
const LOGIN = document.getElementById('logIn');
const LOGOUT = document.getElementById('logOut');
const FRAMECONTAINER = document.querySelector('.scroll-container');

document.addEventListener('click', ToolHandler.switchTool);
INPUTCOLOR.addEventListener('change', SwitchColorProvider.switchColor);
document.addEventListener('keydown', ToolHandler.switchTool);
INPUTFPS.addEventListener('input', AnimationProvider.changeValueFPS);
PENVALUE.addEventListener('input', SwitchCanvasParamsProvider.changePixelValue);
CANVASSIZEHANDLE.addEventListener('input', ZoomCanvas.managerZoom);

canvasRef.canvas.addEventListener('mousedown', ToolHandler.switcher);
canvasRef.canvas.addEventListener('mousemove', ToolHandler.switcher);
canvasRef.canvas.addEventListener('mouseup', ToolHandler.switcher);
canvasRef.canvas.addEventListener('mouseout', ToolHandler.switcher);
canvasRef.canvas.addEventListener('wheel', ZoomCanvas.managerZoom);

FRAMECONTAINER.addEventListener('dragstart', DragAndDropProvider.handleDragStart);
FRAMECONTAINER.addEventListener('dragenter', DragAndDropProvider.handleDragEnter);
FRAMECONTAINER.addEventListener('dragover', DragAndDropProvider.handleDragOver);
FRAMECONTAINER.addEventListener('dragleave', DragAndDropProvider.handleDragLeave);
FRAMECONTAINER.addEventListener('drop', DragAndDropProvider.handleDrop);
FRAMECONTAINER.addEventListener('dragend', DragAndDropProvider.handleDragEnd);

window.onload = () => { AuthorizationProvider.init(); };
LOGIN.onclick = () => { AuthorizationProvider.logInF(); };
LOGOUT.onclick = () => { AuthorizationProvider.logOutF(); };
