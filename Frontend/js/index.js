



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

function deleteJurusan(id){
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };
      
      fetch(`http://localhost:4000/api/v1/jurusan/delete/${id}`, requestOptions)
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
        const editButtons = document.querySelectorAll('.edit-btn');
        const deleteButtons = document.querySelectorAll('.delete-btn');
        editButtons.forEach(button => {
            button.addEventListener('click', function () {
                // Ambil data dari atribut data
                const id = this.getAttribute('data-id');
                const jurusan = this.getAttribute('data-jurusan');
                console.log([id,jurusan]);
                // Isi modal dengan data yang sesuai
                document.getElementById('editId').value = id;
                document.getElementById('editJurusan').value = jurusan;
            });
        });

        
        deleteButtons.forEach(button => {
            button.addEventListener('click', async function () {
                // Ambil ID data yang akan dihapus
                const id = this.getAttribute('data-id');
                console.log(id);
                deleteJurusan(id)
                location.reload()
            });
        });


        document.getElementById("simpanPerubahan").addEventListener("click", function () {
            const nama = document.getElementById("nama").value;
            addJurusan(nama)
            console.log("Nama:", nama);
            // Tutup modal
            $('#tambahDataModal').modal('hide');
            location.reload();
        });
    } catch (error) {
        console.error('Error:', error);
    }

}

// Panggil fetchData saat halaman dimuat
window.addEventListener('load', fetchData);

