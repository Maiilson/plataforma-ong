// /js/router.js
import { Templates } from './templates.js';
import { UI } from './ui.js';
import { setupValidation } from './validation.js';

export const Router = (() => {
  const routes = {
    '#/home': Templates.home,
    '#/projetos': Templates.projetos,
    '#/cadastro': Templates.cadastro
  };

  const mount = (html) => {
    const outlet = document.querySelector('main') || document.body;
    outlet.innerHTML = html;

    // Liga ações de UI depois de montar
    bindActions();
    // Ativa validação se for a rota de cadastro
    if (location.hash === '#/cadastro') setupValidation();
  };

  const render = () => {
    const route = routes[location.hash] ? location.hash : '#/home';
    const view = routes[route]();
    mount(view);
    UI.persistRoute(route);
  };

  const bindActions = () => {
    // Botões com data-action
    document.querySelectorAll('[data-action="quero-ajudar"]').forEach(btn => {
      btn.addEventListener('click', () => UI.toast('Obrigado por se voluntariar! Preencha seu cadastro.'));
    });
    const donate = document.querySelector('[data-action="doar"]');
    if (donate) donate.addEventListener('click', () => UI.modal('Doação', 'Em breve: integração com gateway de pagamento simulado.'));
  };

  const start = () => {
    // Navegação pelos links do header se tiverem href="#/rota"
    document.body.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#/"]');
      if (a) {
        e.preventDefault();
        location.hash = a.getAttribute('href');
      }
    });

    window.addEventListener('hashchange', render);
    if (!location.hash) {
      const last = UI.restoreRoute();
      location.hash = last || '#/home';
    } else {
      render();
    }
  };

  return { start, render };
})();
