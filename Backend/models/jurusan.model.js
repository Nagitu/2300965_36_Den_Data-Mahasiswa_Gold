const express = require('express');
const knex = require('knex');
const knexfile = require('../db/knexfile')
const db = knex(knexfile["development"]);


class jurusanModel {
    async ambilSemuaJurusan() {
        const datajurusan = await db.select('*').table('jurusan')
        return datajurusan
    }
    
    async getjurusanById(id){
        const datajurusan = await db.select('*').table('jurusan').where('id',id)
        return datajurusan
    }

    async deleteByID(id) {
        const deleted = await db('jurusan').where('id', id).del()
        return deleted
    }

    async addjurusan(id,jurusan) {
        const data = { id:id ,jurusan:jurusan }
        const addData = await db('jurusan').insert(data)
        return data;
    }

    async editSiswa(id,jurusan){
        const data = { id:id ,jurusan:jurusan }
        const editData = await db('jurusan').update(data).where('id',id)
        return data
    }
}

module.exports =  new jurusanModel()

