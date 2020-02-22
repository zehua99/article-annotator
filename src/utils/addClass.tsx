function addClass(className: string, styles: string) {
  if (styles.length === 0) return;
  const head = document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = `.${className} {${styles}}`;
  head.appendChild(style);
}

export default addClass;
