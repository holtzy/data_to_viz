import * as cheerio from 'cheerio'; import fs from 'fs';
const $=cheerio.load(fs.readFileSync(process.argv[2],'utf8'));
const mc=$('.mycontent');
mc.find('div.sourceCode').replaceWith('<CODE/>');
mc.find('img').each((i,e)=>{const s=$(e).attr('src')||''; if(s.startsWith('data:')) $(e).attr('src','DATAURI')});
mc.find('script').each((i,e)=>{$(e).text(($(e).text()||'').slice(0,80))});
let h=mc.html().replace(/\n\s*\n/g,'\n');
console.log(h.slice(0, +process.argv[3]||8000));
console.log('---- after mycontent:'); console.log($('.mycontent').nextAll().toString().slice(0,1500));
