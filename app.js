'use strict';
const categories=[
 {key:'family',name:'Família',desc:'Construir um lar, cuidar e estar presente.',color:'#79aa62',title:'O guardião dos laços',description:'A família ocupa um lugar central na vida que imaginas. As tuas escolhas dão especial importância à união, à segurança emocional e à possibilidade de cuidar das pessoas que amas.',question:'Como podes proteger o tempo para a tua família sem deixar de procurar segurança económica?'},
 {key:'money',name:'Dinheiro',desc:'Estabilidade financeira, poupança e segurança.',color:'#b49d57',title:'O estratega financeiro',description:'As tuas escolhas revelam uma forte prioridade pela segurança económica. Ter margem para enfrentar imprevistos e sustentar os teus projetos parece ser uma base importante para o futuro que desejas.',question:'Que nível de estabilidade considerarias suficiente para não adiar indefinidamente os teus outros sonhos?'},
 {key:'career',name:'Carreira',desc:'Realização profissional, aprendizagem e ambição.',color:'#4e957d',title:'O construtor de ambições',description:'O crescimento profissional tem um peso especial nas tuas escolhas. Valorizas a possibilidade de desenvolver competências, concretizar objetivos e construir um percurso de que te possas orgulhar.',question:'Que limites colocarias à tua ambição para preservar aquilo que mais valorizas fora do trabalho?'},
 {key:'health',name:'Saúde',desc:'Bem-estar físico, mental e qualidade de vida.',color:'#8eb77f',title:'O guardião do equilíbrio',description:'As tuas escolhas colocam o bem-estar em primeiro plano. A saúde e a qualidade de vida parecem ser condições essenciais para aproveitares as restantes conquistas do teu futuro.',question:'Como podes cuidar do teu bem-estar quando surgirem pressões financeiras ou profissionais?'},
 {key:'freedom',name:'Liberdade',desc:'Autonomia, novas experiências e poder de escolha.',color:'#89a8aa',title:'O espírito livre',description:'A autonomia e a possibilidade de escolher o teu próprio caminho têm um peso especial para ti. Imaginas um futuro em que tens espaço para descobrir, experimentar e decidir sem depender totalmente dos outros.',question:'Como conciliarias a tua liberdade com as responsabilidades de uma família?'},
 {key:'friends',name:'Amigos',desc:'Amizades, apoio mútuo e sentimento de pertença.',color:'#b18f9f',title:'O construtor de pontes',description:'As relações de amizade e as redes de apoio destacam-se nas tuas escolhas. Valorizas a partilha de experiências e as pessoas que podem acompanhar-te nos bons e nos maus momentos.',question:'De que forma podes manter os teus laços de amizade quando as responsabilidades da vida adulta aumentarem?'},
 {key:'time',name:'Tempo',desc:'Descanso, lazer e momentos para o que importa.',color:'#c39e78',title:'O protetor do tempo',description:'O teu futuro ideal reserva espaço para viver para além das obrigações. As tuas escolhas mostram que o tempo pessoal, o descanso e a possibilidade de estares presente têm um valor especial.',question:'Quanto tempo estarias disposto a trocar por um rendimento mais elevado?'}
];
const $=id=>document.getElementById(id);
let values=categories.map(()=>0), currentProfile=null;
const nodes=categories.map((cat,i)=>{
 const card=document.createElement('article');card.className='priority';card.style.setProperty('--i',i);
 card.innerHTML=`<span class="index" aria-hidden="true">0${i+1}</span><div><h3 id="cat-${i}">${cat.name}</h3><p id="desc-${i}">${cat.desc}</p></div><div class="controls"><button type="button" class="step minus" aria-label="Retirar 5 pontos a ${cat.name}">−</button><input class="range" type="range" id="range-${i}" min="0" max="100" step="5" value="0" aria-labelledby="cat-${i}" aria-describedby="desc-${i}"><button type="button" class="step plus" aria-label="Adicionar 5 pontos a ${cat.name}">+</button><output class="points" for="range-${i}">0</output></div>`;
 $('priorities').append(card);
 const minus=card.querySelector('.minus'),plus=card.querySelector('.plus'),range=card.querySelector('.range'),points=card.querySelector('.points');
 minus.addEventListener('click',()=>change(i,values[i]-5));plus.addEventListener('click',()=>change(i,values[i]+5));range.addEventListener('input',()=>change(i,Number(range.value)));
 const segment=document.createElement('span');segment.style.background=cat.color;segment.style.width='0%';$('stack').append(segment);
 return {card,minus,plus,range,points,segment};
});
const sum=()=>values.reduce((a,b)=>a+b,0);
function change(i,value){const max=100-sum()+values[i];values[i]=Math.max(0,Math.min(max,Math.round(value/5)*5));hideResult();render();}
function render(){const allocated=sum(),left=100-allocated;
 nodes.forEach((n,i)=>{const val=values[i],max=left+val;n.card.classList.toggle('active',val>0);n.points.textContent=val;n.range.value=val;n.range.style.setProperty('--fill',`${val}%`);n.range.setAttribute('aria-valuetext',`${val} pontos; máximo disponível ${max}`);n.minus.disabled=val===0;n.plus.disabled=left<5;n.segment.style.width=`${val}%`;});
 $('remaining').textContent=left;$('progress').setAttribute('aria-valuenow',allocated);$('finish').disabled=left!==0;
 $('hint').textContent=left===0?'Tudo distribuído. O teu perfil está pronto.':left===100?'Começa a distribuir os teus pontos.':`Ainda tens ${left} pontos para distribuir.`;
 $('finish-note').textContent=left===0?'Tudo pronto! Descobre o teu resultado.':`Faltam distribuir ${left} pontos.`;
}
function hideResult(){if(!$('resultado').hidden){$('resultado').hidden=true;currentProfile=null;}}
function getProfile(){const ranked=categories.map((c,i)=>({...c,value:values[i],i})).sort((a,b)=>b.value-a.value||a.i-b.i);const [a,b]=ranked;
 if(a.value-ranked.at(-1).value<=10)return {key:'balanced',title:'O arquiteto do equilíbrio',description:'Distribuíste os pontos de forma muito equilibrada. As tuas escolhas sugerem que valorizas várias dimensões da vida, sem deixar uma delas dominar claramente as restantes.',question:'Se um imprevisto te obrigasse a escolher apenas duas prioridades, quais manterias?',overline:'Perfil equilibrado'};
 const tied=ranked.filter(c=>c.value===a.value);if(tied.length>2)return {key:'mixed',title:'O futuro em várias direções',description:`As tuas maiores prioridades são ${tied.map(c=>c.name.toLowerCase()).join(', ')}. A tua distribuição aponta para vários objetivos igualmente importantes, em vez de um único caminho.`,question:'Se duas dessas prioridades entrassem em conflito, como decidirias qual proteger primeiro?',overline:'Perfil de prioridades múltiplas'};
 if(a.value-b.value<=5)return {key:'mixed',title:'O construtor de pontes entre prioridades',description:`${a.name} e ${b.name.toLowerCase()} destacam-se nas tuas escolhas. O futuro que imaginas procura conciliar estas duas dimensões, sem esquecer que por vezes podem competir pelos mesmos recursos.`,question:`Como poderias conciliar ${a.name.toLowerCase()} e ${b.name.toLowerCase()} quando surgirem decisões difíceis?`,overline:`Perfil misto · ${a.name} + ${b.name}`};
 return {...a,overline:`Prioridade dominante · ${a.name}`};
}
function showResult(){if(sum()!==100)return;currentProfile=getProfile();$('profile-overline').textContent=currentProfile.overline;$('result-title').textContent=currentProfile.title;$('profile-description').textContent=currentProfile.description;$('profile-question').textContent=currentProfile.question;$('copy-status').textContent='';
 $('result-bars').innerHTML=categories.map((c,i)=>({...c,value:values[i],i})).sort((a,b)=>b.value-a.value||a.i-b.i).map((c,i)=>`<div class="result-bar"><div class="bar-label"><span>${c.name}</span><strong>${c.value} pts</strong></div><div class="bar-track" aria-hidden="true"><div class="bar-fill" style="--width:${c.value}%;--i:${i};background:${c.color}"></div></div></div>`).join('');
 $('resultado').hidden=false;$('result-title').focus({preventScroll:true});$('resultado').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}
function reset(){values=categories.map(()=>0);hideResult();render();}
function toGame(){ $('jogo').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
$('reset').addEventListener('click',reset);$('finish').addEventListener('click',showResult);$('edit').addEventListener('click',()=>{hideResult();toGame();});$('restart').addEventListener('click',()=>{reset();toGame();});
$('copy').addEventListener('click',async()=>{if(!currentProfile)return;const summary=`100 pontos para o futuro — ${currentProfile.title}\n${categories.map((c,i)=>`${c.name}: ${values[i]} pts`).join('\n')}\nTotal: 100 pontos`;
 try{if(!navigator.clipboard)throw Error('unavailable');await navigator.clipboard.writeText(summary);$('copy-status').textContent='Resumo copiado!';}catch{const t=document.createElement('textarea');t.value=summary;t.style.position='fixed';t.style.opacity='0';document.body.append(t);t.select();let ok=false;try{ok=document.execCommand('copy');}catch{}t.remove();$('copy-status').textContent=ok?'Resumo copiado!':'Não foi possível copiar automaticamente neste navegador.';}});
render();
