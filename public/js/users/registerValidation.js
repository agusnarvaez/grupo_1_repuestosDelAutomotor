window.onload = function () { //Esperamos a que cargue la pantalla

    /***Captamos cada input y el form***/
    let form = document.querySelector('.form');
    let firstName = document.querySelector('#firstName');
    let lastName = document.querySelector('#lastName');
    let zipCode = document.querySelector('#zipCode');
    let image = document.querySelector('#image');
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');
    let repeatPassword = document.querySelector('#repeatPassword');
    let check = {
        name: document.querySelector('#nameCheck'),
        lastName: document.querySelector('#lastNameCheck'),
        zipCode: document.querySelector('#zipCodeCheck'),
        image: document.querySelector('#imageCheck'),
        email: document.querySelector('#emailCheck'),
        password: document.querySelector('#passCheck'),
        repeatPassword: document.querySelector('#repPassCheck')
    }
    let alert = {
        name: document.querySelector('#nameAlert'),
        lastName: document.querySelector('#lastNameAlert'),
        zipCode: document.querySelector('#zipCodeAlert'),
        image: document.querySelector('#imageAlert'),
        email: document.querySelector('#emailAlert'),
        password: document.querySelector('#passAlert'),
        repeatPassword: document.querySelector('#repPassAlert')
    }

    let users = document.querySelector('.users');
    let usersDB = users.textContent;
    users.innerHTML = '';
    firstName.focus();
    form.addEventListener('submit', function (e) {
        let ulErrors = document.querySelector('.errors');
        let errors = [];
        e.preventDefault();
        //Validamos el campo nombre
        if (firstName.value.length < 1) {//Validamos que no esté vacío
            errors.push('Debe ingresar un nombre');
            firstName.classList.add('is-invalid');
            alert.name.classList.remove('hidden');
        } else if (firstName.value.length < 3) { //Validamos tenga mas de 2 letras
            errors.push('Debe ingresar un nombre válido');
            firstName.classList.add('is-invalid');
        } else {
            firstName.classList.remove('is-invalid');
            firstName.classList.add('is-valid');
            alert.name.classList.add('hidden');
            check.name.classList.remove('hidden');
        }

        //Validamos el campo apellido
        if (lastName.value.length < 1) {//Validamos que no esté vacío
            errors.push('Debe ingresar un apellido');
            lastName.classList.add('is-invalid');
            alert.lastName.classList.remove('hidden');
        } else if (lastName.value.length < 3) {//Validamos tenga mas de 2 letras
            errors.push('Debe ingresar un apellido válido');
            lastName.classList.add('is-invalid');
        } else {
            lastName.classList.remove('is-invalid');
            lastName.classList.add('is-valid');
            alert.lastName.classList.add('hidden');
            check.lastName.classList.remove('hidden');
        }

        //Validamos el campo código Postal
        if (lastName.value.length < 1) {//Validamos que no esté vacío
            errors.push('Debe ingresar un código postal');
            zipCode.classList.add('is-invalid');
            alert.zipCode.classList.remove('hidden');
        } else if (zipCode.value.length < 4) {//Validamos que tenga 4 números
            errors.push('Debe ingresar un código postal válido');
            zipCode.classList.add('is-invalid');
        } else {
            zipCode.classList.remove('is-invalid');
            zipCode.classList.add('is-valid');
            alert.zipCode.classList.add('hidden');
            check.zipCode.classList.remove('hidden');
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
                alert.image.classList.remove('hidden');
            } else {
                image.classList.remove('is-invalid');
                image.classList.add('is-valid');
                alert.image.classList.add('hidden');
                check.image.classList.remove('hidden');
            }
        }
        //Validamos el campo email
        if (email.value.length < 1) {//Validamos que no esté vacío
            errors.push('Debe ingresar un email');
            email.classList.add('is-invalid');
            alert.email.classList.remove('hidden');
        }
        else if (!(email.value.indexOf('@hotmail.com') != (-1) || email.value.indexOf('@gmail.com') != (-1) || email.value.indexOf('@outlook.com') != (-1) || email.value.indexOf('@live.com') != (-1) || email.value.indexOf('@yahoo.com') != (-1) || email.value.indexOf('@gmx.') != (-1) || email.value.indexOf('@aol.com') != (-1))) {//Validamos que sea formato mail
            errors.push('Formato de email inválido!');
            email.classList.add('is-invalid');
            emailAlert.classList.remove('hidden');
        } else if (usersDB.indexOf(email.value) != (-1)) {//Validamos que esté en la base de datos
            errors.push('Su email ya se encuentra en la base de datos!');
            email.classList.add('is-invalid');
            alert.email.classList.remove('hidden');
        } else {//Si está todo ok!
            email.classList.remove('is-invalid');
            email.classList.add('is-valid');
            alert.email.classList.add('hidden');
            check.email.classList.remove('hidden');
        }
        // Validamos la contraseña
        let mayusc = "ABCDEFGHYJKLMNÑOPQRSTUVWXYZ";
        let minusc = 'abcdefghijklmnñopqrstuvwxyz';
        let special = "!¡¿?#$%&/()*+´][{}^`@<>;,.:-_=";
        let numbers = '1234567890';

        function has(text, param) {
            for (i = 0; i < text.length; i++) {
                if (param.indexOf(text.charAt(i), 0) != -1) {
                    return false;
                }
            }
            return true;
        }
        if (password.value.length < 1) {
            errors.push('Debe ingresar una contraseña');
            password.classList.add('is-invalid');
            check.password.classList.add('hidden');
            alert.password.classList.remove('hidden');
        } else if (password.value.length <= 8) {
            errors.push('Su contraseña debe tener al menos 8 caracteres');
            password.classList.add('is-invalid');
            check.password.classList.add('hidden');
            alert.password.classList.remove('hidden');
        } else if (has(password.value, mayusc)) {
            errors.push('Su contraseña debe tener al menos 1 mayúscula');
            password.classList.add('is-invalid');
            check.password.classList.add('hidden');
            alert.password.classList.remove('hidden');
        } else if (has(password.value, minusc)) {
            errors.push('Su contraseña debe tener al menos 1 minuscula');
            password.classList.add('is-invalid');
            check.password.classList.add('hidden');
            alert.password.classList.remove('hidden');
        } else if (has(password.value, special)) {
            errors.push('Su contraseña debe tener al menos 1 caracter especial');
            password.classList.add('is-invalid');
            check.password.classList.add('hidden');
            alert.password.classList.remove('hidden');
        } else if (has(password.value, numbers)) {
            errors.push('Su contraseña debe tener al menos 1 número');
            password.classList.add('is-invalid');
            check.password.classList.add('hidden');
            alert.password.classList.remove('hidden');
        } else { //Si está todo ok!
            password.classList.remove('is-invalid');
            password.classList.add('is-valid');
            alert.password.classList.add('hidden');
            check.password.classList.remove('hidden');
        }
        // Validamos si la contraseña coincide
        if (repeatPassword.value.length < 1) {
            errors.push('Debe repetir su contraseña');
            repeatPassword.classList.add('is-invalid');
            alert.repeatPassword.classList.remove('hidden');
        } else if (password.value != repeatPassword.value) {
            errors.push('Sus contraseñas no coinciden');
            repeatPassword.classList.add('is-invalid');
            alert.repeatPassword.classList.remove('hidden');
        } else {//Si está todo ok!
            repeatPassword.classList.remove('is-invalid');
            repeatPassword.classList.add('is-valid');
            alert.repeatPassword.classList.add('hidden');
            check.repeatPassword.classList.remove('hidden');
        }

        if (errors.length > 0) { //Chequeo si existen errores
            e.preventDefault();
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