# Rick & Morty — Microfrontends

App de microfrontends con Webpack 5 Module Federation que consume la
[Rick and Morty API](https://rickandmortyapi.com/). Un host (shell) orquesta dos remotes:
el listado de personajes con filtros y el detalle de cada uno con sus episodios.

Los tres microfrontends ya están integrados: desde el listado se navega al detalle y de
vuelta, todo bajo el mismo layout del shell.

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

Para verlo funcionando completo hay que levantar los tres (shell + los dos remotes), cada
uno en su carpeta y su puerto. El shell carga los remotes desde `:3001` y `:3002`, así que
si alguno no está arriba, esa parte no se monta.

Scripts disponibles en cada MF:

- `npm start` — dev server con hot reload
- `npm run build` — build de producción
- `npm test` — pruebas (Jest + React Testing Library)

## Pruebas

Las pruebas están en `characters`, hechas con Jest y React Testing Library:

```bash
cd apps/characters
npm test
```

Cubren el render de las tarjetas de personaje (datos, enlace al detalle, imagen) y el
comportamiento de los filtros (buscar por nombre, elegir estado/especie, limpiar filtros).
Para ver el reporte de cobertura:

```bash
npm test -- --coverage
```

![Reporte de cobertura de los componentes de characters](./assets/coverage.png)

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
