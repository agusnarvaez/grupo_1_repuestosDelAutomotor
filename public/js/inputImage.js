//Esperamos a que cargue la pantalla

let text = document.querySelector('.labelImage');
let image = document.querySelector('#image');
image.addEventListener('change', function () {

    //console.log(image.value);
    if (image.value == '') {
        text.innerHTML = 'SELECCIONE ARCHIVO <ion-icon name="cloud-upload-outline"></ion-icon>'
    } else {

        text.innerHTML = image.value.slice(12, image.value.lenth);
        //console.log(image.value.slice(12, image.value.lenth))
    }
})
/* } */