// js/main.js

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Inisialisasi Feather Icons
    // This function finds all elements with the `data-feather` attribute and replaces them with SVG icons.
    try {
        feather.replace();
    } catch (e) {
        console.error('Feather Icons could not be initialized. Make sure the script is loaded.');
    }

    // 2. Mobile Menu Toggle
    // This handles the opening and closing of the navigation menu on mobile devices.
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            // Change icon from menu to x and vice-versa
            const icon = menuToggle.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.setAttribute('data-feather', 'x');
            } else {
                icon.setAttribute('data-feather', 'menu');
            }
            feather.replace(); // Re-run to draw the new icon
        });
    }

    // Fungsi Pencarian untuk Daftar Siswa
const studentSearchInput = document.getElementById('studentSearchInput');
if (studentSearchInput) {
    studentSearchInput.addEventListener('keyup', function() {
        const filter = studentSearchInput.value.toUpperCase();
        const tableBody = document.getElementById('studentTableBody');
        const rows = tableBody.getElementsByTagName('tr');

        for (let i = 0; i < rows.length; i++) {
            let nameColumn = rows[i].getElementsByTagName('td')[2]; // Kolom nama ada di index ke-2
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
    // Mendapatkan hari saat ini (0=Minggu, 1=Senin, ..., 6=Sabtu)
    const currentDay = new Date().getDay();

    // Menargetkan semua baris di tabel jadwal
    const scheduleRows = document.querySelectorAll('.schedule-table-clean tbody tr');

    // Menghapus sorotan dari semua baris terlebih dahulu
    scheduleRows.forEach(row => {
        row.classList.remove('today');
    });

    // Jika hari ini adalah hari sekolah (Senin-Sabtu)
    if (currentDay >= 1 && currentDay <= 6) {
        // Menemukan baris yang sesuai dengan hari ini menggunakan atribut data-day
        const todayRow = document.querySelector(`.schedule-table-clean tbody tr[data-day="${currentDay}"]`);
        
        if (todayRow) {
            // Menambahkan kelas 'today' untuk menyorotnya
            todayRow.classList.add('today');
        }
    }
}

// Menjalankan fungsi sorot saat halaman pertama kali dimuat
document.addEventListener('DOMContentLoaded', highlightCurrentDay);

// Menambahkan event listener ke tombol
const highlightButton = document.getElementById('highlight-today-btn');
if (highlightButton) {
    highlightButton.addEventListener('click', highlightCurrentDay);
}
    
});
