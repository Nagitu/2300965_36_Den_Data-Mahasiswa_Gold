const express = require('express');
const app = express();
const mahasiswaRoute = require('./routes/mahasiswa.route');
const jurusanRoute = require('./routes/jurusan.route')
const cors = require('cors');
const path = require('path'); // Impor modul path
const jurusanModel = require('./models/jurusan.model');
const router = express.Router();

app.use(cors())
app.use(express.json());

// Middleware untuk mengurai data url-encoded
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // Menggunakan EJS sebagai template engine
// app.use(express.static(__dirname + '/public')); // Jika ada aset statis (CSS, JS, dll.)

app.get('/jurusan', async (req, res) => {
  try {
      const dataJurusan = await jurusanModel.ambilSemuaJurusan();
      console.log(dataJurusan);
      res.render('jurusan', { data: dataJurusan });
  } catch (error) {
      res.json({ message: error });
  }
});

app.use(express.json());
app.use('/api/v1/mahasiswa', mahasiswaRoute);
app.use('/api/v1/jurusan', jurusanRoute);


app.listen(4000, () => {
  console.log(`server running on http://localhost:4000`);
});
