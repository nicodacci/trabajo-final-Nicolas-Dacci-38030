
//----------------CONEXION CON EL HTML----------------------
const titulo = document.querySelector("#titulo")
const titulo2 = document.querySelector("#titulo2")
const cards = document.getElementById("cards")
const ingresoDatos = document.querySelector(".ingresoDatos")
const camposInput = document.querySelectorAll(".form")

//me conecto con los botones con querySelector mediante el id
const botonSubirPublicacion = document.querySelector("#subirPublicacion")
const botonQuitarPublicacion = document.querySelector("#quitarPublicacion")

//me conecto con los input de ingreso de datos
const id = document.querySelector("#id")
const m2 = document.querySelector("#m2")
const ambientes = document.querySelector("#ambientes")
const precio = document.querySelector("#precio")
const estado = document.querySelector("#estado")

const btncargar = document.querySelector("#cargar")
const btnquitar = document.querySelector("#quitar")

//-----------------------FUNCIONES BOTONES---------------------------------


botonSubirPublicacion.addEventListener("click", subirPublicacion)
botonQuitarPublicacion.addEventListener("click", quitarPublicacion)
btncargar.addEventListener("click", cargar)
btnquitar.addEventListener("click", quitar)


