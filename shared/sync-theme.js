
const fs = require("fs");
const path = require("path");

const raiz = __dirname + "/..";
const fuente = path.join(raiz, "shared", "theme-base.css");

const remotos = ["characters", "character-detail"];

const css = fs.readFileSync(fuente, "utf8");

for (const r of remotos) {
  const destino = path.join(raiz, "apps", r, "public", "theme-base.css");
  fs.writeFileSync(destino, css);
  console.log(`theme-base.css -> apps/${r}/public/`);
}
