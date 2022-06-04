//inicio
const inicioContainer = document.getElementById("inicioContainer");
const inventarPalabraInput = document.getElementById("inventarPalabraInput");
const botonIniciar= document.getElementById("botonIniciar");

//juego
const juegoContainer = document.getElementById("juegoContainer");
const usarLetra = document.getElementById("letraContainerInput");
const botonIntentar = document.getElementById("botonIntentar");
const canvas = document.getElementById("canvas");
const letrasErradas = document.getElementById("letrasErradas");
const palabraSecreta = document.getElementById("palabraSecreta");
const avisoError = document.getElementById("errorEnLetra");

//final del juego
const caritaFeliz = document.getElementById("caritaFelizContainer");
const caritaTriste = document.getElementById("caritaTristeContainer");
const juegoTerminadoContainer = document.getElementById("juegoTerminadoContainer");
const mensajeFinal = document.getElementById("mensajeFinal");
const botonFinal = document.getElementById("buttonFinal");

//inicialización

var pincel = canvas.getContext("2d");


//dibujar horca
function dibujarPalo(x,y,w,h){
    pincel.beginPath()
    pincel.fillStyle= "#D82020"; 
    pincel.fillRect(x,y,w,h);
    pincel.shadowOffSetX=5;
    pincel.shadowBlur = 20;
    pincel.shadowColor="black";
    pincel.fill();
}

function dibujarSoga(x1,y1,x2,y2){
    pincel.strokeStyle="#FFFB00";
    pincel.beginPath();
    pincel.moveTo(x1,y1);
    pincel.lineTo(x2,y2);
    pincel.stroke();
}

function dibujarHorca(){
    dibujarPalo(50,300,120,15);
    dibujarPalo(50,300,120,15);
    dibujarPalo(40,310,140,15);
    dibujarPalo(85,300,10,-200);
    dibujarPalo(85,100,90,10);
    dibujarPalo(175,100,10,30);

    dibujarSoga(95,250,115,110);
    dibujarSoga(95,250,85,250);
    dibujarSoga(115,110,115,100);
    dibujarSoga(180,130,180,140);
    dibujarSoga(115,110,175,120);
}

dibujarHorca();

//dibujar ahorcado
//cabeza
function dibujarCabeza(){
    pincel.fillStyle="#B98EDF"
    pincel.strokeStyle="#ffffff";
    pincel.beginPath();
    pincel.arc(180,160,20,0,2*Math.PI);
    pincel.shadowOffSetY=5;
    pincel.shadowBlur = 30;
    pincel.shadowColor="#000000";
    pincel.stroke();
    pincel.fill();
}
//cuerpo
function dibujarCuerpo(){
    pincel.fillStyle ="#5C7BC5";
    pincel.beginPath();
    pincel.fillRect(175,180,10,40);
    pincel.shadowOffSetY=3;
    pincel.shadowBlur = 30;
    pincel.shadowColor="#000000";
    pincel.fill();
}
//pierna1
function dibujarPollera(){
    pincel.fillStyle="#88F852";
    pincel.strokeStyle="#88F852"
    pincel.beginPath();
    pincel.moveTo(185,220);
    pincel.lineTo(175,220);
    pincel.lineTo(160,245);
    pincel.lineTo(200,245);
    pincel.lineTo(185,220);
    pincel.shadowOffSetY=3;
    pincel.shadowBlur = 30;
    pincel.shadowColor="#000000";
    pincel.fill();
    pincel.stroke();
}
//pierna2
function dibujarPiernas(){
    pincel.fillStyle="#FF6D00";
    pincel.beginPath();
    pincel.fillRect(173,245,5,30);
    pincel.fillRect(181,245,5,30);
    pincel.shadowOffSetY=3;
    pincel.shadowBlur = 30;
    pincel.shadowColor="#000000";
    pincel.fill();
}
//brazo1
function dibujarBrazo1(){
    pincel.fillStyle="#E2CF36"
    pincel.beginPath();
    pincel.fillRect(175,185,-30,5);
    pincel.shadowOffSetY=3;
    pincel.shadowBlur = 30;
    pincel.shadowColor="#000000";
    pincel.fill();
}
//brazo2

function dibujarBrazo2(){
    pincel.fillStyle ="#E2CF36";
    pincel.beginPath();
    pincel.fillRect(185,185,30,5);
    pincel.fill();

}

