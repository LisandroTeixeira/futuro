'use strict';
const categories=[
 {key:'family',name:'Família',desc:'Construir um lar, cuidar e estar presente.',color:'#79aa62',title:'Família em primeiro lugar',meaning:'construir um lar e estar presente para as pessoas que amas',question:'Se um emprego mais bem pago te deixasse pouco tempo para a família, o que pesaria mais na tua decisão?'},
 {key:'money',name:'Dinheiro',desc:'Estabilidade financeira, poupança e segurança.',color:'#b49d57',title:'Segurança financeira',meaning:'ter dinheiro suficiente para viver com segurança e enfrentar imprevistos',question:'Que rendimento ou poupança considerarias suficiente para começares a concretizar outros planos?'},
 {key:'career',name:'Carreira',desc:'Realização profissional, aprendizagem e ambição.',color:'#4e957d',title:'Foco na carreira',meaning:'progredir profissionalmente e concretizar os teus objetivos',question:'Que condições terias de ter num trabalho para que o esforço e os horários compensassem?'},
 {key:'health',name:'Saúde',desc:'Bem-estar físico, mental e qualidade de vida.',color:'#8eb77f',title:'Saúde em primeiro lugar',meaning:'proteger a saúde e a qualidade de vida',question:'Que mudanças aceitarias fazer no trabalho se começasse a prejudicar a tua saúde?'},
 {key:'freedom',name:'Liberdade',desc:'Autonomia, novas experiências e poder de escolha.',color:'#89a8aa',title:'Independência',meaning:'ter autonomia para decidir o teu próprio caminho',question:'Que compromissos aceitarias assumir sem sentires que perdeste a tua independência?'},
 {key:'friends',name:'Amigos',desc:'Amizades, apoio mútuo e sentimento de pertença.',color:'#b18f9f',title:'Amizades em primeiro lugar',meaning:'manter amizades próximas e uma rede de apoio',question:'Como manterias as amizades se o trabalho te obrigasse a mudar de cidade?'},
 {key:'time',name:'Tempo',desc:'Descanso, lazer e momentos para o que importa.',color:'#c39e78',title:'Tempo para viver',meaning:'reservar tempo para descansar, ter lazer e viver fora do trabalho',question:'Quanto rendimento aceitarias perder para ter mais tempo livre todas as semanas?'}
];
// Cada par tem uma interpretação e um dilema próprios. A ordem não altera o par.
const pairNotes={
 'family|money':['Família e estabilidade','Queres construir um lar com condições materiais para o manter. Nesta combinação, o dinheiro pode ser visto como um meio de proteger a família, e não apenas como uma conquista pessoal.','Aceitarias trabalhar mais horas para sustentar a família, mesmo que isso significasse estar menos presente?'],
 'family|career':['Família e carreira','Ter um percurso profissional de que te orgulhes e construir uma família parecem fazer parte do mesmo projeto de vida. A dificuldade poderá estar em conciliar horários, responsabilidades e ambição.','Se recebesses uma promoção que implicasse passar menos tempo em casa, em que condições a aceitarias?'],
 'family|health':['Família e saúde','O teu futuro parece passar por cuidar de ti e das pessoas próximas. A qualidade de vida do agregado pode pesar tanto como os objetivos materiais.','Como protegerias a tua saúde se tivesses de conciliar trabalho e cuidados a um familiar?'],
 'family|freedom':['Família e independência','Valorizas os compromissos familiares sem abdicar da autonomia. A vida que procuras poderá incluir um lar onde cada pessoa conserve espaço para os seus projetos.','Como dividirias as responsabilidades familiares para que todos tivessem liberdade de escolha?'],
 'family|friends':['Família e amizades','As relações próximas são um elemento central das tuas escolhas. Pareces valorizar tanto o apoio familiar como os laços que construíste fora de casa.','Como manterias as amizades ao mesmo tempo que assumisses novas responsabilidades familiares?'],
 'family|time':['Família e tempo','Não parece bastar-te construir uma família: também valorizas ter tempo para participar na sua vida. Um emprego que permita estar presente poderá ter um valor especial para ti.','Preferias um salário maior ou um horário que te permitisse acompanhar os teus filhos no dia a dia?'],
 'money|career':['Carreira e estabilidade','A progressão profissional e a segurança financeira surgem ligadas. Podes procurar um trabalho que ofereça aprendizagem, melhores rendimentos e perspetivas de futuro.','Escolherias um emprego seguro com salário previsível ou um projeto mais arriscado com maior potencial de crescimento?'],
 'money|health':['Dinheiro e saúde','A segurança financeira e o bem-estar parecem ser duas bases da vida que imaginas. O rendimento pode ajudar a lidar com imprevistos, mas nem todos os empregos mais bem pagos protegem a saúde.','Aceitarias um emprego com um salário superior se soubesses que poderia aumentar bastante o teu nível de stress?'],
 'money|freedom':['Estabilidade e independência','A autonomia que procuras pode depender da possibilidade de pagar as tuas despesas e não depender financeiramente de outras pessoas. Poupar e manter margem de escolha podem andar juntos.','Preferias poupar durante mais alguns anos ou sair mais cedo de casa com um orçamento apertado?'],
 'money|friends':['Dinheiro e amizades','As tuas escolhas dão espaço tanto à segurança material como à rede de pessoas em quem podes confiar. Ter estabilidade sem perder essas relações pode ser importante para ti.','Mudarias para uma cidade onde ganhasses mais, mesmo que ficasses longe dos teus amigos?'],
 'money|time':['Dinheiro e tempo','Queres margem financeira, mas também tempo que não esteja ocupado pelo trabalho. Um salário elevado pode ser menos atrativo se exigir demasiadas horas.','Entre um aumento salarial e uma redução do horário, o que escolherias se as despesas essenciais já estivessem pagas?'],
 'career|health':['Carreira e saúde','Progredir no trabalho parece importante, mas o bem-estar também tem peso. O desafio será encontrar um ritmo profissional sustentável.','Recusarias uma promoção se ela implicasse um horário que comprometesse o teu descanso?'],
 'career|freedom':['Carreira e independência','As tuas escolhas aproximam realização profissional e autonomia. Poderás valorizar um percurso onde possas tomar decisões e experimentar oportunidades diferentes.','Preferias um emprego estável com pouca autonomia ou um projeto em que pudesses decidir mais, mas com maior risco?'],
 'career|friends':['Carreira e amizades','O crescimento profissional e as relações de amizade aparecem lado a lado. Mudar de emprego ou de cidade pode significar ganhar oportunidades e perder parte do contacto quotidiano.','Aceitarias uma oportunidade profissional longe das pessoas com quem mais convives?'],
 'career|time':['Carreira e tempo','Pareces querer crescer profissionalmente sem fazer do trabalho toda a tua vida. As escolhas de horários e de responsabilidades poderão ser importantes para manter esse equilíbrio.','Que limite de horas de trabalho por semana colocarias para preservares o teu tempo pessoal?'],
 'health|freedom':['Saúde e independência','O bem-estar e a possibilidade de decidir por ti são duas prioridades próximas. Podes procurar uma rotina que respeite os teus limites e te permita escolher o teu caminho.','Se uma oportunidade de viver noutro país implicasse perder uma rotina que te faz bem, como decidirias?'],
 'health|friends':['Saúde e amizades','Valorizas o bem-estar e os vínculos sociais. Ter pessoas por perto pode contribuir para a qualidade de vida, sem substituir o cuidado com a própria saúde.','Como manterias contacto com os amigos durante uma fase em que precisasses de descansar mais?'],
 'health|time':['Saúde e tempo','O descanso e a qualidade de vida parecem ocupar um lugar importante no futuro que imaginas. Podes dar especial valor a condições de trabalho que permitam cuidar de ti.','Aceitarias ganhar menos se isso te permitisse dormir melhor e ter mais tempo para cuidar da tua saúde?'],
 'freedom|friends':['Independência e amizades','Queres ter espaço para seguir o teu caminho, mas também manter as pessoas importantes por perto. Nem sempre autonomia e proximidade exigem as mesmas escolhas.','Se tivesses a oportunidade de viver sozinho no estrangeiro, como manterias os teus laços de amizade?'],
 'freedom|time':['Independência e tempo','Valorizas decidir como viver e ter tempo para o fazer. A flexibilidade pode contar tanto como o rendimento ou o prestígio profissional.','Escolherias um emprego com horários flexíveis mesmo que o rendimento fosse menos previsível?'],
 'friends|time':['Amizades e tempo','As tuas escolhas deixam espaço para conviver e viver experiências fora das obrigações. Ter tempo disponível pode ajudar-te a preservar essas relações.','Como organizarias a tua semana se o trabalho ocupasse quase todo o teu tempo livre?']
};
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
function formatList(items){return new Intl.ListFormat('pt-PT',{style:'long',type:'conjunction'}).format(items);}
function getProfile(input=values){
 const ranked=categories.map((c,i)=>({...c,value:input[i],i})).sort((a,b)=>b.value-a.value||a.i-b.i);
 const [a,b]=ranked, last=ranked.at(-1), top=ranked.filter(c=>c.value===a.value), near=ranked.filter(c=>a.value-c.value<=5&&c.value>0);
 const zeros=ranked.filter(c=>c.value===0), low=ranked.filter(c=>c.value>0&&c.value<=5);
 const fmt=c=>`${c.name.toLowerCase()} (${c.value} pontos)`;
 const feminine=new Set(['family','career','health','freedom']);
 const to=c=>`${c.key==='friends'?'aos':feminine.has(c.key)?'à':'ao'} ${c.name.toLowerCase()}`;
 const capitalize=t=>t.charAt(0).toUpperCase()+t.slice(1);
 const pair=near.length<=2&&ranked[2].value<b.value&&b.value>=15&&a.value+b.value>=40?pairNotes[[a,b].sort((x,y)=>x.i-y.i).map(c=>c.key).join('|')]:null;
 let title,overline,description,question;
 if(a.value-last.value<=10){
  title='Vida equilibrada';overline='Sem uma prioridade dominante';
  description=`Distribuíste entre ${last.value} e ${a.value} pontos por cada uma das sete áreas. ${top.length===1?`${a.name} recebe um pouco mais de atenção.`:`${formatList(top.map(c=>c.name))} receberam a pontuação mais alta.`} Preferiste reservar espaço para várias dimensões da vida em vez de concentrar os recursos numa só.`;
  question='Se o teu rendimento diminuísse e tivesses de proteger apenas duas áreas, quais escolherias?';
 }else if(near.length>=3){
  title='Várias prioridades';overline=top.length>1?'Prioridades principais empatadas':'Prioridades principais próximas';
  description=`As áreas que mais valorizaste foram ${formatList(near.map(fmt))}. Juntas receberam ${near.reduce((n,c)=>n+c.value,0)} dos teus 100 pontos. ${top.length===near.length?'Deste-lhes exatamente o mesmo peso.':'Embora não tenham todas a mesma pontuação, estão próximas entre si.'} Não escolheste um único objetivo para orientar o teu futuro.`;
  question=`Se uma decisão obrigasse a escolher entre ${near[0].name.toLowerCase()} e ${near[1].name.toLowerCase()}, o que pesaria mais?`;
 }else if(pair&&a.value-b.value<=10){
  title=pair[0];overline=top.length===2?'Duas prioridades com o mesmo peso':'Duas prioridades principais';
  description=`Atribuíste ${a.value} pontos ${to(a)} e ${b.value} ${to(b)}: ${a.value+b.value}% do total. ${top.length===2?'Estas áreas têm exatamente o mesmo peso.':`${a.name} fica ${a.value-b.value} pontos à frente.`} ${pair[1]}`;
  question=pair[2];
 }else{
  title=a.title;overline=`Maior prioridade · ${a.name} · ${a.value} pontos`;
  const emphasis=a.value===100?'Todos os teus pontos foram para esta área.':a.value>50?'Mais de metade dos teus pontos ficou nesta área.':a.value===50?'Metade dos teus pontos ficou nesta área.':`Esta área ficou ${a.value-b.value} pontos à frente da prioridade seguinte.`;
  const seconds=ranked.filter(c=>c.value===b.value&&c.value>0&&c.i!==a.i);
  description=`Atribuíste ${a.value} pontos ${to(a)}. ${emphasis} Nesta atividade, parece ser especialmente importante para ti ${a.meaning}.`;
  if(seconds.length===1){description+=` A segunda prioridade é ${fmt(b)}. ${pair?pair[1]:`Também deste espaço a ${b.meaning}.`}`;}
  else if(seconds.length>1){description+=` Em segundo lugar ficaram ${formatList(seconds.map(fmt))}, com o mesmo peso.`;}
  question=pair?pair[2]:a.question;
 }
 let detail='';
 if(zeros.length===6){detail=`Não reservaste pontos para as outras seis áreas. Isso mostra uma escolha muito concentrada neste exercício, não que essas áreas sejam irrelevantes na tua vida.`;}
 else if(zeros.length){detail=`Deixaste ${formatList(zeros.map(c=>c.name.toLowerCase()))} sem pontos.${low.length?` ${capitalize(formatList(low.map(fmt)))} também ${low.length===1?'ficou':'ficaram'} com pouco peso.`:''} Isso não significa que não as valorizes: perante um limite de 100 pontos, escolheste dar mais espaço a outras áreas.`;}
 else if(low.length){detail=`As áreas com menor margem foram ${formatList(low.map(fmt))}. Se as tuas circunstâncias mudassem, talvez a distribuição também mudasse.`;}
 else if(a.value-last.value>10){const bottom=ranked.filter(c=>c.value===last.value);detail=`Reservaste pontos para todas as áreas, embora ${formatList(bottom.map(fmt))} ${bottom.length===1?'tenha':'tenham'} recebido menos. A diferença entre o maior e o menor valor é de ${a.value-last.value} pontos.`;}
 else{detail='Nenhuma área ficou de fora. O resultado sugere uma procura de equilíbrio nesta escolha, não uma característica fixa da tua personalidade.';}
 return {title,overline,description,detail,question};
}
function showResult(){if(sum()!==100)return;currentProfile=getProfile();$('profile-overline').textContent=currentProfile.overline;$('result-title').textContent=currentProfile.title;$('profile-description').textContent=currentProfile.description;$('profile-detail').textContent=currentProfile.detail;$('profile-question').textContent=currentProfile.question;$('copy-status').textContent='';
 $('result-bars').innerHTML=categories.map((c,i)=>({...c,value:values[i],i})).sort((a,b)=>b.value-a.value||a.i-b.i).map((c,i)=>`<div class="result-bar"><div class="bar-label"><span>${c.name}</span><strong>${c.value} pts</strong></div><div class="bar-track" aria-hidden="true"><div class="bar-fill" style="--width:${c.value}%;--i:${i};background:${c.color}"></div></div></div>`).join('');
 $('resultado').hidden=false;$('result-title').focus({preventScroll:true});$('resultado').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}
function reset(){values=categories.map(()=>0);hideResult();render();}
function toGame(){ $('jogo').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
$('reset').addEventListener('click',reset);$('finish').addEventListener('click',showResult);$('edit').addEventListener('click',()=>{hideResult();toGame();});$('restart').addEventListener('click',()=>{reset();toGame();});
$('copy').addEventListener('click',async()=>{if(!currentProfile)return;const summary=`100 pontos para o futuro — ${currentProfile.title}\n${categories.map((c,i)=>`${c.name}: ${values[i]} pts`).join('\n')}\nTotal: 100 pontos\n\n${currentProfile.description}\n${currentProfile.detail}\n\nPara refletir: ${currentProfile.question}`;
 try{if(!navigator.clipboard)throw Error('unavailable');await navigator.clipboard.writeText(summary);$('copy-status').textContent='Resumo copiado!';}catch{const t=document.createElement('textarea');t.value=summary;t.style.position='fixed';t.style.opacity='0';document.body.append(t);t.select();let ok=false;try{ok=document.execCommand('copy');}catch{}t.remove();$('copy-status').textContent=ok?'Resumo copiado!':'Não foi possível copiar automaticamente neste navegador.';}});
render();
