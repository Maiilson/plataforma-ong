// /js/app.js
import { Router } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
  // SPA liga no index.html
  Router.start();

  // Acessibilidade básica: pular para conteúdo
  addSkipLink();
});

function addSkipLink() {
  const link = document.createElement('a');
  link.href = '#main';
  link.textContent = 'Pular para o conteúdo';
  link.style.cssText = `
    position:absolute; left:-9999px; top:0; background:#000; color:#fff; padding:8px; z-index:10000;
  `;
  link.addEventListener('focus', () => link.style.left = '0');
  link.addEventListener('blur',  () => link.style.left = '-9999px');
  document.body.prepend(link);

  let main = document.querySelector('main');
  if (!main) {
    main = document.createElement('main');
    document.body.appendChild(main);
  }
  main.id = 'main';
}
