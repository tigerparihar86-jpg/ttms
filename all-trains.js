// All-trains page script
// Use shared dataset from data.js
const TRAINS = window.TRAINS || [];

const list = document.getElementById('all-trains');
function formatPrice(price){ return price ? `₹${price.toLocaleString()}` : '—'; }
function createCard(t){
  const card = document.createElement('div'); card.className = 'train-card';
  const info = document.createElement('div'); info.className = 'train-info';
  const title = document.createElement('h3'); title.textContent = `${t.name} (${t.number})`;
  const details = document.createElement('div'); details.className = 'train-details'; details.innerHTML = `<span>${t.from} → ${t.to}</span><span>Departure: ${t.departure}</span><span>Arrival: ${t.arrival}</span>`;
  const classesDiv = document.createElement('div'); classesDiv.className = 'train-classes'; classesDiv.textContent = `Available: ${t.classes.map(c=>c.toUpperCase()).join(', ')}`;
  info.appendChild(title); info.appendChild(details); info.appendChild(classesDiv);
  const priceCol = document.createElement('div'); priceCol.className = 'train-price';
  Object.keys(t.prices).forEach(cls=>{ const p = document.createElement('div'); p.innerHTML = `<strong>${cls.toUpperCase()}:</strong> ${formatPrice(t.prices[cls])}`; priceCol.appendChild(p); });
  const btn = document.createElement('button'); btn.className = 'book-btn'; btn.textContent = 'Book Now'; btn.addEventListener('click', ()=> alert(`Start booking for ${t.name} (${t.number})`));
  priceCol.appendChild(btn);
  const checkBtn = document.createElement('button'); checkBtn.className = 'btn'; checkBtn.style.background = '#3498db'; checkBtn.style.marginTop = '8px'; checkBtn.textContent = 'Check Seats'; checkBtn.addEventListener('click', ()=> { window.location.href = `seats.html?train=${encodeURIComponent(t.number)}`; }); priceCol.appendChild(checkBtn);
  card.appendChild(info); card.appendChild(priceCol); return card;
}
TRAINS.forEach(t=> list.appendChild(createCard(t)));