// /img stays at the repository root because other sites hotlink
// github.com/holtzy/data_to_viz/raw/master/img/... — copy it into public/ for the site.
// Working files that live next to the images (slides, scripts, notes) are not published.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const NOT_PUBLISHED = /(\.(pptx?|key|psd|ai|sh|txt|md)$|\/\.DS_Store$|\/~\$)/i;

fs.rmSync(path.join(root, "public/img"), { recursive: true, force: true });
fs.cpSync(path.join(root, "img"), path.join(root, "public/img"), {
  recursive: true,
  filter: (src) => !NOT_PUBLISHED.test(src),
});
