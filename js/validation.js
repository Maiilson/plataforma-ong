// /js/validation.js
import { UI } from './ui.js';

export function setupValidation() {
  const form = document.getElementById('form-cadastro');
  if (!form) return;

  const nome = form.querySelector('#nome');
  const email = form.querySelector('#email');
  const cpf = form.querySelector('#cpf');
  const tel = form.querySelector('#telefone');
  const data = form.querySelector('#data');
  const cep = form.querySelector('#cep');
  const estado = form.querySelector('#estado');

  // Máscaras simples
  cpf.addEventListener('input', () => cpf.value = maskCPF(cpf.value));
  tel.addEventListener('input', () => tel.value = maskPhone(tel.value));
  cep.addEventListener('input', () => cep.value = maskCEP(cep.value));
  estado.addEventListener('input', () => estado.value = estado.value.toUpperCase().slice(0,2));

  // Valida ao sair do campo
  [nome, email, cpf, tel, data, cep, estado].forEach(el => {
    el.addEventListener('blur', () => validateField(el));
  });

  // Salva rascunho no localStorage
  form.addEventListener('input', () => {
    try {
      const draft = Object.fromEntries(new FormData(form).entries());
      localStorage.setItem('cadastro_draft', JSON.stringify(draft));
    } catch {}
  });

  // Restaura rascunho
  try {
    const saved = localStorage.getItem('cadastro_draft');
    if (saved) {
      const obj = JSON.parse(saved);
      for (const k in obj) {
        const el = form.querySelector(`[name="${k}"]`);
        if (el) el.value = obj[k];
      }
    }
  } catch {}

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const invalids = [nome, email, cpf, tel, data, cep, estado].filter(el => !validateField(el));
    if (invalids.length) {
      UI.showFormFeedback('error', 'Por favor, corrija os campos destacados.');
      invalids[0].focus();
      return;
    }
    UI.showFormFeedback('success', 'Cadastro enviado com sucesso! (simulação)');
    UI.toast('Dados validados. Obrigado por se cadastrar!');
    try { localStorage.removeItem('cadastro_draft'); } catch {}
    form.reset();
  });
}

function validateField(el) {
  const val = el.value.trim();
  let ok = true, msg = '';

  switch (el.id) {
    case 'nome':
      ok = val.split(' ').filter(Boolean).length >= 2;
      msg = ok ? '' : 'Digite nome e sobrenome.';
      break;
    case 'email':
      ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val);
      msg = ok ? '' : 'E-mail inválido.';
      break;
    case 'cpf':
      ok = isValidCPF(val);
      msg = ok ? '' : 'CPF inválido. Use o formato 000.000.000-00.';
      break;
    case 'telefone':
      ok = /^\(\d{2}\)\s?\d{5}-\d{4}$/.test(val);
      msg = ok ? '' : 'Telefone inválido. Ex: (11) 91234-5678.';
      break;
    case 'data':
      ok = isValidBirth(val);
      msg = ok ? '' : 'Data inválida (idade mínima 16 e não pode ser futura).';
      break;
    case 'cep':
      ok = /^\d{5}-\d{3}$/.test(val);
      msg = ok ? '' : 'CEP inválido. Ex: 00000-000.';
      break;
    case 'estado':
      ok = /^[A-Z]{2}$/.test(val);
      msg = ok ? '' : 'UF inválida. Ex: SP, RJ, MG...';
      break;
  }

  paintField(el, ok, msg);
  return ok;
}

function paintField(el, ok, msg) {
  el.style.borderColor = ok ? '#26a69a' : '#b00020';
  el.setAttribute('aria-invalid', String(!ok));
  let hint = el.nextElementSibling;
  if (!hint || !hint.classList?.contains('field-error')) {
    hint = document.createElement('small');
    hint.classList.add('field-error');
    hint.style.color = '#b00020';
    hint.style.display = 'block';
    hint.style.marginTop = '4px';
    el.insertAdjacentElement('afterend', hint);
  }
  hint.textContent = msg;
}

function maskCPF(v) {
  return v
    .replace(/\D/g, '')
    .slice(0,11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function maskPhone(v) {
  return v
    .replace(/\D/g, '')
    .slice(0,11)
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{4})$/, '$1-$2');
}

function maskCEP(v) {
  return v
    .replace(/\D/g, '')
    .slice(0,8)
    .replace(/(\d{5})(\d{3})$/, '$1-$2');
}

function isValidBirth(iso) {
  if (!iso) return false;
  const d = new Date(iso);
  const now = new Date();
  if (isNaN(d.getTime())) return false;
  if (d > now) return false;
  const age = now.getFullYear() - d.getFullYear() - ((now.getMonth() < d.getMonth() || (now.getMonth() === d.getMonth() && now.getDate() < d.getDate())) ? 1 : 0);
  return age >= 16;
}

// Validação real de CPF (dígitos verificadores)
function isValidCPF(cpf) {
  const c = cpf.replace(/\D/g,'');
  if (c.length !== 11 || /^(\d)\1+$/.test(c)) return false;
  let soma = 0, resto;

  for (let i = 1; i <= 9; i++) soma += parseInt(c.substring(i-1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(c.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(c.substring(i-1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(c.substring(10, 11));
}
