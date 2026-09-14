import { cp, mkdir, readFile, writeFile, readdir, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
const out=path.join(root,'dist');
await rm(out,{recursive:true,force:true}); await mkdir(out,{recursive:true});
await cp(path.join(root,'public'),out,{recursive:true});
const css=await readFile(path.join(out,'styles.css'),'utf8');
let js=await readFile(path.join(out,'app.js'),'utf8');
let html=await readFile(path.join(out,'index.html'),'utf8');
const images={};
for(const file of await readdir(path.join(out,'portraits'))){images[`./portraits/${file}`]=`data:image/png;base64,${(await readFile(path.join(out,'portraits',file))).toString('base64')}`;}
images['./icon.svg']=`data:image/svg+xml;base64,${(await readFile(path.join(out,'icon.svg'))).toString('base64')}`;
for(const [name,data] of Object.entries(images)) html=html.replaceAll(name,data);
// Substitute the offline asset map before hashing; no network image requests.
const imageMap=Object.fromEntries(Object.entries(images).filter(([name])=>name.startsWith('./portraits/')).map(([name,data])=>[path.basename(name,'.png'),data]));
if(!js.includes('const inlineImages = {};')) throw new Error('Offline image map injection point missing.');
js=js.replace('const inlineImages = {};',()=>`const inlineImages = ${JSON.stringify(imageMap)};`);
const hash=s=>createHash('sha256').update(s).digest('base64');
const csp=`default-src 'none'; script-src 'sha256-${hash(js)}'; style-src 'sha256-${hash(css)}'; img-src data:; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'`;
html=html.replace('<link rel="stylesheet" href="./styles.css">',()=>`<style>${css}</style>`).replace('<script src="./app.js" defer></script>','');
html=html.replace('</body>',()=>`<script>${js}</script></body>`).replace('<meta charset="utf-8">',()=>`<meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="${csp}">`);
await writeFile(path.join(root,'Gerbil-Threat-Index-preview.html'),html);
console.log('Built dist/ and Gerbil-Threat-Index-preview.html');
