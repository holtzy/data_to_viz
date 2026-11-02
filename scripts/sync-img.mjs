// /img stays at the repository root because other sites hotlink
// github.com/holtzy/data_to_viz/raw/master/img/... — copy it into public/ for the site.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
fs.rmSync(path.join(root, "public/img"), { recursive: true, force: true });
fs.cpSync(path.join(root, "img"), path.join(root, "public/img"), {
  recursive: true,
  filter: (src) => !src.endsWith(".DS_Store"),
});
