let tipoRegistro = "";
let scanner;
let escanerActivo = false;

let estudiantesAutorizados = [
{id:"001", nombre:"Sarai Valdez", curso:"4toA"},
{id:"002", nombre:"Frank Luis", curso:"4toA"},
{id:"003", nombre:"Wilfry Radhame", curso:"4toA"},
{id:"004", nombre:"Yildelis Arias", curso:"4toA"},
{id:"007", nombre:"Nestor Luis", curso:"4toA"}

];


function modoEntrada(){
tipoRegistro = "Entrada";
document.getElementById("estado").innerText = "Modo: Entrada";
}

function modoSalida(){
tipoRegistro = "Salida";
document.getElementById("estado").innerText = "Modo: Salida";
}


function iniciarEscaner(){

if(tipoRegistro === ""){
alert("Primero selecciona Entrada o Salida");
return;
}

if(!escanerActivo){
scanner = new Html5QrcodeScanner("reader",{fps:10, qrbox:250});
scanner.render(onScanSuccess);
escanerActivo = true;
}
}

function detenerEscaner(){
if(scanner){
scanner.clear();
escanerActivo = false;
}
}


function onScanSuccess(decodedText){

try{

let datos = JSON.parse(decodedText);
let idQR = datos.id;

let estudiante = estudiantesAutorizados.find(e => e.id === idQR);

let hora = new Date().toLocaleTimeString();
let tabla = document.getElementById("tabla-registro");

let fila = "";

if(estudiante){

mostrarPermitido(estudiante.nombre);
notificarPadres(estudiante.nombre);

fila = `
<tr>
<td>${estudiante.nombre}</td>
<td>${estudiante.curso}</td>
<td>${hora}</td>
<td>${tipoRegistro}</td>
<td style="color:green;">Acceso Permitido</td>
</tr>
`;

}else{

mostrarDenegado();

fila = `
<tr>
<td>Desconocido</td>
<td>---</td>
<td>${hora}</td>
<td>${tipoRegistro}</td>
<td style="color:red;">Acceso Denegado</td>
</tr>
`;

}

tabla.innerHTML += fila;

detenerEscaner();

document.getElementById("estado").innerText = "Escaneo finalizado";

}catch(error){
alert("QR inválido");
}

}


function mostrarPermitido(nombre){
let pantalla = document.getElementById("pantalla-resultado");

pantalla.className = "permitido";
pantalla.innerText = "ACCESO PERMITIDO\n" + nombre;

setTimeout(()=>{
pantalla.className = "";
pantalla.innerText = "";
},2000);
}

function mostrarDenegado(){
let pantalla = document.getElementById("pantalla-resultado");

pantalla.className = "denegado";
pantalla.innerText = "ACCESO DENEGADO";

setTimeout(()=>{
pantalla.className = "";
pantalla.innerText = "";
},2000);
}


function notificarPadres(nombre){

let noti = document.getElementById("notificacion-padres");

let hora = new Date().toLocaleTimeString();

noti.style.display = "block";

noti.innerText =
` Notificación enviada a los padres
${nombre} registró ${tipoRegistro} a las ${hora}`;

setTimeout(()=>{
noti.style.display = "none";
},4000);

}