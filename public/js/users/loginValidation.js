window.onload = function () { //Esperamos a que cargue la pantalla

    /***Captamos cada input y el form***/
    let form = document.querySelector('.form');
    let user = document.querySelector('#user');
    let password = document.querySelector('#password');
    let userCheck = document.querySelector('#userCheck');
    let userAlert = document.querySelector('#userAlert');
    let passCheck = document.querySelector('#passCheck');
    let passAlert = document.querySelector('#passAlert');
    user.focus();

    form.addEventListener('submit', function (e) {
        let errors = [];
        //e.preventDefault();
        //Validamos el campo user
        if (user.value.length < 1) {//Validamos que no esté vacío
            errors.push('El mail no puede quedar vacío');
            user.classList.add('is-invalid');
            userAlert.classList.remove('hidden');
        }
        else if (!(user.value.indexOf('@hotmail.com') != (-1) || user.value.indexOf('@gmail.com') != (-1) || user.value.indexOf('@outlook.com') != (-1) || user.value.indexOf('@live.com') != (-1) || user.value.indexOf('@yahoo.com') != (-1) || user.value.indexOf('@gmx.') != (-1) || user.value.indexOf('@aol.com') != (-1))) {//Validamos que sea formato mail
            errors.push('Formato de email inválido!');
            user.classList.add('is-invalid');
            userAlert.classList.remove('hidden');
        } /* else if (usersDB.indexOf(user.value) == (-1)) {//Validamos que esté en la base de datos
            errors.push('Su email no se encuentra en la base de datos...registrese!');
            user.classList.add('is-invalid');
            userAlert.classList.remove('hidden');
        } */ else {
            user.classList.remove('is-invalid');
            user.classList.add('is-valid');
            userAlert.classList.add('hidden');
            userCheck.classList.remove('hidden');
        }
        // Validamos si la contraseña existe
        if (password.value.length < 1) {
            errors.push('Debe ingresar una contraseña');
            password.classList.add('is-invalid');
            passAlert.classList.remove('hidden');
        } else {
            password.classList.remove('is-invalid');
            password.classList.add('is-valid');
            passAlert.classList.add('hidden');
            passCheck.classList.remove('hidden');
        }
        let ulErrors = document.querySelector('.errors');
        if (errors.length > 0) {
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