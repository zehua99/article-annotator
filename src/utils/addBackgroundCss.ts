import getResource from './getResource';

function addBackgroundCss() {
  const head = document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = `
    html, body, #root, .sentence-card-background {
      background-image: url(${getResource('paper.jpg')});
    }
  `;
  head.appendChild(style);
}

export default addBackgroundCss;
