// Fungsi untuk menampilkan alert
function showAlert(icon, message) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
  });

  Toast.fire({
    icon: icon,
    title: message
  });
}

// Fungsi untuk mengisi dropdown jurusan
async function populateKelasDropdown() {
  try {
    const url = 'http://localhost:4000/api/v1/jurusan/all';
    const headers = {
      'Content-Type': 'application/json'
    };

    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const resp = await response.json();
    const data = resp.data;
    const jurusanSelect = document.getElementById("jurusan");

    // Kosongkan opsi sebelum menambahkan yang baru
    jurusanSelect.innerHTML = "";

    // Tambahkan opsi ke dropdown
    data.forEach(item => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = item.jurusan;
      jurusanSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

// Fungsi untuk menambahkan data mahasiswa
function addMahasiswa(nama, alamat, jurusan) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "full_name": nama,
    "alamat": alamat,
    "id_jurusan": jurusan
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://localhost:4000/api/v1/mahasiswa/add", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      showAlert('success', 'Data berhasil ditambahkan');
      location.reload();
    })
    .catch(error => console.log('error', error));
}

// Fungsi untuk menghapus data mahasiswa
function deleteMahasiswa(id) {
  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };

  fetch(`http://localhost:4000/api/v1/mahasiswa/delete/${id}`, requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      showAlert('success', 'Data berhasil dihapus');
      // location.reload();
    })
    .catch(error => console.log('error', error));
}

