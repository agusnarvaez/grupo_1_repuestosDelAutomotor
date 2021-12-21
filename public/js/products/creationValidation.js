window.onload = function () { //Esperamos a que cargue la pantalla

    /***Captamos cada input y el form***/
    let form = document.querySelector('.form');
    let name = document.querySelector('#name');
    let description = document.querySelector('#description');
    let category = document.querySelector('#category');
    let image = document.querySelector('#image');
    let price = document.querySelector('#price');

    let check = {
        name: document.querySelector('#nameCheck'),
        description: document.querySelector('#descriptionCheck'),
        category: document.querySelector('#categoryCheck'),
        image: document.querySelector('#imageCheck'),
        price: document.querySelector('#priceCheck')
    }
    let alert = {
        name: document.querySelector('#nameAlert'),
        description: document.querySelector('#descriptionAlert'),
        category: document.querySelector('#categoryAlert'),
        image: document.querySelector('#imageAlert'),
        price: document.querySelector('#priceAlert')
    }

    name.focus();
    form.addEventListener('submit', function (e) {
        let ulErrors = document.querySelector('.errors');
        let errors = [];
        //e.preventDefault();
        //Validamos el campo nombre
        if (name.value.length < 2) {//Validamos que no esté vacío
            errors.push('Debe ingresar un nombre');
            name.classList.add('is-invalid');
            check.name.classList.add('hidden');
            alert.name.classList.remove('hidden');
        } else if (name.value.length < 5) { //Validamos tenga al menos 5 letras
            errors.push('Debe ingresar un nombre mayor a 5 caracteres');
            name.classList.add('is-invalid');
        } else {
            name.classList.remove('is-invalid');
            name.classList.add('is-valid');
            alert.name.classList.add('hidden');
            check.name.classList.remove('hidden');
        }

        //Validamos el campo descripción
        if (description.value.length < 1) {//Validamos que no esté vacío
            errors.push('Debe ingresar una descripción');
            description.classList.add('is-invalid');
            check.description.classList.add('hidden');
            alert.description.classList.remove('hidden');
        } else if (description.value.length < 19) {//Validamos tenga al menos 20 caracteres
            errors.push('Debe ingresar una descripción mayor a 20 caracteres');
            description.classList.add('is-invalid');
            check.description.classList.add('hidden');
            alert.description.classList.remove('hidden');
        } else {
            description.classList.remove('is-invalid');
            description.classList.add('is-valid');
            check.description.classList.remove('hidden');
            alert.description.classList.add('hidden');
        }

        //Validamos el campo código Postal
        if (category.value.length < 1) {//Validamos que no esté vacío
            check.category.classList.add('hidden');
            errors.push('Debe seleccionar una categoría');
            category.classList.add('is-invalid');
            alert.category.classList.remove('hidden');
        } else {
            category.classList.remove('is-invalid');
            category.classList.add('is-valid');
            alert.category.classList.add('hidden');
            check.category.classList.remove('hidden');
        }
        let extention = ['.png', '.jpg', '.jpeg', '.gif']
        function extCheck(fileName) {
            let bool = true;
            extention.forEach(ext => {
                if (fileName.indexOf(ext) != (-1)) {
                    bool = false;
                    return bool;
                }
            })
            return bool
        }
        if (image.value) {
            if (extCheck((image.value))) {
                errors.push('Debe ingresar un código una extensión válida (jpg, png, jpeg, gif)');
                image.classList.add('is-invalid');
                check.image.classList.add('hidden');
                alert.image.classList.remove('hidden');
            } else {
                image.classList.remove('is-invalid');
                image.classList.add('is-valid');
                alert.image.classList.add('hidden');
                check.image.classList.remove('hidden');
            }
        }
        if (price.value) {
            price.classList.remove('is-invalid');
            price.classList.add('is-valid');
            alert.price.classList.add('hidden');
            check.price.classList.remove('hidden');
        } else {
            errors.push('Debe ingresar un precio');
            price.classList.add('is-invalid');
            alert.price.classList.remove('hidden');
            check.price.classList.add('hidden');

        }
        if (errors.length > 0) { //Chequeo si existen errores
            e.preventDefault();
            console.log('Hay errores')
            ulErrors.classList.add('alert');
            ulErrors.innerHTML = '';
            errors.forEach(error => {
                ulErrors.innerHTML += ('<li>' + error + '</li>');
            })
        } else {
            ulErrors.innerHTML = '';
            //alert('La validación fue exitosa!');
        }
    })
}