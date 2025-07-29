 // Daftar nama siswa
    const siswaList = [
      "ACENG WILDAN LAKSANA", "AFGHAN GENOVA SUDRAJAT", "AGIS RAMADANI",
      "ALIF DENIS HERDIANTO", "ALIN JULIANI", "AULIA MARDIANA PUTRI",
      "AULIA RAMADANI", "AYU NURAENI", "BAMBANG KAMAJAYA SURYa",
      "CHARISTA CAMELIA", "DELISA YULIANTI", "DEUIS SITI MUNIFAH",
      "DINAR RESKI FAUZI", "FADLIANSYAH RIZKI", "FAKIH SABIKUL HOER",
      "HAMDAN", "IKHSAN MULIA APRIANA", "IMELDA NURCAHYANI",
      "KURNIA", "MAHESWARI RIHADATUL AIS", "MOCHAMAD AL FAREL DWI SEPTIAN",
      "NABIL ALPATH ABDUL ROZAI", "NAZWA FITRIYANI", "NINDY HENDRYANTY",
      "PUJI MAHARANI", "RAFKA JULIAN PRATAMA", "RARA NURUL FADHILAH",
      "RESTI AWALIA", "SAEPUL ANWAR", "SAFFIYA QOISARO RUSTENDI",
      "SITI FARIDAH", "SITI NURWAHIDAH", "SYADRAH TITIK QADAR",
      "TIRTA IBNU WIBOWO", "YUNISHA RAMADHANI", "ZEINA VANKA AZZAHRA"
    ];

    // Urutkan nama siswa alfabetis
    siswaList.sort();

    // Ambil data kas dari localStorage
    const kasData = JSON.parse(localStorage.getItem("kasData")) || [];

    // Fungsi untuk mengecek apakah tanggal ada dalam minggu ini
    function isThisWeek(dateStr) {
      const date = new Date(dateStr);
      const now = new Date();
      const start = new Date(now);
      start.setDate(now.getDate() - now.getDay());
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);
      return date >= start && date <= end;
    }

    // Tampilkan data siswa ke tabel
    const tableBody = document.getElementById("siswaTable");
    const totalKasEl = document.getElementById("totalKas");
    let totalKas = 0;

    siswaList.forEach((nama, i) => {
      // Hitung total pembayaran minggu ini
      const totalBayar = kasData
        .filter(d => d.nama === nama && isThisWeek(d.tanggal))
        .reduce((sum, d) => sum + d.jumlah, 0);

      totalKas += totalBayar;

      const status = totalBayar >= 2000 ? "Lunas" : "Belum Lunas";
      const statusClass = totalBayar >= 2000 ? "status-lunas" : "status-belum";

      // Tambahkan baris ke tabel
      const row = document.createElement("tr");
      row.innerHTML = `
        <td data-label="No">${i + 1}</td>
        <td class="text-start" data-label="Nama">${nama}</td>
        <td data-label="Kelas">X RPL 1</td>
        <td data-label="Status Kas" class="${statusClass}">${status}</td>
        <td data-label="Total Bayar">Rp ${totalBayar.toLocaleString()}</td>
      `;
      tableBody.appendChild(row);
    });

    // Tampilkan total kas
    totalKasEl.textContent = `Total Kas Minggu Ini: Rp ${totalKas.toLocaleString()}`;

    // Fungsi reset kas minggu ini
    document.getElementById("resetKas").addEventListener("click", () => {
      if (confirm("Apakah kamu yakin ingin mereset data kas minggu ini?")) {
        const now = new Date();
        const start = new Date(now);
        start.setDate(now.getDate() - now.getDay());
        start.setHours(0, 0, 0, 0);
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        end.setHours(23, 59, 59, 999);

        // Simpan hanya data kas di luar minggu ini
        const kasDataLama = JSON.parse(localStorage.getItem("kasData")) || [];
        const kasDataBaru = kasDataLama.filter(entry => {
          const tgl = new Date(entry.tanggal);
          return tgl < start || tgl > end;
        });

        localStorage.setItem("kasData", JSON.stringify(kasDataBaru));
        alert("Data kas minggu ini telah direset.");
        location.reload();
      }
    });

    // Fungsi pencarian nama
    document.getElementById("searchInput").addEventListener("input", function () {
      const keyword = this.value.toLowerCase();
      const rows = document.querySelectorAll("#siswaTable tr");
      rows.forEach(row => {
        const nama = row.children[1].textContent.toLowerCase();
        row.style.display = nama.includes(keyword) ? "" : "none";
      });
    });