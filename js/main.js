// Inisialisasi ikon dari library Lucide
      lucide.createIcons();

      // Tombol reset semua data
      document.getElementById("resetSemua").addEventListener("click", function () {
        if (confirm("Yakin ingin mereset semua data?")) {
          localStorage.clear(); // Hapus semua data dari localStorage
          alert("Semua data berhasil direset.");
          location.href = "login.html"; // Arahkan ke halaman login setelah reset
        }
      });

      // Fungsi untuk mendapatkan nomor minggu dalam setahun dari suatu tanggal
      function getWeekNumber(d) {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7)); // Koreksi ke hari Kamis
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1)); // Awal tahun
        const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7); // Hitung minggu ke-
        return [d.getUTCFullYear(), weekNo]; // Kembalikan [tahun, minggu]
      }

      // Ambil data kas dan pengeluaran dari localStorage
      const kasData = JSON.parse(localStorage.getItem("kasData")) || [];
      const pengeluaranData = JSON.parse(localStorage.getItem("pengeluaranData")) || [];
      const now = new Date();

      // Ambil minggu sekarang dan minggu lalu
      const [yearNow, weekNow] = getWeekNumber(now);
      const [yearLast, weekLast] = getWeekNumber(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000));

      // Filter data kas yang hanya berasal dari minggu ini
      const mingguIni = kasData.filter(entry => {
        const [y, w] = getWeekNumber(new Date(entry.tanggal));
        return y === yearNow && w === weekNow;
      });

      // Filter data kas minggu lalu
      const mingguLalu = kasData.filter(entry => {
        const [y, w] = getWeekNumber(new Date(entry.tanggal));
        return y === yearLast && w === weekLast;
      });

      // Hitung total kas minggu ini dan minggu lalu
      const totalMingguIni = mingguIni.reduce((sum, entry) => sum + Number(entry.jumlah), 0);
      const totalMingguLalu = mingguLalu.reduce((sum, entry) => sum + Number(entry.jumlah), 0);

      // Tampilkan jumlah kas minggu ini di elemen HTML
      document.getElementById("kasMingguan").textContent = `Rp ${totalMingguIni.toLocaleString()}`;

      // Hitung selisih dan persentase perubahan dari minggu lalu ke minggu ini
      const diff = totalMingguIni - totalMingguLalu;
      const percent = totalMingguLalu === 0 ? 100 : Math.round((diff / totalMingguLalu) * 100);
      const statSpan = document.getElementById("statistikKas");

      // Tampilkan persentase dengan warna sesuai (+ atau -)
      if (percent >= 0) {
        statSpan.textContent = `+${percent}%`;
        statSpan.classList.add("text-success");
        statSpan.classList.remove("text-danger");
      } else {
        statSpan.textContent = `${percent}%`;
        statSpan.classList.add("text-danger");
        statSpan.classList.remove("text-success");
      }

      // Hitung total kas masuk dan keluar, lalu tampilkan sisa kas
      const totalKas = kasData.reduce((total, item) => total + Number(item.jumlah), 0);
      const totalKeluar = pengeluaranData.reduce((total, item) => total + Number(item.jumlah), 0);
      const sisaUangKas = totalKas - totalKeluar;
      document.getElementById("sisaKas").textContent = `Rp ${sisaUangKas.toLocaleString()}`;