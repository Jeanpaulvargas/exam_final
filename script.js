document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formularioUsuario');
    const entradaUsuarioGithub = document.getElementById('entradaUsuarioGithub');
    const entradaNombreGithub = document.createElement('input');
    const seleccionPais = document.getElementById('seleccionPais');
    const entradaTelefono = document.getElementById('entradaTelefono');
    const entradaCorreo = document.getElementById('entradaCorreo');
    const cuerpoTablaUsuarios = document.getElementById('cuerpoTablaUsuarios');
    const botonBuscarGithub = document.createElement('button');
    const botonCodigoPais = document.createElement('button');
    const divCargando = document.getElementById('cargando');

    entradaNombreGithub.setAttribute('type', 'text');
    entradaNombreGithub.setAttribute('class', 'form-control mb-3');
    entradaNombreGithub.setAttribute('placeholder', 'Nombre completo de GitHub');
    entradaNombreGithub.setAttribute('readonly', 'true');
    entradaUsuarioGithub.parentNode.appendChild(entradaNombreGithub);
    
    botonBuscarGithub.textContent = 'Buscar Nombre de GitHub';
    botonBuscarGithub.type = 'button';
    botonBuscarGithub.classList.add('btn', 'btn-secondary', 'mb-3');
    entradaUsuarioGithub.parentNode.appendChild(botonBuscarGithub);


    botonCodigoPais.textContent = 'Obtener Código de Teléfono';
    botonCodigoPais.type = 'button';
    botonCodigoPais.classList.add('btn', 'btn-secondary', 'mb-3');
    entradaTelefono.parentNode.appendChild(botonCodigoPais);


    fetch('https://restcountries.com/v3.1/all')
        .then(respuesta => respuesta.json())
        .then(datos => {
            const paises = datos.map(pais => ({
                nombre: pais.name.common,
                codigoMarcacion: pais.idd.root + (pais.idd.suffixes ? pais.idd.suffixes[0] : '')
            }));
            paises.forEach(pais => {
                const opcion = document.createElement('option');
                opcion.value = pais.codigoMarcacion;
                opcion.textContent = pais.nombre;
                seleccionPais.appendChild(opcion);
            });
        })
        .catch(error => console.error('Error cargando países:', error));


    botonBuscarGithub.addEventListener('click', async () => {
        const usuarioGithub = entradaUsuarioGithub.value.trim();
        if (!usuarioGithub) {
            entradaNombreGithub.value = 'Por favor, ingresa un usuario de GitHub';
            return;
        }

        divCargando.style.display = 'block';

        try {
            const respuestaGithub = await fetch(`https://api.github.com/users/${usuarioGithub}`);
            if (!respuestaGithub.ok) throw new Error('Error al obtener datos de GitHub');
            const datosGithub = await respuestaGithub.json();
            entradaNombreGithub.value = datosGithub.name || usuarioGithub;
        } catch (error) {
            entradaNombreGithub.value = 'No se pudo obtener el nombre de GitHub';
            console.error('Error al obtener datos de GitHub:', error);
        } finally {
            divCargando.style.display = 'none';
        }
    });


    botonCodigoPais.addEventListener('click', () => {
        const codigoMarcacionPais = seleccionPais.value;
        entradaTelefono.value = codigoMarcacionPais;
    });


    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();
        divCargando.style.display = 'block';

        const nombreGithub = entradaNombreGithub.value.trim();
        const codigoMarcacionPais = seleccionPais.value;
        const telefono = entradaTelefono.value.trim();
        const correo = entradaCorreo.value.trim();

        if (!nombreGithub || !telefono || !correo) {
            divCargando.style.display = 'none';
            return;
        }

     
    });
});