function editmahasiswa(id, nama, alamat, jurusan) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "full_name": nama,
    "alamat": alamat,
    "jurusan": jurusan
  });

  var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(`http://localhost:4000/api/v1/mahasiswa/edit/${id}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
// Fungsi untuk mengambil data dari API
async function fetchData() {
  try {
    const url = 'http://localhost:4000/api/v1/mahasiswa/jurusan';
    const headers = {
      'Content-Type': 'application/json'
    };

    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    const data = result.data;

    console.log(data);
    const table = new simpleDatatables.DataTable("#datamahasiswa", {
      data: {
        headings: ["ID", "Nama", "Alamat", "Jurusan", "Action"],
        data: data.map(item => [
          item.id,
          item.full_name,
          item.alamat,
          item.jurusan,
          `
            <button class="btn btn-primary btn-sm edit-btn" data-id="${item.id}" data-nama="${item.full_name}" data-alamat="${item.alamat}"data-jurusan="${item.jurusan}" data-toggle="modal" data-target="#editDataModal">Edit</button>
            <button class="btn btn-danger btn-sm delete-btn" data-id="${item.id}">Delete</button>
            `
        ])
      }
    });

    // Inisialisasi variabel untuk tombol edit
    // Inisialisasi variabel untuk tombol edit
    const editButtons = document.querySelectorAll('.edit-btn');
    // Inisialisasi variabel untuk tombol delete
    const deleteButtons = document.querySelectorAll('.delete-btn');

    // Dropdown jurusan di dalam modal
    const editJurusanDropdown = document.getElementById('editJurusan');

    // Fungsi untuk mengisi dropdown jurusan dengan data dari fetch
    async function populateJurusanDropdown() {
      try {
        const url = 'http://localhost:4000/api/v1/jurusan/all';
        const headers = {
          'Content-Type': 'application/json'
        };

        const response = await fetch(url, {
          method: 'GET',
          headers: headers
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const resp = await response.json();
        const data = resp.data;

        // Bersihkan dropdown terlebih dahulu
        editJurusanDropdown.innerHTML = '';

        // Tambahkan opsi ke dropdown
        data.forEach((item) => {
          const option = document.createElement('option');
          option.value = item.id;
          option.textContent = item.jurusan;
          editJurusanDropdown.appendChild(option);
        });
      } catch (error) {
        console.error('Error:', error);
      }
    }

    // Panggil fungsi untuk mengisi dropdown jurusan saat halaman dimuat
    // Fungsi untuk mengisi modal edit dengan data yang dikirim dari tombol "Edit" yang diklik
    function fillEditModal(id, nama, alamat, jurusan) {
      // Isi modal dengan data yang sesuai
      document.getElementById('editId').value = id;
      document.getElementById('editNama').value = nama;
      document.getElementById('editAlamat').value = alamat;

      // Panggil fungsi untuk mengisi dropdown jurusan di dalam modal dengan opsi yang sesuai
      populateJurusanDropdown().then(() => {
        // Set nilai dropdown jurusan sesuai dengan data yang dikirim
        document.getElementById('editJurusan').value = jurusan;
      });
    }

    // Event listener untuk saat tombol "Edit" diklik
    editButtons.forEach(button => {
      button.addEventListener('click', function () {
        // Ambil data dari atribut data
         const id = this.getAttribute('data-id');
        const nama = this.getAttribute('data-nama');
        const alamat = this.getAttribute('data-alamat');
        const jurusan = this.getAttribute('data-jurusan');
        console.log(id);

        // Simulasikan pengambilan data jurusan dari sumber daya Anda (misalnya, array jurusan)
        const jurusanOptions = ['Jurusan A', 'Jurusan B', 'Jurusan C'];

        // Isi dropdown jurusan di dalam modal dengan opsi yang sesuai
        populateJurusanDropdown(jurusanOptions);

        // Isi modal dengan data yang sesuai
        document.getElementById('editId').value = id;
        document.getElementById('editNama').value = nama;
        document.getElementById('editAlamat').value = alamat;
        document.getElementById('editJurusan').value = jurusan;
      });
    });

    // Logika saat tombol delete ditekan
    deleteButtons.forEach(button => {
      button.addEventListener('click', async function () {
        // Mengambil ID data yang akan dihapus
        const id = this.getAttribute('data-id');

        // Tampilkan modal konfirmasi dengan SweetAlert2
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
          title: 'Apakah kamu yakin?',
          text: "Kamu tidak dapat mengembalikan data ini",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Ya, Hapus saja!',
          cancelButtonText: 'Batalkan',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            // Jika pengguna mengonfirmasi, panggil fungsi deleteMahasiswa
            deleteMahasiswa(id);
            console.log(id);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Your imaginary file is safe :)',
              'error'
            );
          }
        });
      });
    });

    document.getElementById("simpanData").addEventListener("click", function () {
      const nama = document.getElementById("nama").value;
      const alamat = document.getElementById("alamat").value;
      const jurusan = document.getElementById("jurusan").value;

      addMahasiswa(nama, alamat, jurusan);
      console.log(nama, alamat, jurusan);
    });

    // Panggil populateKelasDropdown saat modal tambah data dimuat
    populateKelasDropdown();
    // Event listener untuk saat tombol "Save Changes" di modal edit ditekan
    document.getElementById('saveEdit').addEventListener('click', async () => {
      try {
        // Ambil nilai dari formulir modal edit
        const id = document.getElementById('editId').value;
        const nama = document.getElementById('editNama').value;
        const alamat = document.getElementById('editAlamat').value;
        const jurusan = document.getElementById('editJurusan').value;

       editmahasiswa(id,nama,alamat,jurusan)
        // Tutup modal edit setelah berhasil memperbarui data
        $('#editDataModal').modal('hide');
        location.reload()
        // Lakukan hal lain yang diperlukan, seperti memperbarui tampilan tabel, jika diperlukan
        // ...

        // Tampilkan pesan sukses atau sejenisnya
        alert('Data berhasil diperbarui');
      } catch (error) {
        console.error('Error:', error);
        // Tampilkan pesan kesalahan atau sejenisnya jika diperlukan
        alert('Terjadi kesalahan saat memperbarui data');
      }
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

// Panggil fetchData saat halaman dimuat
window.addEventListener('load', fetchData);
