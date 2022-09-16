
function mostrarTodo(){

    titulo.innerHTML = "Casas disponibles para Alquilar"
    cards.innerHTML = `<section></section>`
    ingresoDatos.className = "ocultar"

    casas.forEach(casa => { 

        cards.innerHTML += `<div  class="card estilo-a">
                                <div class="img-container">
                                     <img src="${casa.imagen}" alt="">
                                </div>
                                <p>id: ${casa.id}</p>
                                <p>Metros cuadrados: ${casa.m2}</p>
                                <p>Ambientes: ${casa.ambientes}</p>
                                <p>Precio:u$ ${casa.precio}</p>
                                <p id="estado" >Estado: ${casa.estado}</p>
                                <button id="btnReserva${casa.id}">RESERVAR</button>
                            </div>`
            if (casa.estado === "RESERVADA"){
                document.querySelector(`#btnReserva${casa.id}`).innerText = "CANCELAR RESERVA"
        } else {
            document.querySelector(`#btnReserva${casa.id}`).innerText = "RESERVAR"
        }
    })
   reservar()
   subirLS()
}


function subirPublicacion(){

    titulo2.innerHTML = "Ingrese los datos"
    document.querySelector("#cargar").style.display = "inline-block"
    document.querySelector("#m2").style.display = "inline-block"
    document.querySelector("#ambientes").style.display = "inline-block"
    document.querySelector("#precio").style.display = "inline-block"
    ingresoDatos.className = "mostrar"
    document.querySelector("#quitar").style.display = "none"
    

    camposInput.forEach(campo =>{
        campo.addEventListener("focus", ()=>{campo.className = "fondo-verde"})
        campo.addEventListener("blur", ()=>{campo.className = ""})   
    })

    id.value = generaId()   
    m2.focus()              
}

const formularioCompleto = ()=>{
    return (m2.value > 0 && ambientes.value > 0 && precio.value > 0) ? true : false
}

function cargar(){
    
    if( formularioCompleto() === true ){

        cards.innerHTML = loading()

        setTimeout(() => {
        
            casas.push(new Casa("", id.value, m2.value, ambientes.value, precio.value))

            toastSwal("Su publicación se subió con éxito", "info", "linear-gradient(#391E46, #84BE68)")
    
            id.value = ""       
            m2.value = ""           
            ambientes.value = "" 
            precio.value = ""
    
            mostrarTodo()
        }, 1500);
    
    } else{                             
        m2.value === "" && m2.focus()   
        ambientes.value === "" && ambientes.focus() 
        precio.value === "" && precio.focus()
       
        toastSwal("Completa todos los valores solicitados.", "warning", "linear-gradient(#391E46, #A62434)")
        } 
}

function quitarPublicacion(){

    ingresoDatos.className = "mostrar"
    document.querySelector("#quitar").style.display = "block"
    document.querySelector("#cargar").style.display = "none"
    document.querySelector("#m2").style.display = "none"
    document.querySelector("#ambientes").style.display = "none"
    document.querySelector("#precio").style.display = "none"

    titulo2.innerHTML = "Ingrese el id de la publicación a quitar"
    id.value = ""
    id.className = "fondo-verde"
    id.focus()

}

function quitar(){
    
    let idIngresado = id.value
    
    if( existeId(idIngresado) === true){

        cards.innerHTML = loading()

        setTimeout(() => {
            casas.forEach(casa => {     

                let indice = casas.indexOf(casa)    
        
                if (casa.id == idIngresado){
        
                    casas.splice(indice,1)   
        
                    toastSwal("La publicacion se quitó con éxito", "info", "linear-gradient(#391E46, #84BE68)")
                }
                })
            
            id.className = ""
            mostrarTodo()   
            
        }, 1500);
    }else {
        id.focus()
        id.value = ""
        toastSwal("El valor ingresado no corresponde.", "warning", "linear-gradient(#391E46, #A62434)")
    }
}

function existeId(idIngresado){
    return (casas.some(casa => casa.id == idIngresado))
}

const cargarContenido = async ()=>{
    let casasBBDD
   await fetch('js/propiedades.json') //await es para q js espere la resp
    .then((response) => response.json())
    .then((data) => {
        casasBBDD = data

        casasBBDD.forEach(casaBBDD =>{ //mantengo el array principal casas
            casas.push(casaBBDD)        //como const x eso lo pusheo
        })

        mostrarTodo()
        
    })
    .catch((error) => toastSwal("Ha ocurrido un error", "warning", "linear-gradient(#391E46, #A62434)"))
}

cargarContenido()

const subirLS = ()=>localStorage.setItem("casas", JSON.stringify(casas))

const toastSwal = (mensaje, icono, bgcolor) => {
    Swal.fire({ 
        text: mensaje,
        toast: false,
        icon: icono,
        showConfirmButton: false,
        timer: 2000,
        background: bgcolor,
        color:"white"
      })
}


const loading = ()=>{
    return'<img id="gif-loading" src="images/loading-loading-forever.gif">'
}


function reservar(){

    casas.forEach(casa=>{
        
        if (casa.estado === "DISPONIBLE"){

            document.querySelector(`#btnReserva${casa.id}`).addEventListener("click", ()=>{ 
            
            casa.estado="RESERVADA"
        
            document.querySelector("#estado").innerHTML = `<p id="estado"> Estado: ${casa.estado}</p>`
    
            mostrarTodo()
            toastSwal("La reserva se realizó con éxito", "info", "linear-gradient(#391E46, #84BE68)")
            })
        } else {
            
            document.querySelector(`#btnReserva${casa.id}`).addEventListener("click", ()=>{ 
            
            casa.estado="DISPONIBLE"
        
            document.querySelector("#estado").innerHTML = `<p id="estado"> Estado: ${casa.estado}</p>`
                                
            mostrarTodo()
            toastSwal("La reserva se canceló con éxito", "info", "linear-gradient(#391E46, #84BE68)") 
            })
        }       
    })        
}
