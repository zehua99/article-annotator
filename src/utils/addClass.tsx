function addClass(className: string, styles: string) {
  const head = document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = `.${className} {${styles}}`;
  head.appendChild(style);
}

export default addClass;
