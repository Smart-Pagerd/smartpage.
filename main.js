import './style.css';
import { supabase } from './supabase.js';

/* ---------- Menú móvil ---------- */
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#menu');
const setMenu = (open) => {
  toggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
};
toggle.addEventListener('click', () =>
  setMenu(toggle.getAttribute('aria-expanded') !== 'true')
);
nav.addEventListener('click', (e) => {
  if (e.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setMenu(false);
});

document.querySelector('#year').textContent = new Date().getFullYear();

/* ---------- Galería ---------- */
const gallery = document.querySelector('#gallery');
const note = document.querySelector('#gallery-note');

const isSafeUrl = (value) => {
  try {
    const u = new URL(value);
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch {
    return false;
  }
};

function projectCard(p) {
  const li = document.createElement('li');
  li.className = 'project';

  const media = document.createElement('div');
  media.className = 'project-media';
  if (p.image_url && isSafeUrl(p.image_url)) {
    const img = document.createElement('img');
    img.src = p.image_url;
    img.alt = `Vista previa de ${p.name}`;
    img.loading = 'lazy';
    media.append(img);
  } else {
    media.classList.add('empty');
  }

  const body = document.createElement('div');
  body.className = 'project-body';
  const h3 = document.createElement('h3');
  h3.textContent = p.name;
  body.append(h3);

  if (isSafeUrl(p.url)) {
    const a = document.createElement('a');
    a.className = 'btn btn-small';
    a.href = p.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = 'Visitar proyecto';
    a.setAttribute('aria-label', `Visitar proyecto ${p.name}`);
    body.append(a);
  }

  li.append(media, body);
  return li;
}

function showPlaceholders() {
  gallery.replaceChildren();
  for (let i = 0; i < 3; i++) {
    const li = document.createElement('li');
    li.className = 'project placeholder';
    li.innerHTML =
      '<div class="project-media empty" aria-hidden="true"></div>' +
      '<div class="project-body"><h3>Próximo proyecto</h3>' +
      '<span class="soon">Disponible pronto</span></div>';
    gallery.append(li);
  }
  note.textContent =
    'Estamos preparando nuestras primeras creaciones. Muy pronto las verás publicadas aquí.';
  note.hidden = false;
}

async function loadProjects() {
  if (!supabase) return showPlaceholders();
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('id, name, url, image_url')
      .eq('published', true)
      .order('created_at', { ascending: false });
    if (error || !data || data.length === 0) return showPlaceholders();
    gallery.replaceChildren(...data.map(projectCard));
    note.hidden = true;
  } catch {
    showPlaceholders();
  }
}

loadProjects();
