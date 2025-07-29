// Event listener untuk saat formulir dikirim
    document.getElementById("registerForm").addEventListener("submit", function (e) {
      e.preventDefault(); // Mencegah reload halaman saat form disubmit

      // Mengambil nilai dari input form
      const nama = document.getElementById("nama").value;
      const telepon = document.getElementById("telepon").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Mengambil data akun yang sudah ada dari localStorage
      const akunLama = JSON.parse(localStorage.getItem("akun")) || [];

      // Cek apakah email sudah pernah digunakan sebelumnya
      const sudahAda = akunLama.find((user) => user.email === email);

      if (sudahAda) {
        alert("Email sudah digunakan. Silakan gunakan email lain.");
        return; // Hentikan proses jika email sudah terdaftar
      }

      // Jika email belum dipakai, simpan data akun baru ke dalam array akun
      akunLama.push({ nama, telepon, email, password });

      // Simpan kembali data akun ke localStorage
      localStorage.setItem("akun", JSON.stringify(akunLama));

      // Simpan nama dan telepon ke localStorage untuk keperluan halaman profil
      localStorage.setItem("profilNama", nama);
      localStorage.setItem("profilTelepon", telepon);

      alert("Akun berhasil dibuat."); // Tampilkan notifikasi

      // Redirect langsung ke halaman login 
      window.location.href = "login.html";
    });