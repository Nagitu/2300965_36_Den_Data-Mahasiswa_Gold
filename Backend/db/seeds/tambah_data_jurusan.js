/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('jurusan').del()
  await knex('jurusan').insert([
    { id: "653a8801-88a8-430d-a37d-284a57e714e5", jurusan: 'Teknik Geologi' },
    { id: "6766b511-f401-4b1c-ad27-2846523fe15f", jurusan: 'Teknik Informatika' },
    { id: "b2db6acc-3ddb-4fd1-8ad6-c5c71a228ec2", jurusan: 'Teknik Elektro' },
    { id: "ff211004-072c-420d-aa76-18350f824cfd", jurusan: 'Teknik Sipil' },
    { id: "668f2f7d-7ff1-4883-9439-5c3e2c4f396f", jurusan: 'Teknik Industri' },
  ]);
};
