namespace BureauUI {
  const inlineImages: Record<string, string> = {};
  const portrait = (name: string): string => inlineImages[name] ?? `./portraits/${name}.png`;
  let state = GerbilIndex.initialState();
  let tab = 'register';
  let returnFocus: HTMLElement | null = null;
  let toastTimer: number | undefined;
  const escape = (value: string): string => value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c] ?? c));
  function el<T extends HTMLElement>(id: string): T {
    const node = document.getElementById(id);
    if (!node) throw new Error(`Missing interface element: ${id}`);
    return node as T;
  }
  function badge(g: GerbilIndex.Gerbil): string {
    const l = GerbilIndex.level(GerbilIndex.score(g));
    return `<span class="badge ${l.toLowerCase()}">${l}</span>`;
  }
  function render(): void {
    const rows = GerbilIndex.list(state.gerbils,el<HTMLInputElement>('search').value,el<HTMLSelectElement>('level').value,el<HTMLSelectElement>('sort').value,el<HTMLSelectElement>('kind').value);
    const ranked = GerbilIndex.list(state.gerbils);
    el('watch-rows').innerHTML = rows.map(g => {
      const n = GerbilIndex.score(g), l = GerbilIndex.level(n).toLowerCase();
      return `<tr><td class="rank ${l==='critical'?'hot':''}">${String(ranked.findIndex(r=>r.id===g.id)+1).padStart(2,'0')}</td><td><button class="subject-button" data-dossier="${g.id}" aria-label="Open dossier for ${escape(g.name)}"><span class="type-token" aria-hidden="true">${g.kind === 'Species' ? 'SP' : 'CV'}</span><span><strong>${escape(g.name)}</strong><span class="classification">${escape(g.kind)}</span><small>${escape(g.concern)}</small></span></button></td><td class="score-cell"><div class="score-line">${badge(g)}<span class="score-value">${n}<small>/100</small></span></div><progress class="score-meter ${l}" value="${n}" max="100" aria-label="${escape(g.name)} fictional threat score">${n}</progress></td></tr>`;
    }).join('');
    el('empty').hidden = rows.length !== 0;
    el('shown').textContent = `${rows.length} of ${state.gerbils.length} types on record`;
    el('summary').textContent = `${state.gerbils.length} types. ${state.gerbils.filter(g=>GerbilIndex.score(g)>=85).length} critical. 0 scientific merit.`;
    el('register-count').textContent = String(state.gerbils.length).padStart(2,'0');
    el('incident-count').textContent = String(state.incidents.length).padStart(2,'0');
    const featured = state.gerbils.find(g=>g.id==='T-001');
    if (featured) el('spotlight-score').textContent = String(GerbilIndex.score(featured));
    el('incidents-list').innerHTML = state.incidents.map(i=>{
      const subject=state.gerbils.find(g=>g.id===i.subjectId);
      return `<article class="incident"><span class="micro">${i.id}</span><div><button class="text-link" data-dossier="${i.subjectId}">${escape(subject?.name??'Unknown subject')}</button><p>${escape(i.text)}</p></div><span class="delta ${i.delta>0?'critical':'low'}">${i.delta>0?'+':''}${i.delta}<span class="sr-only"> score adjustment</span></span></article>`;
    }).join('');
  }
  function selectTab(next: string, focus = false): void {
    if (!['register','incidents','assess'].includes(next)) return;
    tab=next;
    ['register','incidents','assess'].forEach(name=>{el(`${name}-panel`).hidden=name!==tab;});
    document.querySelectorAll<HTMLElement>('.nav [data-tab]').forEach(button=>{
      if(button.dataset.tab===tab) button.setAttribute('aria-current','page'); else button.removeAttribute('aria-current');
    });
    if(focus) { const heading = document.querySelector<HTMLElement>(`#${next}-panel h2`); heading?.setAttribute('tabindex','-1'); heading?.focus({preventScroll:true}); heading?.scrollIntoView({block:'nearest'}); }
  }
  function openDialog(title: string, label: string, body: string): void {
    const dialog=el<HTMLDialogElement>('dialog');
    if(!dialog.open) returnFocus=document.activeElement instanceof HTMLElement?document.activeElement:null;
    el('dialog-label').textContent=label;
    el('dialog-body').innerHTML=body;
    const heading=el('dialog-title'); heading.textContent=title; heading.tabIndex=-1;
    if(!dialog.open) dialog.showModal();
    dialog.scrollTop=0; heading.focus({preventScroll:true});
  }
  function closeDialog(): void { el<HTMLDialogElement>('dialog').close(); }
  function toast(message: string): void {
    if(toastTimer!==undefined) window.clearTimeout(toastTimer);
    const node=el('toast'); node.textContent=message; node.hidden=false;
    (el<HTMLDialogElement>('dialog').open?el('dialog'):document.body).append(node);
    toastTimer=window.setTimeout(()=>{node.hidden=true;},4500);
  }
  function showDossier(id: string): void {
    const g=state.gerbils.find(subject=>subject.id===id); if(!g) return;
    const n=GerbilIndex.score(g);
    openDialog(g.name,`BSAA / TYPE FILE ${g.id} / DECLASSIFIED`,
      `<div class="dossier-grid"><aside class="dossier-side"><img class="mugshot" src="${portrait('bureau-gerbil')}" alt="Decorative bureau mascot, not an identification guide"><div class="photo-note">BUREAU MASCOT / NOT AN ID GUIDE</div><div class="big-score">${n}<small> / 100</small></div><div>${badge(g)}</div>${GerbilIndex.metrics.map((m,i)=>`<div class="metric"><label for="metric-${i}"><span>${m}</span><span>${g.factors[i]}</span></label><progress id="metric-${i}" value="${g.factors[i]}" max="100">${g.factors[i]}</progress></div>`).join('')}<p class="adjustment">INCIDENT ADJUSTMENT: ${g.adjustment>0?'+':''}${g.adjustment}</p><div class="stamp">UNREASONABLY<br>SUSPICIOUS</div></aside><div class="dossier-copy"><div class="dossier-kicker"><span>TYPE RECORD</span><span>3 ITEMS OF "EVIDENCE"</span></div><h2 id="dialog-title"></h2><div class="alias">${escape(g.alias)}</div><div class="identity-note"><strong>Actual identification</strong><p>${escape(g.identity)}</p><a href="${escape(g.source)}" target="_blank" rel="noopener noreferrer">${escape(g.sourceLabel)}: identity source ↗</a></div><h3>FICTIONAL THREAT ASSESSMENT</h3><p>${escape(g.description)}</p><h3>OBSERVATIONS ON FILE</h3><ol class="evidence">${g.evidence.map(e=>`<li>${escape(e)}</li>`).join('')}</ol><h3>BUREAU'S IMAGINED DEFENSE</h3><blockquote>"${escape(g.alibi)}"</blockquote><h3>RESTRICTED INTELLIGENCE</h3><button class="redaction" data-reveal="${g.id}" aria-label="Reveal redacted intelligence" aria-expanded="false">██████████████████████</button><p class="redaction-note">Click the redaction. We have terrible information security.</p><div class="dossier-actions"><button class="primary" data-report="${g.id}">Report behavior +</button><button class="outline" data-export="${g.id}">Export dossier ↓</button></div><button class="text-link" data-appeal="${g.id}">Appeal this assessment</button></div></div>`);
  }
  function showReport(id = ''): void {
    openDialog('File an incident','BSAA / FORM 06 / PETTY OFFENSES',`<div class="text-dialog"><h2 id="dialog-title"></h2><p>Submit a fictional allegation against a listed type. No individual animals are registered. This report stays in your tab.</p><form id="incident-form"><label class="field-label" for="incident-subject">Gerbil type</label><select class="field" id="incident-subject" name="subject" required>${state.gerbils.map(g=>`<option value="${g.id}" ${g.id===id?'selected':''}>${escape(g.name)}</option>`).join('')}</select><label class="field-label" for="incident-behavior">Observed behavior</label><select class="field" id="incident-behavior" name="behavior" required>${GerbilIndex.behaviors.map(b=>`<option value="${b.id}">${b.label} (${b.delta>0?'+':''}${b.delta})</option>`).join('')}</select><label class="field-label" for="incident-note">Further allegations <span class="muted">(optional, 240 characters)</span></label><textarea class="field" id="incident-note" name="note" maxlength="240" placeholder="The accused showed no remorse. Or understanding of the concept."></textarea><p id="incident-error" class="error" role="alert"></p><div class="form-actions"><button type="button" class="outline" data-action="close">Reconsider</button><button type="submit" class="primary">Submit unnecessary paperwork</button></div></form></div>`);
  }
  function exportDossier(id: string): void {
    const data=GerbilIndex.dossier(state,id);
    const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json;charset=utf-8'}));
    const link=document.createElement('a'); link.href=url;link.download=`BSAA-${id}-dossier.json`;document.body.append(link);link.click();link.remove();window.setTimeout(()=>URL.revokeObjectURL(url),2000);
    toast('Dossier exported. Please do not send it to an actual government agency.');
  }
  function showInfo(kind: string): void {
    if(kind==='method') openDialog('Our dubious methodology','BSAA / METHODOLOGY / UNREVIEWED',`<div class="text-dialog"><h2 id="dialog-title"></h2><p>Threat score = the rounded average of four fictional traits, plus incident adjustments. Scores are clamped to 0-100.</p><p><strong>Low:</strong> 0-24. <strong>Elevated:</strong> 25-59. <strong>High:</strong> 60-84. <strong>Critical:</strong> 85-100.</p><p>Reports add or subtract the points shown on the form. Existing case notes are already reflected in the initial scores. Filtering never changes a score. Ranks always refer to the complete register.</p><p>None of this measures actual risk. The names describe real species and coat varieties. Only the scores and allegations are fictional. Species entries and their color varieties overlap; they are not independent populations. Being small, digging, or eating things does not constitute a criminal conspiracy.</p><p>Our confidence exceeds our qualifications by a comfortable margin.</p></div>`);
    else if(kind==='privacy') openDialog('About the bureau','BSAA / ACTUAL PRIVACY INFORMATION',`<div class="text-dialog"><h2 id="dialog-title"></h2><p>The Bureau of Small Animal Affairs is fictional. The type names are real; the accusations, rankings, and expertise are not. "Breeds" here is informal: species and Mongolian gerbil coat varieties are labeled separately. No real agency is involved.</p><p>This site runs entirely in your browser. It adds no accounts, analytics, cookies, or persistent storage, and sends no incident reports anywhere. Reloading or resetting clears your changes. Exported dossiers are generated locally when you request them.</p><p>A hosting provider may still process ordinary connection logs when serving the website. The offline preview needs no connection.</p><p>The repeated bureau mascot is decorative, not a species or color identification image. Each type file links to its real identity source. Please be kind to actual gerbils.</p></div>`);
    else if(kind==='reset') openDialog('Purge the paperwork?','BSAA / RESET SIMULATION',`<div class="text-dialog"><h2 id="dialog-title"></h2><p>This removes your fictional incident reports and reassessments and restores all ten original type ratings. Export anything you need before resetting.</p><div class="form-actions"><button class="outline" data-action="close">Keep the paperwork</button><button class="primary" data-action="confirm-reset">Reset simulation</button></div></div>`);
  }
  function assessment(): void {
    const factors=GerbilIndex.metrics.map((_,i)=>Number(el<HTMLInputElement>(`factor-${i}`).value));
    factors.forEach((v,i)=>{el(`factor-value-${i}`).textContent=String(v);});
    const n=GerbilIndex.score({factors,adjustment:0}),l=GerbilIndex.level(n);
    el('assessment-score').textContent=String(n);
    el('assessment-level').textContent=l; el('assessment-level').className=`badge ${l.toLowerCase()}`;
    el('assessment-copy').textContent = n>=85?'The committee has cancelled its lunch break.':n>=60?'A dedicated clipboard has been assigned.':n>=25?'The bureau is preparing a strongly worded memo.':'The lack of suspicious behavior is deeply suspicious.';
  }
  export function initialize(): void {
    el('slider-fields').innerHTML=GerbilIndex.metrics.map((m,i)=>`<div class="slider-field"><label for="factor-${i}"><span>${m}</span><output id="factor-value-${i}">50</output></label><input id="factor-${i}" type="range" min="0" max="100" value="50" step="1"><div class="range-labels"><span>BARELY A THOUGHT</span><span>CONSIDERABLE INTENT</span></div></div>`).join('');
    el('assessed-type').innerHTML=state.gerbils.map(g=>`<option value="${g.id}">${escape(g.name)} (${escape(g.kind)})</option>`).join('');
    assessment(); render();
    el('search').addEventListener('input',render);el('level').addEventListener('change',render);el('kind').addEventListener('change',render);el('sort').addEventListener('change',render);
    el('slider-fields').addEventListener('input',assessment);
    document.addEventListener('click',event=>{
      if(!(event.target instanceof Element)) return;
      const button=event.target.closest<HTMLButtonElement>('button');if(!button||button.disabled) return;
      const data=button.dataset;
      if(data.tab) selectTab(data.tab,true);
      else if(data.dossier) showDossier(data.dossier);
      else if(data.report) showReport(data.report);
      else if(data.export) exportDossier(data.export);
      else if(data.reveal){const g=state.gerbils.find(g=>g.id===data.reveal);if(g){button.textContent=g.secret;button.classList.add('revealed');button.setAttribute('aria-expanded','true');button.setAttribute('aria-label','Revealed intelligence');}}
      else if(data.appeal) toast('Appeal denied. The panel consists of three other gerbils.');
      else switch(data.action){
        case 'report':showReport();break;
        case 'close':closeDialog();break;
        case 'method':case 'privacy':case 'reset':showInfo(data.action);break;
        case 'clear':el<HTMLInputElement>('search').value='';el<HTMLSelectElement>('level').value='All';el<HTMLSelectElement>('kind').value='All';render();el('search').focus();break;
        case 'confirm-reset':state=GerbilIndex.initialState();el<HTMLInputElement>('search').value='';el<HTMLSelectElement>('level').value='All';el<HTMLSelectElement>('kind').value='All';el<HTMLSelectElement>('sort').value='highest';el<HTMLFormElement>('assessment-form').reset();assessment();render();selectTab('register');closeDialog();toast('Original type ratings restored. The bureau has learned nothing.');break;
      }
    });
    document.addEventListener('submit',event=>{
      if(!(event.target instanceof HTMLFormElement)) return;
      const form=event.target;
      if(form.id==='incident-form'){
        event.preventDefault();
        try {state=GerbilIndex.recordIncident(state,el<HTMLSelectElement>('incident-subject').value,el<HTMLSelectElement>('incident-behavior').value,el<HTMLTextAreaElement>('incident-note').value);render();selectTab('incidents');closeDialog();toast('Incident filed. An unnecessary amount of concern has been generated.');}
        catch(error){el('incident-error').textContent=error instanceof Error?error.message:'Unable to file incident.';}
      }
      if(form.id==='assessment-form'){
        event.preventDefault();
        try {state=GerbilIndex.reassess(state,el<HTMLSelectElement>('assessed-type').value,GerbilIndex.metrics.map((_,i)=>Number(el<HTMLInputElement>(`factor-${i}`).value)));el('assessment-error').textContent='';el<HTMLInputElement>('search').value='';el<HTMLSelectElement>('level').value='All';el<HTMLSelectElement>('kind').value='All';render();selectTab('register');showDossier(el<HTMLSelectElement>('assessed-type').value);}
        catch(error){el('assessment-error').textContent=error instanceof Error?error.message:'Unable to reassess type.';}
      }
    });
    const dialog=el<HTMLDialogElement>('dialog');
    dialog.addEventListener('close',()=>{ const node=el('toast');node.hidden=true;document.body.append(node);if(returnFocus?.isConnected&&!returnFocus.closest('[hidden]')) returnFocus.focus({preventScroll:true});else el('main').focus({preventScroll:true}); });
    dialog.addEventListener('click',event=>{const r=dialog.getBoundingClientRect();if(event.target===dialog&&(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom))closeDialog();});
  }
}
if(typeof document!=='undefined') {
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',BureauUI.initialize,{once:true});else BureauUI.initialize();
}
