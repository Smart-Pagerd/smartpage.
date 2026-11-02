import { defineConfig } from 'vite';

// base './' hace que el sitio funcione en GitHub Pages sin importar
// el nombre del repositorio (usuario.github.io/nombre-del-repo/).
export default defineConfig({
  base: './',
});
