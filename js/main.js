
//Depende de la cantidad de cuotas será el factor de recargo
function recargarCuotas(cantidadCuotas){
    let recargo
    if (cantidadCuotas >= 1 && cantidadCuotas <= 3) {
        recargo = 1.1
    } else if (cantidadCuotas >= 4 && cantidadCuotas <= 6) {
        recargo = 1.5
    } else {
        recargo = 2
    }
    return recargo
}

//Calculo del importe de cada cuota
const calcularValorCuota = (importe, cuotasRecargo, cuotas) => ((importe * cuotasRecargo) / cuotas)

//Convierte el factor de recargo en porcentaje
const calcularPorcentaje = (cuotasConRecargo) => ((cuotasConRecargo - 1) * 100)
    
//Hace el calculo final del pago con tarjeta
function calculoPagoConTarjeta(empresa, importe){
    let cuotasRecargo
    let importeCuota
    let porcentaje
    let costoTotalFinanciado
    let mensaje
    let cuotasEmpresa
    let cuotasValido = false
    do {
        cuotasEmpresa = parseInt(prompt("Ingrese la cantidad de cuotas: de 1 a 12"))
        if (cuotasEmpresa >= 1 && cuotasEmpresa <= 12){
            cuotasValido = true
        } else {
            console.log("Ingrese una cantidad de cuotas validas, de 1 a 12")    
        }
    } while (cuotasValido == false)
    cuotasRecargo = recargarCuotas(cuotasEmpresa)
    importeCuota = calcularValorCuota (importe, cuotasRecargo, cuotasEmpresa)
    porcentaje = calcularPorcentaje(cuotasRecargo)
    costoTotalFinanciado = calcularCostoTotal (importe, cuotasRecargo)
    mensaje = "Por su compra de $ " + importe + " con " + empresa + ", abonara un recargo de " + porcentaje.toFixed(2) + " %: \n" + cuotasEmpresa + " cuotas de $ " + importeCuota.toFixed(2) +  "\nCosto total financiado: $ " + costoTotalFinanciado.toFixed(2)
    return mensaje 
}

//Calcula cuanto es la sumatoria de las cuotas, el costo final para el cliente
const calcularCostoTotal = (importe, cuotasRecargo) => importe * cuotasRecargo

//Definicion de la Clase Producto, propiedades y metodos
class Producto{
    static id = 0
    constructor (nombre, origen, presentacion, precio){
        this.id = ++Producto.id,
        this.nombre = nombre,
        this.origen = origen,
        this.presentacion = presentacion,
        this.precio = precio
    }
    
}

//Creacion de instancias de la clase Productos
const te1 = new Producto("Te negro La Virginia", "Argentina", "25 saquitos", 1500)
const te2 = new Producto("Te verde Taragüi", "Argentina", "20 saquitos", 1850)
const te3 = new Producto("Te Earl Grey Twinings", "Reino Unido", "25 saquitos", 6500)
const te4 = new Producto("Te rojo Pu-Erh Inti Zen", "China", "15 saquitos", 4200)
const te5 = new Producto("Te en hebras Chai Saint Gottard", "India", "50 gramos", 3800)

//Se forma array a partir de las instancias
const catalogo = [
        te1, te2, te3, te4, te5
    ]

//Para ver Catalogo de productos,se recorre con forEach
const verCatalogo = () => {
    catalogo.forEach((elemento) =>
    console.log(elemento.nombre + ", Precio: $ " + elemento.precio)
    )
}

//Filtrado de productos nacionales
const filtrarNacionales = () => {
const nacionales = catalogo.filter(catalogo => catalogo.origen == "Argentina")
console.log(nacionales)
}

//Filtrado de productos importados
const filtrarImportados = () => {
const importados = catalogo.filter(catalogo => catalogo.origen !== "Argentina")
console.log(importados)
}

// ordenar de manera ascendente
const ordenAscendente = () => {
catalogo.sort((a, b) => a.precio - b.precio)
console.log(catalogo)
}

