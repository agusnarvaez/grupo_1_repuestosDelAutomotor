window.onload = function () {
    let container = document.querySelector('.cont')
    let indicator = document.querySelectorAll('.indicator')
    console.log(indicator)
    // Cuando hago CLICK en cierto punto
    // Saber la posición de ese punto
    // Aplicar un transfor translateX al contenedor
    // QUITO la clase pressed de TODOS los puntos
    // AÑADO la clase pressed al punto que hicimos click
    // Recorremos TODOS los puntos
    indicator.forEach((ind, i) => {
        // Asignamos un CLICK a cada punto
        indicator[i].addEventListener('click', () => {
            // Guardar la posición de ese punto
            let position = i;
            // Definimos el espacio a desplazarse contenedor de carrousel
            // Position es 0, transform X es 0
            // Position es 1, transform X es -50%
            // Operacion = posicion* -50
            let operation = position * -50;

            // Movemos contenedor
            container.style.transform = `translateX(${operation}%)`

            // Recorremos TODOS los puntos
            indicator.forEach((ind, i) => {
                // Quitamos la clase ACTIVO a todos los puntos
                indicator[i].classList.remove('pressed')
            })
            // Añadimos la clase al punto cliqueado
            indicator[i].classList.add('pressed')

        })
    })

}