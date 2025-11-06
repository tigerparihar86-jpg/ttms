// Central train dataset used by all pages
// Exposed as window.TRAINS so non-module scripts can access it
window.TRAINS = [
    {
        id: '12213',
        name: 'Rajdhani Express',
        number: '12213',
        from: 'NDLS',
        to: 'MUMBAI',
        departure: '16:25',
        arrival: '08:35',
        classes: ['1a','2a','3a'],
        prices: { '1a':1850, '2a':1400, '3a':900, 'sl':520 },
        seatLayout: {
            '1a': [true,true,false,true,true,true,true,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
            '2a': [true,true,true,true,false,true,true,true,true,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
            '3a': [true,true,true,false,true,true,true,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]
        }
    },
    {
        id: '12001',
        name: 'Shatabdi Express',
        number: '12001',
        from: 'NDLS',
        to: 'Bhopal',
        departure: '06:00',
        arrival: '11:30',
        classes: ['cc','ec'],
        prices: { 'cc':1250, 'ec':850 },
        seatLayout: {
            'cc': [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
            'ec': [true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false]
        }
    },
    {
        id: '12245',
        name: 'Duronto Express',
        number: '12245',
        from: 'Kolkata',
        to: 'NDLS',
        departure: '20:05',
        arrival: '09:00',
        classes: ['1a','2a','3a'],
        prices: { '1a':1650, '2a':1250, '3a':900 },
        seatLayout: {
            '1a': [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
            '2a': [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
            '3a': [true,true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false,true]
        }
    },
    {
        id: '20801',
        name: 'Mumbai Mail',
        number: '20801',
        from: 'MUMBAI',
        to: 'PUNE',
        departure: '09:00',
        arrival: '12:30',
        classes: ['3a','sl'],
        prices: { '3a':600, 'sl':250 },
        seatLayout: {
            '3a': [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
            'sl': [true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false]
        }
    },
    {
        id: '12657',
        name: 'Bengaluru Express',
        number: '12657',
        from: 'Bangalore',
        to: 'Chennai',
        departure: '07:15',
        arrival: '13:50',
        classes: ['2a','3a','sl'],
        prices: { '2a':1100, '3a':750, 'sl':320 },
        seatLayout: {
            '2a': [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
            '3a': [true,true,true,true,true,true,false,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
            'sl': [true,true,false,true,true,true,false,true,true,true,false,true,true,true,false,true,true,true,false,true,true,true,true,true]
        }
    },
    {
        id: '12777',
        name: 'Hyderabad Express',
        number: '12777',
        from: 'Hyderabad',
        to: 'Bangalore',
        departure: '14:40',
        arrival: '21:10',
        classes: ['3a','sl'],
        prices: { '3a':680, 'sl':300 },
        seatLayout: {
            '3a': [true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false],
            'sl': [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
        }
    },
    {
        id: '12901',
        name: 'Gujarat Mail',
        number: '12901',
        from: 'Ahmedabad',
        to: 'Mumbai',
        departure: '23:55',
        arrival: '07:40',
        classes: ['1a','2a','3a','sl'],
        prices: { '1a':2000, '2a':1500, '3a':1000, 'sl':450 },
        seatLayout: {
            '1a': [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
            '2a': [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
            '3a': [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
            'sl': [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]
        }
    },
    {
        id: '13007',
        name: 'Kochi Express',
        number: '13007',
        from: 'Kochi',
        to: 'Bangalore',
        departure: '05:30',
        arrival: '12:10',
        classes: ['2a','3a','sl'],
        prices: { '2a':1200, '3a':800, 'sl':340 },
        seatLayout: {
            '2a': [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
            '3a': [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
            'sl': [true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]
        }
    }
];
