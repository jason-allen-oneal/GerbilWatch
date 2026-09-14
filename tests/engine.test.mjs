import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const sandbox={};
runInNewContext(readFileSync(new URL('../public/app.js',import.meta.url),'utf8'),sandbox);
const E=sandbox.GerbilIndex;
const plain=x=>JSON.parse(JSON.stringify(x));
test('ten type records have unique ids and sourced real identities',()=>{
 const s=E.initialState();assert.equal(s.gerbils.length,10);assert.equal(new Set(s.gerbils.map(g=>g.id)).size,10);
 assert.deepEqual(plain(s.gerbils.map(E.score)),[98,92,86,82,75,67,61,44,27,9]);
 for(const g of s.gerbils){assert.ok(g.identity.length>10);assert.match(g.source,/^https:\/\/(animaldiversity.org|gerbils.co.uk)\//);assert.ok(g.scientificName);}
});
test('species and coat varieties are distinct, filterable classifications',()=>{
 const g=E.initialState().gerbils;assert.equal(E.list(g,'','All','highest','Species').length,3);
 const colors=E.list(g,'','All','highest','Coat variety');assert.equal(colors.length,7);
 assert.ok(colors.every(x=>x.scientificName==='Meriones unguiculatus'));
});
test('no individually named pets or invented breed registration remain',()=>{
 assert.equal(E.register,undefined);
 assert.deepEqual(plain(E.initialState().gerbils.map(g=>g.name)),['Great gerbil','Mongolian gerbil','Fat-tailed gerbil','Black','Siamese','Burmese','Golden Agouti','Nutmeg','Lilac','Dove']);
});
test('threat thresholds are bounded and inclusive',()=>{
 for(const [score,level] of [[0,'Low'],[24,'Low'],[25,'Elevated'],[59,'Elevated'],[60,'High'],[84,'High'],[85,'Critical'],[100,'Critical']])assert.equal(E.level(score),level);
 assert.throws(()=>E.level(NaN));assert.throws(()=>E.level(101));
});
test('search includes taxonomy and combines with classification and threat',()=>{
 const s=E.initialState(),before=JSON.stringify(s);
 assert.equal(E.list(s.gerbils,'meriones').length,8);
 assert.equal(E.list(s.gerbils,' black ','High','highest','Coat variety')[0].name,'Black');
 assert.equal(E.list(s.gerbils,'black','All','highest','Species').length,0);
 assert.equal(JSON.stringify(s),before);
});
test('sorting and rank inputs do not mutate the catalog',()=>{
 const g=E.initialState().gerbils;assert.equal(E.list(g,'','All','lowest')[0].name,'Dove');
 assert.equal(E.list(g)[0].name,'Great gerbil');assert.equal(E.list(g,'','All','name')[0].name,'Black');
 assert.equal(g[0].name,'Great gerbil');
});
test('incidents update only the selected type and use clamped actual delta',()=>{
 const s=E.initialState(),n=E.recordIncident(s,'T-001','paper','No receipts.');
 assert.equal(E.score(s.gerbils[0]),98);assert.equal(E.score(n.gerbils[0]),100);assert.equal(n.incidents[0].delta,2);
 assert.equal(E.score(n.gerbils[1]),92);
 assert.throws(()=>E.recordIncident(s,'missing','paper',''));assert.throws(()=>E.recordIncident(s,'T-001','x',''));assert.throws(()=>E.recordIncident(s,'T-001','paper','x'.repeat(241)));
});
test('reassessment edits an existing type without inventing another record',()=>{
 const s=E.initialState(),n=E.reassess(s,'T-010',[100,100,100,100]);
 assert.equal(n.gerbils.length,10);assert.equal(n.gerbils[9].name,'Dove');assert.equal(E.score(n.gerbils[9]),100);
 assert.equal(E.score(s.gerbils[9]),9);assert.equal(n.incidents[0].delta,91);
 assert.equal(n.gerbils[9].source,s.gerbils[9].source);assert.equal(n.gerbils[9].kind,'Coat variety');
});
test('unknown type ids and invalid score data are rejected',()=>{
 const s=E.initialState();assert.throws(()=>E.reassess(s,'Deputy Nibbles',[1,2,3,4]));
 for(const factors of [[],[1,2,3],[1,2,3,101],[1,2,3,NaN],[-1,0,0,0]])assert.throws(()=>E.reassess(s,'T-001',factors));
});
test('dossier separates the real identity from fictional assessment',()=>{
 const d=E.dossier(E.initialState(),'T-003');assert.equal(d.name,'Fat-tailed gerbil');assert.equal(d.scientificName,'Pachyuromys duprasi');
 assert.equal(d.identityIsReal,true);assert.equal(d.assessmentIsFictional,true);assert.match(d.disclaimer,/fictional threat/);assert.throws(()=>E.dossier(E.initialState(),'no'));
});
test('reset copies isolate edits',()=>{
 const s=E.initialState();s.gerbils[0].name='Changed';s.gerbils[0].factors[0]=0;
 const n=E.initialState();assert.equal(n.gerbils[0].name,'Great gerbil');assert.equal(E.score(n.gerbils[0]),98);
});
test('every uniform input from zero to 100 retains its exact score',()=>{
 for(let n=0;n<=100;n++)assert.equal(E.score({factors:[n,n,n,n],adjustment:0}),n);
});
