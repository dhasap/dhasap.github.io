// Animasi Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fitur Dark Mode (Opsional)
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.body.prepend(darkModeToggle);

// Generate Kalender
function generateCalendar() {
    const calendar = document.getElementById('calendar');
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    
    // Dummy event (bisa diganti dengan data real)
    const events = {
        15: "Ujian Matematika",
        20: "Kegiatan Pramuka",
        25: "Pembagian Raport"
    };

    // Kosongkan kalender
    calendar.innerHTML = '';

    // Tambahkan header hari
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    days.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-header';
        dayHeader.textContent = day;
        calendar.appendChild(dayHeader);
    });

    // Hitung hari dalam bulan
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Generate tanggal
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        // Cek hari ini
        if (i === date.getDate()) {
            dayElement.classList.add('today');
        }
        
        // Cek event
        if (events[i]) {
            dayElement.classList.add('event');
            dayElement.innerHTML = `<strong>${i}</strong><br><small>${events[i]}</small>`;
        } else {
            dayElement.textContent = i;
        }
        
        calendar.appendChild(dayElement);
    }
}

// Panggil fungsi saat halaman dimuat
window.onload = generateCalendar;

// Data papan peringkat
const topStudents = [
    { name: "Dhany (Raja Iblis)", score: 98 },
    { name: "Farkhan Kun", score: 95 },
    { name: "Ilham Rohim chan", score: 93 },
    { name: "Reza blonde", score: 91 },
    { name: "Ustad Ibnu", score: 89 }
];

function updateLeaderboard() {
    const tbody = document.getElementById('leaderboard-body');
    tbody.innerHTML = '';
    
    topStudents.forEach((student, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.score}</td>
        `;
        
        tbody.appendChild(row);
    });
}

// Panggil fungsi saat halaman dimuat
window.onload = function() {
    generateCalendar();
    updateLeaderboard();
};

// Fungsi pencarian sederhana
document.querySelector('.search-box button').addEventListener('click', function() {
    const searchTerm = document.querySelector('.search-box input').value.toLowerCase();
    alert(`Fitur pencarian untuk "${searchTerm}" akan dikembangkan lebih lanjut!`);
    
    // Contoh: Redirect ke halaman pencarian
    // window.location.href = `search.html?q=${searchTerm}`;
});
