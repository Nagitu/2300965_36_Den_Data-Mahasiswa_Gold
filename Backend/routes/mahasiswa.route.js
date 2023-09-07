const express = require('express');
const mahasiswa = require('../controllers/mahasiswa.controller');
const router = express.Router();



const mahaSiswa = new mahasiswa()
router.get('/all', mahaSiswa.getAllmahasiswa);
router.get('/jurusan', mahaSiswa.getmahasiswajurusan)
router.get('/:id', mahaSiswa.getmahasiswaById)
router.get('/:params', mahaSiswa.getmahasiswaByParams)
router.delete('/delete/:id', mahaSiswa.deletemahasiswa)
router.post('/add', mahaSiswa.addmahasiswa )
router.patch('/edit/:id', mahaSiswa.editmahasiswa)


module.exports = router;