// --- Utilities & Dataset ---
document.getElementById('date').min = new Date().toISOString().split('T')[0];

// TRAINS dataset is provided by data.js and exposed as window.TRAINS
const TRAINS = window.TRAINS || [];

// Station mapping to match form values with train data
const STATION_MAPPING = {
    'NDLS': 'NDLS',
    'MUMBAI': 'MUMBAI', 
    'Kolkata': 'Kolkata',
    'Chennai': 'Chennai',
    'Bangalore': 'Bangalore',
    'Hyderabad': 'Hyderabad',
    'Ahmedabad': 'Ahmedabad',
    'Pune': 'Pune',
    'Jaipur': 'Jaipur',
    'Lucknow': 'Lucknow',
    'Kanpur': 'Kanpur',
    'Bhopal': 'Bhopal',
    'Patna': 'Patna',
    'Guwahati': 'Guwahati',
    'Chandigarh': 'Chandigarh',
    'Amritsar': 'Amritsar',
    'Varanasi': 'Varanasi',
    'Nagpur': 'Nagpur',
    'Coimbatore': 'Coimbatore',
    'Kochi': 'Kochi'
};

// --- Rendering logic ---
const resultsSection = document.getElementById('search-results');
const resultsList = document.getElementById('results-list');

function clearResults() { resultsList.innerHTML = ''; }
function formatPrice(price) { return price ? `₹${price.toLocaleString()}` : '—'; }

function createTrainCard(train) {
  const card = document.createElement('div'); 
  card.className = 'train-card';
  card.dataset.trainId = train.id;
  
  const info = document.createElement('div'); 
  info.className = 'train-info';
  
  const title = document.createElement('h3'); 
  title.textContent = `${train.name} (${train.number})`;
  
  const details = document.createElement('div'); 
  details.className = 'train-details';
  details.innerHTML = `<span>${getStationDisplayName(train.from)} → ${getStationDisplayName(train.to)}</span>\n                                 <span>Departure: ${train.departure}</span>\n                                 <span>Arrival: ${train.arrival}</span>`;
  
  const classesDiv = document.createElement('div'); 
  classesDiv.className = 'train-classes'; 
  classesDiv.innerHTML = `Available: ${train.classes.map(c=>getClassName(c)).join(', ')}`;
  
  info.appendChild(title); 
  info.appendChild(details); 
  info.appendChild(classesDiv);

  const priceCol = document.createElement('div'); 
  priceCol.className = 'train-price';
  
  const priceList = document.createElement('div');
  Object.keys(train.prices).forEach(cls => {
    const p = document.createElement('div');
    p.style.marginBottom = '6px';
    p.innerHTML = `<strong>${getClassName(cls)}:</strong> ${formatPrice(train.prices[cls])}`;
    priceList.appendChild(p);
  });

  const btnWrap = document.createElement('div');
  btnWrap.style.display = 'flex'; 
  btnWrap.style.flexDirection = 'column'; 
  btnWrap.style.alignItems = 'flex-end'; 
  btnWrap.style.gap = '8px';

  const bookBtn = document.createElement('button');
  bookBtn.className = 'book-btn'; 
  bookBtn.textContent = 'Book Now';
  bookBtn.addEventListener('click', function() {
    startBookingProcess(train);
  });

  btnWrap.appendChild(priceList); 
  btnWrap.appendChild(bookBtn);
  priceCol.appendChild(btnWrap);
  card.appendChild(info); 
  card.appendChild(priceCol);
  
  return card;
}

function renderResults(trains, criteria) {
  clearResults();
  if (!trains.length) {
    const none = document.createElement('div'); 
    none.className = 'feature-card';
    none.innerHTML = `<h3>No trains found</h3>\n                    <p>No matching trains for ${getStationDisplayName(criteria.from)} → ${getStationDisplayName(criteria.to)} on ${criteria.date}.</p>\n                    <p style="margin-top:12px;"><a href="all-trains.html" class="btn" style="text-decoration:none; display:inline-block;">View all trains</a></p>`;
    resultsList.appendChild(none); 
    return;
  }
  trains.sort((a,b) => a.departure.localeCompare(b.departure));
  trains.forEach(t => resultsList.appendChild(createTrainCard(t)));
}

// Helper functions
function getStationDisplayName(stationCode) {
    const stationNames = {
        'NDLS': 'New Delhi (NDLS)',
        'MUMBAI': 'Mumbai Central (BCT)',
        'Kolkata': 'Howrah Junction (HWH)',
        'Chennai': 'Chennai Central (MAS)',
        'Bangalore': 'Bengaluru City (SBC)',
        'Hyderabad': 'Hyderabad Deccan (HYB)',
        'Ahmedabad': 'Ahmedabad Junction (ADI)',
        'Pune': 'Pune Junction (PUNE)',
        'Jaipur': 'Jaipur Junction (JP)',
        'Lucknow': 'Lucknow Charbagh (LKO)',
        'Kanpur': 'Kanpur Central (CNB)',
        'Bhopal': 'Bhopal Junction (BPL)',
        'Patna': 'Patna Junction (PNBE)',
        'Guwahati': 'Guwahati (GHY)',
        'Chandigarh': 'Chandigarh Junction (CDG)',
        'Amritsar': 'Amritsar Junction (ASR)',
        'Varanasi': 'Varanasi Junction (BSB)',
        'Nagpur': 'Nagpur Junction (NGP)',
        'Coimbatore': 'Coimbatore Junction (CBE)',
        'Kochi': 'Ernakulam Junction (ERS)'
    };
    return stationNames[stationCode] || stationCode;
}

