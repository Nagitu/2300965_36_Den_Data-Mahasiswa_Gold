const express = require('express');
const knex = require('knex');
const knexfile = require('../db/knexfile')
const db = knex(knexfile["development"]);


class mahasiswamodel {
    async getAllmahasiswa() {
        const datamahasiswa = await db.select('*').table('mahasiswa')
        return datamahasiswa
    }

    async getmahasiswaJurusan() {
        const allData = await db.select('mahasiswa.id','mahasiswa.full_name','mahasiswa.alamat','jurusan.jurusan').table('mahasiswa').join('jurusan', 'mahasiswa.id_jurusan', '=', 'jurusan.id')
        return allData
    }

    async getmahamahasiswaById(id) {
        const datamahasiswa = await db.select('*').table('mahasiswa').where('id', id)
        return datamahasiswa
    }

    async getmahamahasiswaParams(data) {
        const datamahasiswa = await db.select('*').table('mahasiswa')
        .where(function() {
          this.where('id', '=', searchData).orWhere('full_name', '=', searchData);
        })
    }

    async deleteByID(id) {
        const deleted = await db('mahasiswa').where('id', id).del()
        return deleted
    }

    async addmahasiswa(id, nama, alamat, jurusan) {
        const data = { id: id, full_name: nama, alamat: alamat, id_jurusan: jurusan }
        const addData = await db('mahasiswa').insert(data)
        return data;
    }

    async editmahasiswa(id, nama, alamat, jurusan) {
        const data = { id: id, full_name: nama, alamat: alamat, id_jurusan: jurusan }
        const editData = await db('mahasiswa').update(data).where('id', id)
        return data
    }
}

module.exports = new mahasiswamodel()

