// /js/ui.js
export const UI = {
    toast(msg = 'Ação realizada.') {
      const el = document.createElement('div');
      el.setAttribute('role', 'status');
      el.style.cssText = `
        position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
        background: rgba(0,0,0,.8); color: #fff; padding: 12px 16px; border-radius: 8px;
        z-index: 9999; font-size: 14px; max-width: 90%; text-align:center;
      `;
      el.textContent = msg;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2600);
    },
  
    modal(title = 'Info', content = '') {
      const backdrop = document.createElement('div');
      backdrop.style.cssText = `
        position:fixed; inset:0; background:rgba(0,0,0,.5); display:flex; align-items:center; justify-content:center; z-index:9998;
      `;
      const box = document.createElement('div');
      box.style.cssText = `
        background:#fff; padding:24px; border-radius:12px; max-width:520px; width:90%; box-shadow:0 10px 30px rgba(0,0,0,.2);
      `;
      box.innerHTML = `
        <h3 style="margin:0 0 12px 0;">${title}</h3>
        <p style="margin:0 0 16px 0;">${content}</p>
        <button id="modal-close">Fechar</button>
      `;
      backdrop.appendChild(box);
      document.body.appendChild(backdrop);
      box.querySelector('#modal-close').addEventListener('click', () => backdrop.remove());
      backdrop.addEventListener('click', (e) => { if (e.target === backdrop) backdrop.remove(); });
    },
  
    persistRoute(route) { try { localStorage.setItem('last_route', route); } catch {} },
    restoreRoute() { try { return localStorage.getItem('last_route'); } catch { return null; } },
  
    showFormFeedback(type, message) {
      const area = document.getElementById('form-feedback');
      if (!area) return;
      area.textContent = message;
      area.style.color = type === 'error' ? '#b00020' : '#00796b';
    }
  };
  