function getClassName(classCode) {
    const classNames = {
        '1a': 'First AC',
        '2a': 'Second AC', 
        '3a': 'Third AC',
        'sl': 'Sleeper',
        'cc': 'AC Chair Car',
        'ec': 'Executive Chair Car'
    };
    return classNames[classCode] || classCode.toUpperCase();
}

function startBookingProcess(train) {
    // Store train data for seat selection page
    sessionStorage.setItem('selectedTrain', JSON.stringify(train));
    sessionStorage.setItem('journeyDate', document.getElementById('date').value);
    
    // Show class selection first
    selectClassAndProceed(train);
}

function selectClassAndProceed(train) {
    let classOptions = 'Select Class:\n\n';
    train.classes.forEach((cls, index) => {
        classOptions += `${index + 1}. ${getClassName(cls)} - ₹${train.prices[cls]}\n`;
    });
    
    const classChoice = prompt(`${classOptions}\nEnter class number (1-${train.classes.length}):`);
    
    if (classChoice === null) return; // User cancelled
    
    const classIndex = parseInt(classChoice) - 1;
    
    if (isNaN(classIndex) || classIndex < 0 || classIndex >= train.classes.length) {
        alert('Invalid class selection. Please try again.');
        return;
    }
    
    const selectedClass = train.classes[classIndex];
    const price = train.prices[selectedClass];
    
    // Store selected class
    sessionStorage.setItem('selectedClass', selectedClass);
    
    // Ask for number of seats
    const numSeats = prompt(`How many seats do you want to book in ${getClassName(selectedClass)}?\nPrice per seat: ₹${price}\n\nEnter number (1-6):`);
    
    if (numSeats === null) return; // User cancelled
    
    const seatCount = parseInt(numSeats);
    
    if (isNaN(seatCount) || seatCount < 1 || seatCount > 6) {
        alert('Please enter a valid number between 1 and 6.');
        return;
    }
    
    // Store seat count
    sessionStorage.setItem('seatCount', seatCount);
    
    // Redirect to seat selection page
    alert(`Redirecting to seat selection for ${train.name}...\n\nClass: ${getClassName(selectedClass)}\nSeats: ${seatCount}\nTotal: ₹${price * seatCount}`);
    window.location.href = `seats.html?train=${train.id}&class=${selectedClass}&seats=${seatCount}`;
}

// --- Search handling ---
document.querySelector('.search-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  const date = document.getElementById('date').value;
  const cls = document.getElementById('class').value; // 'all' or class code
  
  if (!from || !to || !date) { alert('Please fill in all fields'); return; }
  if (from === to) { alert('Departure and arrival stations cannot be the same'); return; }
  
  // Convert form values to match train data station codes
  const fromCode = Object.keys(STATION_MAPPING).find(key => STATION_MAPPING[key] === from) || from;
  const toCode = Object.keys(STATION_MAPPING).find(key => STATION_MAPPING[key] === to) || to;
  
  // Filter trains - use exact matching with the converted codes
  let matches = TRAINS.filter(t => 
      t.from === fromCode && t.to === toCode
  );
  
  // Additional class filtering if needed
  if (cls && cls !== 'all') { 
      const normalized = cls.toLowerCase(); 
      matches = matches.filter(t => t.classes.map(c=>c.toLowerCase()).includes(normalized)); 
  }
  
  resultsSection.style.display = 'block'; 
  renderResults(matches, { from: fromCode, to: toCode, date, cls }); 
  resultsSection.scrollIntoView({ behavior: 'smooth' });
});

// Initialize static "Book Now" buttons for popular trains section
function initializeStaticBookButtons() {
    const staticTrainCards = document.querySelectorAll('.trains .train-list .train-card');
    
    staticTrainCards.forEach((card, index) => {
        const bookBtn = card.querySelector('.book-btn');
        if (bookBtn && !bookBtn.hasAttribute('data-initialized')) {
            bookBtn.setAttribute('data-initialized', 'true');
            
            // Map static cards to actual train data
            const trainNames = [
                'Rajdhani Express (12213)',
                'Shatabdi Express (12001)', 
                'Duronto Express (12245)'
            ];
            
            const trainName = trainNames[index];
            const train = TRAINS.find(t => `${t.name} (${t.number})` === trainName);
            
            bookBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (train) {
                    startBookingProcess(train);
                } else {
                    alert(`Booking process for ${trainName} would start here.`);
                }
            });
        }
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeStaticBookButtons();
});

// Re-initialize static buttons after any dynamic content changes
setTimeout(initializeStaticBookButtons, 100);