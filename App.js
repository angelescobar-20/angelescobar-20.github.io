let listaPacientes = [];

const objetoPaciente = {
    id: '',
    nombre:'',
    dpi:'',
    edad:'',
    genero:'',
    nacimiento:'',
    fprueba:'',
    resultados:''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const dpiInput = document.querySelector('#DPI');
const edadInput = document.querySelector('#edad');
const generoSelect = document.querySelector('#genero')
const nacimientoInput = document.querySelector('#nacimiento');
const fpruebaInput = document.querySelector('#fecha-prueba');
const resultadosInput = document.querySelector('#resultado-prueba');

const btnEnviar = document.querySelector('#agregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(nombreInput === '' || dpiInput === '' ||
     edadInput === '' || generoSelect === '' || nacimientoInput === '' || 
     fpruebaInput === '' || resultadosInput === ''){

        alert("Todos los datos son obligatorios");
        return
    }

    if(editando){
        editarPaciente();
        editando = false;
    } else {
        objetoPaciente.id = Date.now();
        objetoPaciente.nombre = nombreInput.value;
        objetoPaciente.dpi = dpiInput.value;
        objetoPaciente.edad = edadInput.value;
        objetoPaciente.genero = generoSelect.value;
        objetoPaciente.nacimiento = nacimientoInput.value;
        objetoPaciente.fprueba = fpruebaInput.value;
        objetoPaciente.resultados = resultadosInput.value;

        agregarPaciente();
    }
}

function agregarPaciente () {
    listaPacientes.push({...objetoPaciente});

    mostrarPacientes();

    formulario.reset();

    limpiarObjeto();
}

function limpiarObjeto() {
    
        objetoPaciente.nombre = '';
        objetoPaciente.dpi = '';
        objetoPaciente.edad = '';
        objetoPaciente.genero = '';
        objetoPaciente.nacimiento = '';
        objetoPaciente.fprueba = '';
        objetoPaciente.resultados = '';

}

    function mostrarPacientes() {

        limpiarHTML();


        const divPacientes = document.querySelector('.div-pacientes');

        listaPacientes.forEach( paciente => {
            const {id, nombre, dpi, edad, genero, nacimiento, fprueba, resultados} = paciente;

            const parrafo = document.createElement('p');
            parrafo.textContent = `${id} - ${nombre} - ${dpi} - ${edad} - ${genero} - 
            ${nacimiento} - ${fprueba} - ${resultados} - `;
            parrafo.dataset.id = id;

            const editarBoton = document.createElement('button');
            editarBoton.onclick = () => cargarPaciente(paciente);
            editarBoton.textContent = 'Editar';
            editarBoton.classList.add('btn', 'btn-editar');
            parrafo.append(editarBoton);


            const eliminarBoton = document.createElement('button');
            eliminarBoton.onclick = () => eliminarPaciente(id);
            eliminarBoton.textContent = 'Eliminar';
            eliminarBoton.classList.add('btn', 'btn-eliminar');
            parrafo.append(eliminarBoton);

            const hr = document.createElement('hr');

            divPacientes.appendChild(parrafo);
            divPacientes.appendChild(hr);
        });
    
    
    }

    function cargarPaciente(paciente) {
        const {id, nombre, dpi, edad, genero, nacimiento, fprueba, resultados} = paciente;
        nombreInput.value = nombre;
        dpiInput.value = dpi;
        edadInput.value = edad;
        generoSelect.value = genero;
        nacimientoInput.value = nacimiento;
        fpruebaInput.value = fprueba;
        resultadosInput.value = resultados;

        objetoPaciente.id = id;

        formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';

        editando = true; 
    }

    function editarPaciente(){
        objetoPaciente.nombre = nombreInput.value;
        objetoPaciente.dpi = dpiInput.value;
        objetoPaciente.edad = edadInput.value;
        objetoPaciente.genero = generoSelect.value;
        objetoPaciente.nacimiento = nacimientoInput.value;
        objetoPaciente.fprueba = fpruebaInput.value;
        objetoPaciente.resultados = resultadosInput.value;

        listaPacientes.map( paciente => {

            if(paciente.id === objetoPaciente.id){
                paciente.id = objetoPaciente.id;
                paciente.nombre = objetoPaciente.nombre;
                paciente.dpi = objetoPaciente.dpi;
                paciente.edad = objetoPaciente.edad;
                paciente.genero = objetoPaciente.genero;
                paciente.nacimiento = objetoPaciente.nacimiento;
                paciente.fprueba = objetoPaciente.fprueba;
                paciente.resultados = objetoPaciente.resultados;
            }
        });

        limpiarHTML();
        mostrarPacientes();

        formulario.reset();

        formulario.querySelector('button[type="submit"]').textContent = 'Agregar';

        editando = false;

    }

    function eliminarPaciente(id) {
        listaPacientes = listaPacientes.filter(empleado => empleado.id !== id);
        limpiarHTML();
        mostrarPacientes();
    }

    function limpiarHTML(){
        const divPacientes = document.querySelector('.div-pacientes');
        while(divPacientes.firstChild){
            divPacientes.removeChild(divPacientes.firstChild);
        }
    }

