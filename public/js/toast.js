const showToast = function(){
    const myToast = document.querySelector('.toast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(myToast)
    return toastBootstrap.show()
}