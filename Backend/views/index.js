document.addEventListener('DOMContentLoaded', () => {
    // Fetch data dari server
    fetch('/api/data') // Ganti URL dengan endpoint yang sesuai
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.data)) { // Periksa apakah data.result adalah array
          const dataArray = data.data; // Mengakses array data dari objek
  
          const tbody = document.querySelector('#datatablesSimple tbody');
          tbody.innerHTML = ''; // Mengosongkan tabel sebelum menambahkan data
  
          dataArray.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${item.id}</td>
              <td>${item.jurusan}</td>
              <td>
                <button class="btn btn-warning btn-sm" data-toggle="modal" data-target="#editDataModal" data-id="${item.id}" data-jurusan="${item.jurusan}">Edit</button>
                <button class="btn btn-danger btn-sm">Hapus</button>
              </td>
            `;
            tbody.appendChild(row);
          });
        } else {
          console.error('Data.result is not an array:', data);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
  