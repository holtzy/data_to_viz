import * as cheerio from 'cheerio'; import fs from 'fs';
const $=cheerio.load(fs.readFileSync('legacy/index.html','utf8'));
$('svg').each((i,e)=>{const p=$(e).parent(); $(e).replaceWith(`<SVG id=${$(e).attr('id')||p.attr('id')} bytes=${$.html(e).length} links=${$(e).find('a').length}/>`)});
$('script,style').remove();
for (const id of process.argv.slice(2)) {
  const s=$(id); let h=s.toString().replace(/\n\s*\n/g,'\n').replace(/[ \t]+/g,' ');
  console.log('=====',id,h.length); console.log(h.slice(0,+process.env.N||4000));
}
