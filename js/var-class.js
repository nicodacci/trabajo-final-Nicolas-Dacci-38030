//------------DECLARACION DE CONSTANTES, VARIABLES Y CLASSES---------------

const casas = []


function generaId(){
    return parseInt(Math.random() * 10000)


}

class Casa {
    constructor(imagen, id, m2, ambientes, precio, estado){
        this.imagen = "./images/home_243.png"//puse un icono para cuando
        this.id = id                         //se carga una nueva publicación   
        this.m2 = m2                         //xq aún no se como cargar imágenes   
        this.ambientes = ambientes           //desde un botón   
        this.precio = precio
        this.estado = "DISPONIBLE"
    } 
}
