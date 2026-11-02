# Smartpage

Sitio web de Smartpage hecho con JavaScript y Vite, listo para publicarse en **GitHub Pages**.

## Probar en tu computadora

```bash
npm install
cp .env.example .env     # luego completa tus datos de Supabase (opcional)
npm run dev
```

Para generar la versión final: `npm run build` (crea la carpeta `dist`).

## Cambiar el logo

Los logos incluidos son de muestra. Reemplaza estos archivos por el logo real, con el mismo nombre:

- `public/logo.svg`: versión para fondo blanco (cabecera).
- `public/logo-light.svg`: versión clara para fondo azul marino (pie de página).
- `public/favicon.svg`: icono de la pestaña del navegador.

Si tu logo es PNG, súbelo a `public/` y cambia la extensión en `index.html` (busca `logo.svg` y `logo-light.svg`).

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube este proyecto a la rama `main`.
2. En el repositorio ve a **Settings > Pages** y, en **Source**, elige **GitHub Actions**.
3. Cada vez que hagas push a `main`, el archivo `.github/workflows/deploy.yml` ejecuta `npm run build` y publica la carpeta `dist`.
4. Tu sitio quedará en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

El proyecto usa `base: './'` en `vite.config.js`, así que funciona con cualquier nombre de repositorio.

## Conectar la galería con Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. En **SQL Editor**, pega y ejecuta el contenido de `supabase.sql`. Crea la tabla `projects` y permite que el público lea solo los proyectos con `published = true`.
3. En **Project Settings > API** copia la **Project URL** y la clave **anon public**.
4. Para pruebas locales, ponlas en tu archivo `.env`:
   ```
   VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-clave-anon-publica
   ```
5. Para GitHub Pages, ve a **Settings > Secrets and variables > Actions > New repository secret** y crea dos secretos con esos mismos nombres y valores: `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
6. Vuelve a ejecutar el workflow (push a `main` o **Actions > Run workflow**).

> Usa solo la clave **anon public**. Nunca pongas la clave `service_role` en este proyecto.

### Agregar un proyecto a la galería

En **Table Editor > projects > Insert row** completa:

| Campo | Qué poner |
|---|---|
| `name` | Nombre del proyecto |
| `url` | Dirección del sitio (con `https://`) |
| `image_url` | Enlace a una imagen de vista previa (opcional) |
| `published` | Activa `true` para que aparezca en la web |

Para las imágenes puedes crear un bucket **público** en **Storage** (por ejemplo `previews`), subir la captura y copiar su URL pública.

Mientras no haya proyectos publicados (o no esté configurado Supabase), la galería muestra espacios de muestra con el mensaje de que pronto habrá nuevas creaciones.
