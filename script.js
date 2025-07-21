const form = document.getElementById('book-form');
const listEl = document.getElementById('book-list');
const myLibrary = [];

form.addEventListener('submit', e => {
  e.preventDefault();
  const t = form['title'].value.trim(),
        a = form['author'].value.trim(),
        tot = parseInt(form['total-pages'].value,10),
        cur = parseInt(form['current-page'].value,10);
  if (cur<0||cur>tot) return alert('Invalid current page');
  myLibrary.push({title:t,author:a,total:tot,current:cur,elapsed:0,timerId:null,rating:0,desc:''});
  form.reset(); renderBooks();
});

function renderBooks() {
  listEl.innerHTML = '';
  myLibrary.forEach((b,i) => {
    const pct = ((b.current/b.total)*100).toFixed(1);
    const row=document.createElement('tr');
    row.innerHTML=`
      <td>${b.title}</td><td>${b.author}</td>
      <td>${b.current}/${b.total} (${pct}%)<div class="progress-bar"><div class="progress-bar-inner" style="width:${pct}%"></div></div></td>
      <td><span class="timer-display">${fmt(b.elapsed)}</span><br>
        <button class="timer-btn start">▶️</button>
        <button class="timer-btn pause" disabled>⏸</button>
        <button class="timer-btn reset" disabled>⟲</button>
      </td>
      <td><span class="estimate-display">--</span></td>
      <td>
        <div class="star-rating">
          ${[5,4,3,2,1].map(v=>`
            <input type="radio" name="rating-${i}" id="star${v}-${i}" value="${v}" ${b.rating===v?'checked':''}>
            <label for="star${v}-${i}">★</label>
          `).join('')}
        </div>
      </td>
      <td><textarea class="description-input" placeholder="Leave a short review..." ${b.current<b.total?'disabled':''}>${b.desc}</textarea></td>
      <td><button class="remove-btn">×</button></td>
    `;
    const start=row.querySelector('.start'),
          pause=row.querySelector('.pause'),
          reset=row.querySelector('.reset'),
          timerText=row.querySelector('.timer-display'),
          estText=row.querySelector('.estimate-display'),
          descInput=row.querySelector('.description-input'),
          stars=row.querySelectorAll(`input[name="rating-${i}"]`);

    start.onclick = () => {
      start.disabled=true; pause.disabled=reset.disabled=false;
      const begin=Date.now()-b.elapsed;
      b.timerId=setInterval(()=>{
        b.elapsed=Date.now()-begin;
        timerText.textContent=fmt(b.elapsed);
        updateEst(b,estText);
      },500);
    };
    pause.onclick=()=>{
      clearInterval(b.timerId); b.timerId=null;
      start.disabled=false; pause.disabled=true;
    };
    reset.onclick=()=>{
      clearInterval(b.timerId);
      b.elapsed=0; timerText.textContent=fmt(0); estText.textContent='--';
      b.timerId=null; start.disabled=false; pause.disabled=reset.disabled=true;
    };
    descInput.addEventListener('input',()=>b.desc=descInput.value);

    stars.forEach(r=>{
      r.onchange=()=>b.rating=parseInt(r.value,10);
    });

    row.querySelector('.remove-btn').onclick=()=>{
      clearInterval(b.timerId);
      myLibrary.splice(i,1);
      renderBooks();
    };

    listEl.appendChild(row);
  });
}

function fmt(ms) {
  const s = Math.floor(ms/1e3), m = Math.floor(s/60), sec=String(s%60).padStart(2,'0');
  return `${String(m).padStart(2,'0')}:${sec}`;
}

function updateEst(book, el) {
  if(book.current>0 && book.elapsed>500){
    const pace=book.current/(book.elapsed/60000);
    const rem=(book.total-book.current)/pace;
    const h=Math.floor(rem/60), m=Math.round(rem%60);
    el.textContent=h?`${h}h ${m}m`:`${m}m`;
  }
}
