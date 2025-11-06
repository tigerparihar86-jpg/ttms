// Seat selection functionality
let selectedTrain = null;
let selectedClass = null;
let selectedSeats = [];
let seatCount = 1;

document.addEventListener('DOMContentLoaded', function() {
    loadTrainData();
    setupEventListeners();
});

function loadTrainData() {
    // Get train ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const trainId = urlParams.get('train');
    const classType = urlParams.get('class');
    const seats = urlParams.get('seats');
    
    if (!trainId) {
        alert('No train selected. Redirecting to home page.');
        window.location.href = 'index.html';
        return;
    }

    // Find train in dataset
    selectedTrain = TRAINS.find(t => t.id === trainId || t.number === trainId);
    selectedClass = classType;
    seatCount = parseInt(seats) || 1;

    if (!selectedTrain) {
        alert('Train not found. Redirecting to home page.');
        window.location.href = 'index.html';
        return;
    }

    displayTrainInfo();
    populateClassSelector();
    loadSeatLayout();
}

function displayTrainInfo() {
    document.getElementById('train-title').textContent = 
        `${selectedTrain.name} (${selectedTrain.number})`;
    document.getElementById('train-route').textContent = 
        `${getStationDisplayName(selectedTrain.from)} → ${getStationDisplayName(selectedTrain.to)} | ${selectedTrain.departure} - ${selectedTrain.arrival}`;
}

function populateClassSelector() {
    const classSelect = document.getElementById('class-select');
    classSelect.innerHTML = '';
    
    selectedTrain.classes.forEach(cls => {
        const option = document.createElement('option');
        option.value = cls;
        option.textContent = `${getClassName(cls)} - ₹${selectedTrain.prices[cls]}`;
        if (cls === selectedClass) {
            option.selected = true;
        }
        classSelect.appendChild(option);
    });
}

function setupEventListeners() {
    const classSelect = document.getElementById('class-select');
    classSelect.addEventListener('change', function() {
        selectedClass = this.value;
        loadSeatLayout();
    });
}

function loadSeatLayout() {
    const seatGrid = document.getElementById('seat-grid');
    seatGrid.innerHTML = '';
    
    if (!selectedClass || !selectedTrain.seatLayout[selectedClass]) {
        seatGrid.innerHTML = '<div class="no-seats">No seat layout available for this class.</div>';
        return;
    }

    const seatLayout = selectedTrain.seatLayout[selectedClass];
    const price = selectedTrain.prices[selectedClass];
    
    // Update summary
    document.getElementById('summary').innerHTML = `
        <strong>Selected: ${getClassName(selectedClass)}</strong> | 
        Price per seat: ₹${price} | 
        Seats to book: ${seatCount} | 
        Total: ₹${price * seatCount}
    `;

    // Create seat grid
    for (let i = 0; i < seatLayout.length; i++) {
        const seat = document.createElement('div');
        seat.className = `seat ${seatLayout[i] ? 'available' : 'unavailable'}`;
        seat.textContent = i + 1;
        seat.dataset.seatNumber = i + 1;
        seat.dataset.available = seatLayout[i];
        
        if (seatLayout[i]) {
            seat.addEventListener('click', function() {
                toggleSeatSelection(this);
            });
        }
        
        seatGrid.appendChild(seat);
    }
}

function toggleSeatSelection(seatElement) {
    const seatNumber = seatElement.dataset.seatNumber;
    const isSelected = seatElement.classList.contains('selected');
    
    if (isSelected) {
        // Deselect seat
        seatElement.classList.remove('selected');
        seatElement.classList.add('available');
        selectedSeats = selectedSeats.filter(seat => seat !== seatNumber);
    } else {
        // Select seat (check limit)
        if (selectedSeats.length >= seatCount) {
            alert(`You can only select ${seatCount} seat(s). Please deselect some seats first.`);
            return;
        }
        seatElement.classList.remove('available');
        seatElement.classList.add('selected');
        selectedSeats.push(seatNumber);
    }
    
    updateBookingButton();
}

function updateBookingButton() {
    const summaryDiv = document.getElementById('summary');
    const price = selectedTrain.prices[selectedClass];
    const totalAmount = price * selectedSeats.length;
    
    let bookingHTML = `
        <strong>Selected: ${getClassName(selectedClass)}</strong> | 
        Price per seat: ₹${price} | 
        Selected: ${selectedSeats.length}/${seatCount} seats | 
        Total: ₹${totalAmount}
    `;
    
    if (selectedSeats.length === seatCount) {
        bookingHTML += `<br><button class="btn" onclick="completeBooking()" style="margin-top:10px; background:#27ae60;">
            Confirm Booking for ₹${totalAmount}
        </button>`;
    }
    
    summaryDiv.innerHTML = bookingHTML;
}

function completeBooking() {
    if (selectedSeats.length !== seatCount) {
        alert(`Please select exactly ${seatCount} seat(s).`);
        return;
    }
    
    const price = selectedTrain.prices[selectedClass];
    const totalAmount = price * selectedSeats.length;
    
    // Get passenger details
    const passengerName = prompt('Enter passenger name:');
    if (!passengerName) return;
    
    const passengerAge = prompt('Enter passenger age:');
    if (!passengerAge) return;
    
    // Generate PNR
    const pnr = 'PNR' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Show confirmation
    const confirmation = `
        🎉 BOOKING CONFIRMED! 🎉

        PNR: ${pnr}
        Train: ${selectedTrain.name} (${selectedTrain.number})
        Route: ${getStationDisplayName(selectedTrain.from)} → ${getStationDisplayName(selectedTrain.to)}
        Date: ${new Date().toLocaleDateString()}
        Class: ${getClassName(selectedClass)}
        Seats: ${selectedSeats.join(', ')}
        Passenger: ${passengerName} (${passengerAge} years)
        Total Amount: ₹${totalAmount}

        Thank you for choosing RailBook!
    `;
    
    alert(confirmation);
    
    // Redirect back to home page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 3000);
}

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