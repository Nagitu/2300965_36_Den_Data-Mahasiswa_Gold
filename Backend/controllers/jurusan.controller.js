const jurusanmodel = require('../models/jurusan.model')
const express = require('express');
const { v4: uuidv4 } = require('uuid');

class jurusan {
    async semuajurusan(_, res) {
        try {
            const datajurusan = await jurusanmodel.ambilSemuaJurusan()
            res.status(200).json({ data: datajurusan })
        }
        catch (error) {
            res.json({ message: error })
        }
    }
    async ambiljurusanId(req, res) {
        try {
            const id = req.params['id']
            const datajurusan = await jurusanmodel.getjurusanById(id)
            if (datajurusan == 0) {
                return res.json({ message: "data tidak ada" })
            }
            res.status(200).json({ data: datajurusan })
            console.log(id);
        }
        catch (error) {
            res.json({ data: error })
        }
    }

    async deletejurusan(req, res) {
        try {
            const id = req.params['id'];
            const datajurusan= await jurusanmodel.getjurusanById(id)

            if (datajurusan == 0) {
                return res.json({ message: 'jurusan yang dimaksud tidak ada' });
            }

            const deletedID = await jurusanmodel.deleteByID(id)

            if (deletedID === 0) {
                return res.status(400).json({ message: "Tidak ada data jurusan yang berhasil dihapus", data: deletedID });
            }

            res.status(200).json({ message: "jurusan berhasil dihapus" });
        } catch (error) {
            res.status(500).json({ message: 'Terjadi kesalahan saat menghapus data', data: error });
        }
    }


    async tambahjurusan(req, res) {
        try {
            const {jurusan } = req.body
            if(!jurusan) res.json({message: "masukan nama jurusan terlebih dahulu"})
            const id = uuidv4()
            const datajurusan = await jurusanmodel.addjurusan(id, jurusan)
            res.json({ message: 'data berhasil ditambah', data: datajurusan })
        }
        catch (error) {
            res.json({ message: error })
        }
    }

    async editjurusan(req, res) {
        try {
            const id = req.params.id
            const datajurusan = await jurusanmodel.getjurusanById(id)
            if (datajurusan == 0) {
                return res.json({ message: 'jurusan yang dimaksud tidak ada' });
            }
            const { jurusan } = req.body || datajurusan.jurusan
            const editData = await jurusanmodel.editSiswa(id,jurusan)
            if (editData === 0) {
                return res.status(400).json({ message: "Tidak ada data jurusan yang berhasil diubah", data: editData });
            }
            res.status(200).json({ message: "Data jurusan berhasil diubah", data: editData });
        }
        catch (error) {
            res.status(500).json({ message: 'Terjadi kesalahan saat mengubah data', data: error });
        }
    }
}

module.exports = jurusan