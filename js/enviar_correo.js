//Declaro las variables necesarias
var form = document.getElementById("formulario");
var answer = document.getElementById("answer");
const telefonoInput = document.querySelector('#telefono');
const confirmationMessage = document.querySelector('#confirmation-message');


//Defino el oyente del evento submit del formulario
form.addEventListener("submit", (e) => {
    //Evito el preventDefault del formulario
    e.preventDefault();
    //Creo el objeto FormData
    let datos = new FormData(form);
    //Realizo mi peticion fetch al backend
    fetch("server/php/enviarFormulario.php", {
        method: "POST",
        body: datos,
    })
        .then((res) => res.json())
        .then((data) => {
            //Validamos si hay error
            if (data === "error") {
                //Definimos el mensaje que vamos a mostrar
                answer.innerHTML = `
                                    <div class="alert alert-danger" role="alert">
                                        Algo salio mal.
                                      </div>
                                `;
                //seleccionamos el contenedor
                const alertElement = answer.querySelector('.alert');
                setTimeout(() => {
                    alertElement.classList.add('show-alert'); // Aparece suavemente
                }, 10); // Un pequeño delay para asegurarse de que el elemento esté en el DOM
                setTimeout(() => {
                    alertElement.classList.remove('show-alert'); // Desaparece suavemente
                }, 3000);
                setTimeout(() => {
                    answer.innerHTML = ``; //Desaparecemos el HTML de contenedor answer para que el espacio se quite
                }, 3300);
                confirmationMessage.style.display = 'none';
                confirmationMessage.style.display = '';
                confirmationMessage.textContent = '';
                confirmationMessage.remove();
            } else {
                //Definimos el mensaje que vamos a mostrar
                answer.innerHTML = `
                                    <div class="alert alert-success" role="alert">
                                          ${data}
                                      </div>
                                    `;
                //seleccionamos el contenedor
                const alertElement = answer.querySelector('.alert');
                setTimeout(() => {
                    alertElement.classList.add('show-alert'); // Aparece suavemente
                }, 10); // Un pequeño delay para asegurarse de que el elemento esté en el DOM
                setTimeout(() => {
                    alertElement.classList.remove('show-alert'); // Desaparece suavemente
                }, 3000);
                setTimeout(() => {
                    answer.innerHTML = ``;//Desaparecemos el HTML de contenedor answer para que el espacio se quite
                }, 3300);
                confirmationMessage.style.display = 'none';
                confirmationMessage.style.display = '';
                confirmationMessage.textContent = '';
                confirmationMessage.remove();
                //Reseteamos el Formulario
                form.reset();
            }
        });
});