// Ambil elemen-elemen HTML yang dibutuhkan
    const form = document.getElementById("formPengeluaran");
    const listPengeluaran = document.getElementById("listPengeluaran");
    const totalPengeluaranElem = document.getElementById("totalPengeluaran");
    const historyList = document.getElementById("historyList");

    // Ambil data pengeluaran dari localStorage jika ada, atau gunakan array kosong
    let pengeluaranData = JSON.parse(localStorage.getItem("pengeluaranData")) || [];

    // Fungsi untuk merender data pengeluaran ke tabel
    function renderPengeluaran() {
      listPengeluaran.innerHTML = ""; // Kosongkan isi tabel terlebih dahulu
      let total = 0;

      // Loop semua data pengeluaran
      pengeluaranData.forEach((item, idx) => {
        total += item.jumlah; // Tambahkan ke total

        // Buat baris tabel untuk setiap pengeluaran
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${item.keterangan}</td>
      <td>${new Date(item.tanggal).toLocaleDateString('id-ID')}</td>
      <td class="text-right">Rp ${item.jumlah.toLocaleString()}</td>
      <td><button class="btn-delete" data-idx="${idx}">Hapus</button></td>
    `;
        listPengeluaran.appendChild(tr); // Tambahkan ke tabel
      });

      // Tampilkan total pengeluaran di elemen yang disediakan
      totalPengeluaranElem.textContent = `Rp ${total.toLocaleString()}`;

      // Tampilkan bagian riwayat
      renderHistory();
    }

    // Fungsi untuk menampilkan 5 riwayat pengeluaran terbaru
    function renderHistory() {
      historyList.innerHTML = ""; // Bersihkan isi riwayat terlebih dahulu

      // Urutkan data dari yang terbaru berdasarkan tanggal
      const sorted = [...pengeluaranData].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
      const latestFive = sorted.slice(0, 5); // Ambil 5 data paling baru

      // Tampilkan setiap item dalam bentuk div
      latestFive.forEach(item => {
        const div = document.createElement("div");
        div.className = "history-item";
        div.innerHTML = `
      <div>${item.keterangan}</div>
      <span>${new Date(item.tanggal).toLocaleDateString('id-ID')}</span>
      <span>Rp ${item.jumlah.toLocaleString()}</span>
    `;
        historyList.appendChild(div);
      });

      // Jika tidak ada data pengeluaran
      if (pengeluaranData.length === 0) {
        historyList.innerHTML = "<p style='text-align:center; color:#777;'>Belum ada riwayat pengeluaran.</p>";
      }
    }

    // Event ketika form disubmit (tombol Tambah ditekan)
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Cegah reload halaman

      // Ambil nilai dari input
      const keterangan = document.getElementById("keterangan").value.trim();
      const jumlah = parseInt(document.getElementById("jumlah").value);
      const tanggal = document.getElementById("tanggal").value;

      // Validasi input agar tidak kosong atau salah
      if (!keterangan || !jumlah || isNaN(jumlah) || !tanggal) {
        alert("Semua field harus diisi dengan benar.");
        return;
      }

      // Tambahkan data baru ke array
      pengeluaranData.push({ keterangan, jumlah, tanggal });

      // Simpan data ke localStorage dalam bentuk JSON string
      localStorage.setItem("pengeluaranData", JSON.stringify(pengeluaranData));

      // Tampilkan kembali daftar pengeluaran terbaru
      renderPengeluaran();

      // Reset form ke keadaan kosong
      form.reset();
    });

    // Event saat tombol hapus diklik
    listPengeluaran.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-delete")) {
        const idx = e.target.dataset.idx; // Ambil index dari data yang akan dihapus
        if (confirm("Yakin ingin menghapus data ini?")) {
          pengeluaranData.splice(idx, 1); // Hapus dari array
          localStorage.setItem("pengeluaranData", JSON.stringify(pengeluaranData)); // Simpan ulang
          renderPengeluaran(); // Render ulang tabel
        }
      }
    });

    // Render data saat pertama kali halaman dibuka
    renderPengeluaran();