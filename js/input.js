// Daftar nama siswa disimpan dalam array
  const siswaList = [
    "ACENG WILDAN LAKSANA", "AFGHAN GENOVA SUDRAJAT", "AGIS RAMADANI",
    "ALIF DENIS HERDIANTO", "ALIN JULIANI", "AULIA MARDIANA PUTRI",
    "AULIA RAMADANI", "AYU NURAENI", "BAMBANG KAMAJAYA SURY SAPUTRA DININGRAT",
    "CHARISTA CAMELIA", "DELISA YULIANTI", "DEUIS SITI MUNIFAH",
    "DINAR RESKI FAUZI", "FADLIANSYAH RIZKI", "FAKIH SABIKUL HOER",
    "HAMDAN", "IKHSAN MULIA APRIANA", "IMELDA NURCAHYANI",
    "KURNIA", "MAHESWARI RIHADATUL AIS", "MOCHAMAD AL FAREL DWI SEPTIAN",
    "NABIL ALPATH ABDUL ROZAK", "NAZWA FITRIYANI", "NINDY HENDRYANTY",
    "PUJI MAHARANI", "RAFKA JULIAN PRATAMA", "RARA NURUL FADHILAH",
    "RESTI AWALIA", "SAEPUL ANWAR", "SAFFIYA QOISARO RUSTENDI",
    "SITI FARIDAH", "SITI NURWAHIDAH", "SYADRAH TITIK QODAR",
    "TIRTA IBNU WIBOWO", "YUNISHA RAMADHANI", "ZEINA VANKA AZZAHRA"
  ];

  // Ambil elemen-elemen dari DOM
  const selectNama = document.getElementById("nama");
  const formKas = document.getElementById("formKas");
  const inputJumlah = document.getElementById("jumlah");
  const notifikasi = document.getElementById("notifikasi");

  // Isi dropdown dengan nama-nama siswa
  siswaList.forEach(nama => {
    const option = document.createElement("option");
    option.value = nama;            // Nilai yang akan disimpan
    option.textContent = nama;      // Teks yang ditampilkan
    selectNama.appendChild(option); // Tambahkan ke elemen select
  });

  // Tambahkan event saat form dikirim
  formKas.addEventListener("submit", function(e) {
    e.preventDefault(); // Mencegah form reload halaman

    const nama = selectNama.value;               // Ambil nama dari dropdown
    const jumlah = parseInt(inputJumlah.value);  // Ambil jumlah bayar dan ubah ke integer

    // Validasi: Jumlah harus lebih dari 0
    if (jumlah < 1) {
      alert("Jumlah bayar harus lebih dari 0");
      return;
    }

    const tanggal = new Date().toISOString(); // Ambil tanggal saat ini (format ISO)

    // Ambil data kas dari localStorage (jika ada), kalau tidak, gunakan array kosong
    const kasData = JSON.parse(localStorage.getItem("kasData")) || [];

    // Tambahkan data baru ke array kas
    kasData.push({ nama, jumlah, tanggal });

    // Simpan kembali data ke localStorage dalam bentuk JSON string
    localStorage.setItem("kasData", JSON.stringify(kasData));

    // Tampilkan notifikasi bahwa data berhasil disimpan
    notifikasi.textContent = "Data kas berhasil disimpan!";
    notifikasi.classList.remove("d-none");

    // Reset form setelah submit
    formKas.reset();

    // Sembunyikan notifikasi setelah 2.5 detik
    setTimeout(() => {
      notifikasi.classList.add("d-none");
    }, 2500);
  });