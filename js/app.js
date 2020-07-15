const formularioContactos = document.querySelector('#contacto');
      listadoContactos = document.querySelector('#listado-contactos tbody');

eventListeners();

function eventListeners() {
    //Cuando el formulario de crear o editar se ejecuta//
    formularioContactos.addEventListener('submit', leerFormulario);
}

function leerFormulario(e) {
    e.preventDefault();

    //Leer los datos de los inputs//
    const nombre = document.querySelector('#nombre').value,
          empresa = document.querySelector('#empresa').value,
          telefono = document.querySelector('#telefono').value,
          accion = document.querySelector('#accion').value;
    
    if (nombre === '' || empresa === '' || telefono ==='') {
          mostrarNotificacion('Todos los Campos Son Obligatorios', 'error');
          
    } else {
        
         /** validacion**/
         const infoContacto = new FormData();
         infoContacto.append('nombre', nombre);
         infoContacto.append('emprensa', empresa);
         infoContacto.append('telefono', telefono);
         infoContacto.append('accion', accion);
         console.log(...infoContacto);

         if(accion === 'crear'){

            insertarBD(infoContacto);

        } else {

        }
    }
}
/**inserta en la base de datos via Ajax */
function insertarBD(datos){

    //llamado a ajax
    
 
    //crear el objeto
    const xhr = new XMLHttpRequest();

    //abrir conexxion
    xhr.open('POST', 'inc/modelos/modelo-contacto.php', true);

    //pasar datos
    xhr.onload = function() {
        if(this.status === 200) {
            console.log(JSON.parse(xhr.responseText) );
            //leemos la respuesta de php
            const respuesta = JSON.parse( xhr.responseText);

            //nuevo elemento
            const nuevoContacto =Document.createElement('tr');

            nuevoContacto.innerHTML = `
                <td>${respuesta.datos.nombre}</td>
                <td>${respuesta.datos.empresa}</td>
                <td>${respuesta.datos.telefono}</td>
            `;
            //contenedor botones 
            const contenedorAcciones = document.createElement('td');

            //icono de editar
            const iconoEditar = document.createElement('i');
            iconoEditar.classList.add('fas', 'fa-pen-square');

            //enlace
            const btnEditar = document.createElement('a');
            btnEditar.appendChild(iconoEditar);
            btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;
            btnEditar.classList.add('btn', 'btn-editar');

            //padre
            contenedorAcciones.appendChild(btnEditar);

            //eliminar
            const iconoEliminar = document.createElement('1');
            iconoEliminar.classList.add('fas', 'fa-pen-square');

            //btn eliminar 
            const btnEliminar = document.createElement('button');
            btnEliminar.appendChild(iconoEliminar);
            btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado);
            btnEliminar.classList.add('btn', 'btn-borrar');

            //al padre
            contenedorAcciones.appendChild(btnEliminar);

            //tr
            nuevoContacto.appendChild(contenedorAcciones);

            //contactos
            listContactos.appendChild(nuevoContacto);

            //formulario
            document.querySelector('form').reset();

            //notificacion
            mostrarNotificacion('Contacto Creado Corectamente', 'correcto');


        }
        
    }
    //enviar los datos
    xhr.send(datos)
}


//Notificacion en pantalla
function mostrarNotificacion(mensaje, clase) {
    const notificacion = document.createElement('div');
    notificacion.classList.add(clase, 'notificacion', 'sombra');
    notificacion.textContent = mensaje;

    //formulario
    formularioContactos.insertBefore(notificacion, document.querySelector('form legend'));

    //ocultar notificacion 
    setTimeout(() => {
        notificacion.classList.add('visible');

        setTimeout(() => {
            notificacion.classList.remove('visible');

            setTimeout(() => {
            notificacion.remove();
            }, 500);
        }, 3000);
        
    }, 100);
}