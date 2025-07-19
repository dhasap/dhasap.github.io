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
