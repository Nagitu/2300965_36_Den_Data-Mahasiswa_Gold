//fungsi untuk menampilkan alert 
function alert(icon, data) {
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
    })
    Toast.fire({
        icon: icon,
        title: data
    })
}
function addJurusan(nama) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "jurusan": nama
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch("http://localhost:4000/api/v1/jurusan/add", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

function deleteJurusan(id) {
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

    fetch(`http://localhost:4000/api/v1/jurusan/delete/${id}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

function EditJurusan(id,nama) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "jurusan": nama
    });
    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch(`http://localhost:4000/api/v1/jurusan/edit/${id}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}


async function fetchData() {
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

        const result = await response.json();
        const data = result.data
        console.log(data);
        const table = new simpleDatatables.DataTable("#datatablesSimple", {
            data: {
                headings: ["ID", "Jurusan", "Action"],
                data: data.map(item => [item.id, item.jurusan, `
                <button class="btn btn-primary btn-sm edit-btn" data-id="${item.id}" data-jurusan="${item.jurusan}" data-toggle="modal" data-target="#editDataModal"">Edit</button>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${item.id}">Delete</button>
            `])
            }
        });
        // inisialisai vairabel untuk tombol edit 
        const editButtons = document.querySelectorAll('.edit-btn');
        // inisialisai vairabel untuk tombol delete
        const deleteButtons = document.querySelectorAll('.delete-btn');

        //untuk memunculkan data ke dalam modal edit
        editButtons.forEach(button => {
            button.addEventListener('click', function () {
                // Ambil data dari atribut data
                const id = this.getAttribute('data-id');
                const jurusan = this.getAttribute('data-jurusan');
                console.log([id, jurusan]);
                // Isi modal dengan data yang sesuai
                document.getElementById('editId').value = id;
                document.getElementById('editJurusan').value = jurusan;
            });
        });

        //logika saat tombol delete ditekan
        deleteButtons.forEach(button => {
            button.addEventListener('click', async function () {
                // mengambil ID data yang akan dihapus
                const id = this.getAttribute('data-id');
        
                // Tampilkan modal konfirmasi dengan SweetAlert2
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                });
        
                try {
                    const result = await swalWithBootstrapButtons.fire({
                        title: 'Apakah kamu Yakin ?',
                        text: "Kamu Tidak Dapat Mengembalikan Data ini",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Ya, Hapus Saja !',
                        cancelButtonText: 'Batalkan',
                        reverseButtons: true
                    });
        
                    if (result.isConfirmed) {
                        // Panggil fungsi deleteJurusan
                        await deleteJurusan(id);
        
                        // Muat ulang halaman
                        await location.reload();
                        // Tampilkan alert setelah penghapusan berhasil
                        await alert('success', 'Data berhasil Dihapus');
        
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire(
                            'Cancelled',
                            'Your imaginary file is safe :)',
                            'error'
                        );
                    }
                } catch (error) {
                    console.error(error);
                }
            });
        });
        
        

        document.getElementById("simpanData").addEventListener("click", function () {
            const nama = document.getElementById("nama").value;
            addJurusan(nama)
            console.log("Nama:", nama);
            // Tutup modal
            $('#tambahDataModal').modal('hide');
            location.reload();
        });

        document.getElementById("simpanPerubahan").addEventListener("click", function () {
            
            const id = document.getElementById('editId').value
            const nama = document.getElementById('editJurusan').value
            EditJurusan(id,nama)
            console.log([id,nama]);
            //Tutup modal
            $('#tambahDataModal').modal('hide');
            alert('success','Data Berhasil Dirubah')
            location.reload();
        });
    } catch (error) {
        console.error('Error:', error);
    }

}

// Panggil fetchData saat halaman dimuat
window.addEventListener('load', fetchData);