function ahorcar(errores){
    switch(errores){
        case 1:
            dibujarCabeza();
            break;
        case 2:
            dibujarCuerpo();
            break;
        case 3:
            dibujarPollera();
            break;
        case 4:
            dibujarPiernas();
            break;
        case 5:
            dibujarBrazo1();
            break;
        case 6:
            dibujarBrazo2();
            break;
        default:
            break
        
    }
}


let palabra = "";
let palabraSecretaArray = [];
let erradas = [];
let inputUpperCase = [];
let finalInput = "";
let errores = 0;
let aciertos = [];


botonIniciar.addEventListener("click", iniciar);
botonIntentar.addEventListener("click", gameLoop);
botonFinal.addEventListener("click", volverInicio);



// cómo funciona el inicio

function iniciar (){
    if (inventarPalabraInput.value === ""){
        palabra = ["MARGARITA", "JAZMIN", "TULIPAN", "GIRASOL"][Math.floor(Math.random()*2)];
    }else {
        palabra = inventarPalabraInput.value.toUpperCase().trim();
    }

    inicioContainer.classList.add("noMostrar");
    juegoContainer.classList.remove("noMostrar");
    palabraSecretaArray = palabra.split("").map(letter => " _ ");
    usarLetra.focus();
    hacerIntento(); 

}

// cómo funciona el juego
function reiniciarInput(){
    usarLetra.value = "";
    usarLetra.focus();
}

function hacerIntento(letra_elegida){
    if (!letra_elegida) { return palabraSecreta.innerText = palabraSecretaArray.join("");
    } else {
    palabra.split("").map((letter,index) => {
        if (letter === letra_elegida) {palabraSecretaArray[index] = letra_elegida}
    })}

    palabraSecreta.innerText = palabraSecretaArray.join("");
    reiniciarInput();
}

function unError(letra_elegida){
    erradas.push(letra_elegida);
    letrasErradas.innerText = erradas.join(" , ");
    reiniciarInput();
}

function errorUsarLetra(mensaje){
    avisoError.innerText = mensaje;
    avisoError.style = "opacity: 1";
    setTimeout(() => {
        avisoError.style = "opacity: 0"
    }, 1000)
}

//validacion de la letra
function validacion(letra){
    if(aciertos.includes(letra) || erradas.includes(letra)){
        errorUsarLetra("ya ingresaste esa letra, intenta de nuevo");
        reiniciarInput();
        return false;
    }
    
    if (letra.length > 1){
        errorUsarLetra("solo podes ingresar una letra a la vez");
        reiniciarInput();
        return false;
    }

    if(!letra.match(/[a-z]/i)){
        errorUsarLetra("solo podes ingresar letras");
        reiniciarInput();
        return false;
    }

    return true
}

//game loop
function gameLoop(){

    const letra = usarLetra.value.toUpperCase();
    console.log(letra);
    if(!validacion(letra)) return;

    if(palabra.includes(letra)){
        hacerIntento(letra);
        aciertos.push(letra);

    } else {
        errores++
        unError(letra);
        ahorcar(errores)
    }

    if (errores === 6){
        setTimeout(()=>{
            juegoContainer.classList.add("noMostrar")
            caritaFeliz.classList.add("noMostrar");
            caritaTriste.classList.remove("noMostrar");
            mensajeFinal.innerText = ("Perdiste! La palabra era "+ palabra);
            juegoTerminadoContainer.classList.remove("noMostrar"); 
        },500)
    
    }

    if(aciertos.length === new Set(palabra).size){
        juegoContainer.classList.add("noMostrar");
        mensajeFinal.innerText = "Ganaste! Felicitaciones!";
        juegoTerminadoContainer.classList.remove("noMostrar");
    }
}

//juego terminado
function volverInicio(){
    
    pincel.clearRect(0,0,400,400);
    inventarPalabraInput.value = "";
    letrasErradas.innerText="";
    palabra = "";
    palabraSecretaArray = [];
    erradas = [];
    inputUpperCase = [];
    finalInput = "";
    errores = 0;
    aciertos = [];
    dibujarHorca();
    juegoTerminadoContainer.classList.add("noMostrar");
    inicioContainer.classList.remove("noMostrar");

    
}