// ordenar de manera decendente
const ordenDescendente = () => {
catalogo.sort((a, b) => b.precio - a.precio)
console.log(catalogo)
}

//Filtrado por origen
const filtrarOrigen = () => {
let origenValido = false
do {
    let busquedaOrigen = prompt("Listar producto por origen: nacional o importado").toLowerCase()
        if (busquedaOrigen == "nacional"){
            filtrarNacionales()
            origenValido = true
        } else if (busquedaOrigen == "importado") {
            filtrarImportados()
            origenValido = true
        } else {
            console.log("Error de tipeo. Escriba nacional o importado") 
        }
    }  while (origenValido == false)
}

//Busqueda de producto por nombre, muestra el precio
const buscarProducto = () => {
let busqueda = prompt("Que producto está buscando?")
const encontrado = catalogo.find(catalogo => catalogo.nombre == busqueda)
if (encontrado) {
    console.log("El precio del productos es: $" + (encontrado.precio))
    } else {
    console.log("El producto no se encuentra")
    }
}

//Ordena por precio ascendente o descendente
const ordenarPorPrecio = () => {
let ordenValido = false
do {
    let opcionOrden = prompt("Listar producto por precio: ascendente o descendente").toLowerCase()
        if (opcionOrden == "ascendente"){
            ordenAscendente()
            ordenValido = true
        } else if (opcionOrden == "descendente") {
            ordenDescendente()
            ordenValido = true
        } else {
            console.log("Error de tipeo. Escriba ascendente o descendente") 
        }
    }  while (ordenValido == false)
}

// Para elegir metodo de pago
const pagarCompra = () => {
let pagar = true
while(pagar) {
    let importeValido = false
    let importe
    do {
        importe = parseFloat(prompt("Ingrese el importe de la compra"))
        if (importe > 0){
            importeValido = true
        } else {
            console.log("Ingrese un importe válido, mayor a 0")
        } 
    } while (importeValido == false)

    let menuPago = parseInt(prompt("Ingrese una opcion de pago: 1 VISA, 2 MASTERCARD, 3 AMERICAN EXPRESS, 4 MERCADOPAGO o 5 EFECTIVO"))
    
    switch(menuPago) {
        case 1:
            console.log(calculoPagoConTarjeta("Visa", importe))
            break
        case 2:
            console.log(calculoPagoConTarjeta("Mastercard", importe))
            break
        case 3:
            console.log(calculoPagoConTarjeta("American Express", importe))
            break
        case 4:
            let importeMP = importe * 0.85
            alert("Su pago con MercadoPago tiene un 15% de descuento, por su compra de $ " + importe + " abonara $ " + importeMP )
            break
        case 5:
            let importeEfectivo = importe * 0.75
            alert("Su pago con efectivo tiene un 25% de descuento, por su compra de $ " + importe + " abonara $ " + importeEfectivo )
            break
        default:
            alert("Opcion incorrecta")
    }

    let confirmacion = prompt("Desea hacer otro pago? (si/no)").toLowerCase()
    if(confirmacion == "no"){
        pagar = false
        alert("Gracias por su compra!")
    }
}
}

//Menu principal
let menuPrincipal = parseInt(prompt("Bienvenido! Ingrese \n1 para ver catalogo \n2 para pagar \n3 para filtrar por origen \n4 para ordenar por precio \n5 para buscar producto \n6 para salir"))

while(menuPrincipal !== 6) {
    switch(menuPrincipal) {
        case 1:
            verCatalogo()
            break
        case 2:
            pagarCompra()
            break
        case 3:
            filtrarOrigen()
            break
        case 4:
            ordenarPorPrecio()
            break
        case 5:
            buscarProducto()
            break
        default:
            alert("Opcion incorrecta")
    }
    menuPrincipal = parseInt(prompt("Ingrese \n1 para ver catalogo \n2 para pagar \n3 para filtrar por origen \n4 para ordenar por precio \n5 para buscar producto \n6 para salir"))
}