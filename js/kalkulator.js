// Fungsi yang akan dijalankan ketika tombol "Hitung Total Kas" diklik
    function hitungKas() {
      // Ambil nilai jumlah siswa dari input, konversi ke integer, default 0 jika kosong
      const siswa = parseInt(document.getElementById('jumlahSiswa').value) || 0;

      // Ambil nilai kas per siswa dari input, konversi ke integer, default 0 jika kosong
      const kas = parseInt(document.getElementById('kasPerSiswa').value) || 0;

      // Hitung total kas dengan mengalikan jumlah siswa dan kas per siswa
      const total = siswa * kas;

      // Tampilkan hasil ke elemen dengan id 'hasilKas', dengan format angka lokal (pakai titik)
      document.getElementById('hasilKas').innerText = `Rp ${total.toLocaleString()}`;
    }