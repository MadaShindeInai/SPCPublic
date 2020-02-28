export default class FullScreenProvider {
  static toggleFullScreen() {
    const previewFrame = document.querySelector('.animation-preview__preview-frame');
    if (!previewFrame.fullscreenElement) {
      previewFrame.requestFullscreen();
    } else if (previewFrame.exitFullscreen) {
      previewFrame.exitFullscreen();
    }
  }
}
