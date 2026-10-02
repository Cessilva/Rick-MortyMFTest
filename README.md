# Rick & Morty — Microfrontends

App de microfrontends con Webpack 5 Module Federation que consume la
[Rick and Morty API](https://rickandmortyapi.com/). Un host (shell) orquesta dos remotes:
el listado de personajes y el detalle de cada uno.

Lo estoy construyendo de forma incremental, así que el shell ya está en pie y los remotes
se irán integrando encima.

## Arquitectura

Son tres apps independientes dentro de `apps/`:

- **shell** (puerto 3000) — host. Monta el router, el header, el footer y el layout común.
- **characters** (puerto 3001) — remote. Listado de personajes con filtros.
- **character-detail** (puerto 3002) — remote. Detalle de un personaje y sus episodios.

El shell consume a los remotes vía Module Federation: en runtime descarga el
`remoteEntry.js` de cada uno y monta sus componentes. `react`, `react-dom` y
`react-router-dom` van como `shared` singleton para no acabar con varias copias de React
en el navegador.

```
http://localhost:3000 (shell)
  /characters            → characters (:3001)
  /character-detail/:id  → character-detail (:3002)
```

## Stack

- React 18 + TypeScript
- Webpack 5 + Module Federation
- React Router (en el shell)
- Tailwind CSS
- Docker + Nginx para el despliegue

## Estructura

```
apps/
  shell/              host (3000)
  characters/         remote (3001)
  character-detail/   remote (3002)
docker-compose.yml
```

## Correr en local

Cada microfrontend se instala y levanta por separado. Para el shell:

```bash
cd apps/shell
npm install
npm start
```

Y abrir [http://localhost:3000](http://localhost:3000). Los remotes se levantan igual desde
su propia carpeta.

Scripts disponibles en cada MF:

- `npm start` — dev server con hot reload
- `npm run build` — build de producción
- `npm test` — pruebas

## Docker

La idea es que cada MF tenga su `Dockerfile` (build con Node y luego servir los estáticos
con Nginx) y un `docker-compose.yml` para levantar todo junto, dejando el shell en
`http://localhost:3000`:

```bash
docker-compose up --build
```

## API

[Rick and Morty API](https://rickandmortyapi.com/), endpoint
`https://rickandmortyapi.com/api/character`. Tiene paginación y búsqueda por query string,
y la relación entre personajes y episodios se usa en la vista de detalle.
