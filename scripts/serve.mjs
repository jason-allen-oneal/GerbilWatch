import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../dist/',import.meta.url));
const config=JSON.parse(await readFile(new URL('../vercel.json',import.meta.url),'utf8'));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png'};
const server=http.createServer(async(req,res)=>{
  if(!['GET','HEAD'].includes(req.method??'')){res.writeHead(405);res.end();return;}
  try{
    const url=new URL(req.url,'http://localhost');
    const pathname=decodeURIComponent(url.pathname);
    const filename=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
    if(!filename.startsWith(root)){res.writeHead(403);res.end();return;}
    const bytes=await readFile(filename);
    res.writeHead(200,{'Content-Type':types[path.extname(filename)]??'application/octet-stream',...Object.fromEntries(config.headers[0].headers.map(h=>[h.key,h.value]))});res.end(req.method==='HEAD'?undefined:bytes);
  }catch{res.writeHead(404);res.end('Not found. The gerbils deny involvement.');}
});
const port=Number(process.env.PORT??4173);
server.on('error',error=>{console.error(error.message);process.exitCode=1;});
server.listen(port,'127.0.0.1',()=>console.log(`Gerbil Threat Index: http://127.0.0.1:${port}`));
