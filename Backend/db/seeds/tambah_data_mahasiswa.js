/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('mahasiswa').del()
  await knex('mahasiswa').insert([
    { id: "5f0a9a1e-7d74-461d-a71f-8f1f8f1d1cab" ,full_name: 'deni' ,alamat : 'purwokerto',id_jurusan:"b2db6acc-3ddb-4fd1-8ad6-c5c71a228ec2"},
    { id: "8cdfd0b8-4273-4002-8c80-8cea99befa46" ,full_name: 'adit' ,alamat : 'jakarta',id_jurusan:"b2db6acc-3ddb-4fd1-8ad6-c5c71a228ec2"},
    { id: "937df899-f0a0-4ed0-9b9f-72f7a30d8d0c" ,full_name: 'nur' ,alamat : 'bandung',id_jurusan:"ff211004-072c-420d-aa76-18350f824cfd"},
    { id: "9026f2e6-9913-4597-b20e-8220524cdd3b" ,full_name: 'budi' ,alamat : 'semarang',id_jurusan:"ff211004-072c-420d-aa76-18350f824cfd"},
    { id: "9ae5ee76-c3a6-4408-b410-5afd22b73604" ,full_name: 'angel' ,alamat : 'semarang',id_jurusan:"653a8801-88a8-430d-a37d-284a57e714e5"},
    { id: "d9239e40-de58-4100-bf78-c0587226ece3" ,full_name: 'calista' ,alamat : 'surabaya',id_jurusan:"653a8801-88a8-430d-a37d-284a57e714e5"},
    { id: "977f75fc-26f1-4d5d-b0dc-b6aad7fb5914" ,full_name: 'aziz' ,alamat : 'bandung',id_jurusan:"6766b511-f401-4b1c-ad27-2846523fe15f"},
    { id: "5af9c9a8-d05c-4997-912e-3ad7b78626e4" ,full_name: 'avan' ,alamat : 'jakarta',id_jurusan:"6766b511-f401-4b1c-ad27-2846523fe15f"},
    { id: "56abd28f-05b7-4bf7-a242-e3cd97bb5e29" ,full_name: 'dewi' ,alamat : 'surabaya',id_jurusan:"668f2f7d-7ff1-4883-9439-5c3e2c4f396f"},
    { id: "025db1c4-0fc9-4fc2-bf8d-db6746f3bcfa" ,full_name: 'dewa' ,alamat : 'purwokerto',id_jurusan:"668f2f7d-7ff1-4883-9439-5c3e2c4f396f"},
  ]);
};


















