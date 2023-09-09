
const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
});

// Fungsi untuk menampilkan toast sukses
async function showSuccessToast() {
    await Toast.fire({
        icon: 'success',
        title: 'Success'
    });
}

module.exports = {
    showSuccessToast 
};
