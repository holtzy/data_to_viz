import * as cheerio from 'cheerio';
import fs from 'fs';
const tags={}, classes={}, nomc=[];
for (const sec of ['graph','story','caveat']) for (const f of fs.readdirSync('legacy/'+sec).filter(f=>f.endsWith('.html'))) {
  const $=cheerio.load(fs.readFileSync(`legacy/${sec}/${f}`,'utf8'));
  const mc=$('.mycontent'); if(!mc.length){nomc.push(sec+'/'+f);continue;}
  mc.find('*').each((i,el)=>{tags[el.tagName]=(tags[el.tagName]||0)+1; for(const c of ($(el).attr('class')||'').split(/\s+/)) if(c) classes[c]=(classes[c]||0)+1;});
}
console.log('no .mycontent:',nomc.join(' '));
console.log(Object.entries(tags).sort((a,b)=>b[1]-a[1]).map(x=>x.join(':')).join(' '));
console.log(Object.entries(classes).sort((a,b)=>b[1]-a[1]).filter(x=>!/^(co|fu|st|at|ot|sc|dv|cn|fl|kw|cf|va|op|sourceCode|r)$/.test(x[0])).map(x=>x.join(':')).join(' '));
