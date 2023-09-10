# Sistem Pendataan Mahasiswa

Selamat datang di sistem pendataan mahasiswa sederhana ini! Projek ini menggunakan bahasa pemrograman JavaScript dan library Express.js sebagai backend, serta HTML dan CSS natif untuk frontend-nya.

## Langkah-langkah Menjalankan Projek

Berikut adalah langkah-langkah yang harus Anda lakukan untuk menjalankan sistem ini:

1. Pastikan semua ekstensi yang diperlukan terpasang dengan menjalankan perintah berikut di terminal:

npm install


2. Masuk ke dalam folder backend dengan perintah:

cd ./backend


3. Lakukan migration database dengan perintah berikut untuk menginisialisasi tabel jurusan dan tabel mahasiswa:

npx knex migrate:latest


Ini akan menjalankan dua migration, yaitu migration pertama untuk tabel jurusan dan migration kedua untuk tabel mahasiswa.

4. Setelah itu, jalankan seed untuk mengisi data awal ke dalam tabel yang sudah dibuat:

npx knex seed:run


5. Konfigurasi koneksi database dapat ditemukan di `./backend/db/knexfile.js`. Koneksi ini menggunakan PostgreSQL dengan detail berikut:

postgres://postgres:root@localhost:5432/mahasiswa


Pastikan PostgreSQL sudah terpasang dan berjalan di komputer Anda.

6. Untuk menjalankan server, buka terminal di dalam folder backend dan ketik perintah berikut:

npm run dev


Pastikan Anda berada di dalam folder backend saat menjalankan perintah ini.

7. Tampilan frontend dapat ditemukan di folder `./frontend/view`. Anda dapat menjalankannya menggunakan live server atau server web lainnya.

8. Untuk dokumentasi API, Anda dapat melihat dokumentasi Postman di bawah ini:

[Dokumentasi API Postman](link-ke-dokumentasi-api-postman)

## Terima kasih telah menggunakan sistem pendataan mahasiswa kami!
