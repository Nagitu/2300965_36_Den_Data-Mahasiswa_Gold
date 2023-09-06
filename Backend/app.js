const express = require('express');
const app = express();
// const siswaRoute = require('../routes/siswa.route');
const jurusanRoute = require('./routes/jurusan.route')
const cors = require('cors');

app.use(cors())
app.use(express.json());

// Middleware untuk mengurai data url-encoded
app.use(express.urlencoded({ extended: true }));



app.use(express.json());
// app.use('/api/v1/siswa', siswaRoute);
app.use('/api/v1/jurusan', jurusanRoute);




app.listen(4000, () => {
  console.log(`server running on http://localhost:4000`);
});
