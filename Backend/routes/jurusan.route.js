const express = require('express');
const router = express.Router();
const jurusan = require ('../controllers/jurusan.controller')


const Jurusan = new jurusan()
router.get('/all', Jurusan.semuajurusan);
router.get('/:id', Jurusan.ambiljurusanId)
router.delete('/delete/:id', Jurusan.deletejurusan)
router.post('/add', Jurusan.tambahjurusan )
router.patch('/edit/:id', Jurusan.editjurusan)


module.exports = router;