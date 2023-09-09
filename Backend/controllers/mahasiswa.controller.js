const mahasiswamodel = require('../models/mahasiswa.model')
const express = require('express');
const { v4: uuidv4 } = require('uuid');

class mahasiswa {
    async getAllmahasiswa(_, res) {
        try {
            const datamahasiswa = await mahasiswamodel.getAllmahasiswa()
            res.status(200).json({ data: datamahasiswa })
        }
        catch (error) {
            res.json({ message: error })
        }
    }
    async getmahasiswajurusan(_, res) {
        try {
            const datamahasiswa = await mahasiswamodel.getmahasiswaJurusan()
            res.status(200).json({ data: datamahasiswa })
            console.log(datamahasiswa);
        }
        catch (error) {
            res.json({ message: error })
        }
    }

    async getmahasiswaById(req, res) {
        try {
            const id = req.params['id']
            const datamahasiswa = await mahasiswamodel.getmahasiswaById(id)
            if (datamahasiswa == 0) {
                return res.json({ message: "data tidak ada" })
            }
            res.status(400).json({ data: datamahasiswa })
        }
        catch (error) {
            res.json({ data: error })
        }
    }

    async getmahasiswaByParams(req, res) {
        try {
            const data = req.params['params']
            const datamahasiswa = await mahasiswamodel.getmahasiswaParams(data)
            if (datamahasiswa == 0) {
                return res.json({ message: "data tidak ada" })
            }
            res.status(400).json({ data: datamahasiswa })
        }
        catch (error) {
            res.json({ data: error })
        }
    }

    async deletemahasiswa(req, res) {
        try {
            const id = req.params['id'];
            const dataLink = await mahasiswamodel.getmahasiswaById(id)

            if (dataLink == 0) {
                return res.json({ message: 'Link yang dimaksud tidak ada' });
            }

            const deletedID = await mahasiswamodel.deleteByID(id)

            if (deletedID === 0) {
                return res.status(400).json({ message: "Tidak ada data pengguna yang berhasil dihapus", data: deletedID });
            }

            res.status(200).json({ message: "Data pengguna berhasil dihapus" });
        } catch (error) {
            res.status(500).json({ message: 'Terjadi kesalahan saat menghapus data', data: error });
        }
    }


    async addmahasiswa(req, res) {
        try {
            const {full_name,alamat,id_jurusan } = req.body || nulll
            const id = uuidv4()
            const dataLink = await mahasiswamodel.addmahasiswa(id, full_name, alamat,id_jurusan)
            res.json({ message: 'data berhasil ditambah', data: dataLink })
        }
        catch (error) {
            res.json({ message: error })
        }
    }

    async editmahasiswa(req, res) {
        try {
            const id = req.params.id
            const datamahasiswa= await mahasiswamodel.getmahasiswaById(id)
            if (datamahasiswa== 0) {
                return res.json({ message: 'Link yang dimaksud tidak ada' });
            }
            const { name, alamat,jurusan } = req.body || datamahasiswa
            const editData = await mahasiswamodel.editmahasiswa(id,name, alamat, jurusan)
            if (editData === 0) {
                return res.status(400).json({ message: "Tidak ada data mahasiswa yang berhasil diubah", data: editData });
            }
            res.status(200).json({ message: "Data mahasiswa berhasil diubah", data: editData });

        }
        catch (error) {
            res.status(500).json({ message: 'Terjadi kesalahan saat mengubah data', data: error });
        }
    }
}

module.exports = mahasiswa