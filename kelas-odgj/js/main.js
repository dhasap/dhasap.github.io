document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Inisialisasi Feather Icons
    try {
        feather.replace();
    } catch (e) {
        console.error('Feather Icons could not be initialized.');
    }

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.setAttribute('data-feather', 'x');
            } else {
                icon.setAttribute('data-feather', 'menu');
            }
            feather.replace();
        });
    }

    // 3. Fungsi Pencarian Siswa
    const studentSearchInput = document.getElementById('studentSearchInput');
    if (studentSearchInput) {
        studentSearchInput.addEventListener('keyup', function() {
            const filter = studentSearchInput.value.toUpperCase();
            const tableBody = document.getElementById('studentTableBody');
            const rows = tableBody.getElementsByTagName('tr');

            for (let i = 0; i < rows.length; i++) {
                let nameColumn = rows[i].getElementsByTagName('td')[2];
                if (nameColumn) {
                    let textValue = nameColumn.textContent || nameColumn.innerText;
                    if (textValue.toUpperCase().indexOf(filter) > -1) {
                        rows[i].style.display = "";
                    } else {
                        rows[i].style.display = "none";
                    }
                }
            }
        });
    }

    // 4. Fungsi untuk Menyorot Jadwal Hari Ini
    function highlightCurrentDay() {
        const currentDay = new Date().getDay();
        const scheduleRows = document.querySelectorAll('.schedule-table-fixed tbody tr');
        scheduleRows.forEach(row => {
            row.classList.remove('today');
        });

        if (currentDay >= 1 && currentDay <= 6) {
            const todayRow = document.querySelector(`.schedule-table-fixed tbody tr[data-day="${currentDay}"]`);
            if (todayRow) {
                todayRow.classList.add('today');
            }
        }
    }
    highlightCurrentDay();
    const highlightButton = document.getElementById('highlight-today-btn');
    if (highlightButton) {
        highlightButton.addEventListener('click', highlightCurrentDay);
    }
});

// 5. Fungsi Efek Gelembung (Ripple) di Seluruh Halaman
document.addEventListener("click", function (event) {
    // Jangan jalankan efek jika yang diklik adalah tombol (karena tombol sudah punya efek hover)
    if (event.target.closest('.btn')) {
        return;
    }

    // Buat elemen span untuk gelembung
    const circle = document.createElement("span");
    const diameter = Math.max(document.documentElement.clientWidth, document.documentElement.clientHeight);
    const radius = diameter / 2;

    // Atur posisi gelembung tepat di lokasi kursor
    circle.style.width = circle.style.height = `100px`;
    circle.style.left = `${event.pageX - 50}px`; // pageX memperhitungkan scroll
    circle.style.top = `${event.pageY - 50}px`;  // pageY memperhitungkan scroll
    circle.classList.add("ripple-body");

    // Tambahkan gelembung ke body
    document.body.appendChild(circle);

    // Hapus gelembung setelah animasi selesai
    setTimeout(() => {
        circle.remove();
    }, 600); // 600ms sesuai durasi animasi
});

// 6. Fungsi untuk Generator Kelompok Acak (Dengan Animasi)
const generateGroupsBtn = document.getElementById('generateGroupsBtn');

if (generateGroupsBtn) {
    const students = [
        "Ainu Syifa", "Ajeng Inova Ningrum", "Akhmad Ibnu Rafi", "Artika Dwi Indah Sari",
        "Camelia Maharani Putri", "Dania Jihan Septiandita", "Desti Mei Muti", "Desvita Shafa Felisa",
        "Dian Noviyanti", "Dinda Adellia", "Dwi Nur Faizah", "Evi Lutfita Sari", "Farkhan Ramdani",
        "Frandy Hermawan", "Gita Juliyanti", "Hani Rahmawati", "Izzah Luthfiana Dewi", "Jumaroh",
        "M.Dhany Saputra", "M. Ilham Saifa Rohim", "Monika Dwi Cahyaningsih", "Muh. Kenar Alva Reza",
        "Nadia Dwi Safitri", "Naesya Salsa Bila", "Nayli Farkhatun", "Nazril Ilham Maulana",
        "Niken Febrianti", "Ni'matul Bilkis", "Puji Ani", "Reygina Nugraha", "Rizki Awal Ramadhani",
        "Rizky Maulida", "Sefina Media Sari", "Sella Astiana", "Sinta Dwi Anjani",
        "Siti Mishbaaroh", "Tri Utami Firnanda", "Uswatun Hasa'na"
    ];

    function handleGroupGeneration() {
        const groupCountInput = document.getElementById('groupCount');
        const resultContainer = document.getElementById('groupResult');
        const numGroups = parseInt(groupCountInput.value);

        // Validasi input
        if (isNaN(numGroups) || numGroups < 2 || numGroups > students.length) {
            resultContainer.innerHTML = `<div class="placeholder-text" style="color: #ef4444;">Masukkan jumlah kelompok yang valid (antara 2 dan ${students.length}).</div>`;
            return;
        }

        // 1. Tampilkan animasi loading
        resultContainer.innerHTML = `
            <div class="shuffling-animation">
                <div class="spinner"></div>
                <div class="shuffling-text">Sedang mengacak kelompok...</div>
            </div>
        `;
        
        // Nonaktifkan tombol selama proses acak
        generateGroupsBtn.disabled = true;
        generateGroupsBtn.style.cursor = 'not-allowed';

        // 2. Jeda waktu untuk animasi (2 detik)
        setTimeout(() => {
            // 3. Logika untuk mengacak dan membagi kelompok
            let shuffledStudents = [...students];
            for (let i = shuffledStudents.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledStudents[i], shuffledStudents[j]] = [shuffledStudents[j], shuffledStudents[i]];
            }

            const groups = Array.from({ length: numGroups }, () => []);
            
            let currentGroup = 0;
            shuffledStudents.forEach(student => {
                groups[currentGroup].push(student);
                currentGroup = (currentGroup + 1) % numGroups;
            });

            // 4. Tampilkan hasilnya
            resultContainer.innerHTML = '';
            groups.forEach((group, index) => {
                let membersHTML = group.map(member => `<li>${member}</li>`).join('');
                resultContainer.innerHTML += `
                    <div class="group-card">
                        <div class="group-card-header">Kelompok ${index + 1}</div>
                        <ul class="group-member-list">${membersHTML}</ul>
                    </div>
                `;
            });
            
            // Aktifkan kembali tombol
            generateGroupsBtn.disabled = false;
            generateGroupsBtn.style.cursor = 'pointer';

        }, 2000); // Durasi animasi 2000ms = 2 detik
    }

    generateGroupsBtn.addEventListener('click', handleGroupGeneration);
}
