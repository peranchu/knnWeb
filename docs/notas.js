//Notas MIDI 

//Array NOTAS
//I
const CM = [60, 64, 67];
const Cm = [60, 63, 67];
const C7 = [60, 64, 67, 71];

//II
const DM = [62, 66, 69];
const Dm = [62, 65, 69];
const D7 = [62, 66, 69, 73];

//III
const EM = [64, 68, 71];
const Em = [64, 67, 71];
const E7 = [64, 68, 71, 75];

//IV
const FM = [65, 69, 72];
const Fm = [65, 68, 72];
const F7 = [65, 69, 72, 77];

//V
const GM = [67, 71, 74];
const Gm = [67, 70, 74];
const G7 = [67, 71, 74, 78];

//VI
const AM = [69, 73, 76];
const Am = [69, 72, 76];
const A7 = [69, 73, 76, 80];

//VII
const Bb = [58, 62, 65];
const Bbm = [58, 61, 65];
const Bb7 = [58, 62, 65, 69];

//Vacio
const vacio = [];
//=============================== FIN NOTAS =======================

let tono;
let modo;
let name;
let grado;

let mensajeNota = [];


//crea desde las etiquetas del objeto, las clases MIDI
function CapturaDatos() {
    mensajeNota = [];  //Limpia el array

    for (let i = 0; i < Basedatos.length; i++) {
        //console.log(Basedatos);
        name = Basedatos[i].nombre;
        tono = Basedatos[i].tonalidad;
        grado = Basedatos[i].grado;
        modo = Basedatos[i].modo;

        //Comprueba los campos para crear las clases MIDI
        Comprobacion(name, tono, grado, modo);

    }
}


//Cpmprobacion mensajes, creación de las clases y Carga
function Comprobacion(name, tono, grado, modo) {
    //CM
    if (tono === "C" && grado === "I" && modo === "Mayor") { //CM
        //console.log("CM");
        newMIDI = new MensajeMIDI(name, CM);
        addMensaje();
    }
    if (tono === "C" && grado === "IV" && modo === "Mayor") { //DM
        //console.log("FM");
        newMIDI = new MensajeMIDI(name, FM);
        addMensaje();
    }
    if (tono === "C" && grado === "V" && modo === "Mayor") { //DM
        //console.log("GM");
        newMIDI = new MensajeMIDI(name, GM);
        addMensaje();
    }

    //==================  C MENOR ===============================
    //Cmenor
    if (tono === "C" && grado === "I" && modo === "menor") { //Cm
        //console.log("Cm");
        newMIDI = new MensajeMIDI(name, Cm);
        addMensaje();
    }
    if (tono === "C" && grado === "IV" && modo === "menor") { //Fm
        //console.log("Fm");
        newMIDI = new MensajeMIDI(name, Fm);
        addMensaje();
    }
    if (tono === "C" && grado === "V" && modo === "menor") { //Gm
        //console.log("Gm");
        newMIDI = new MensajeMIDI(name, Gm);
        addMensaje();
    }

    //==================  C 7ª ===============================
    //C7
    if (tono === "C" && grado === "I" && modo === "7ª") { //C7
        //console.log("Cm");
        newMIDI = new MensajeMIDI(name, C7);
        addMensaje();
    }
    if (tono === "C" && grado === "IV" && modo === "7ª") { //F7
        //console.log("Fm");
        newMIDI = new MensajeMIDI(name, F7);
        addMensaje();
    }
    if (tono === "C" && grado === "V" && modo === "7ª") { //G7
        //console.log("Gm");
        newMIDI = new MensajeMIDI(name, G7);
        addMensaje();
    }

    //================== FM ===============================
    //FM
    if (tono === "F" && grado === "I" && modo === "Mayor") { //FM
        //console.log("FM");
        newMIDI = new MensajeMIDI(name, FM);
        addMensaje();
    }
    if (tono === "F" && grado === "IV" && modo === "Mayor") { //BbM
        //console.log("Bb");
        newMIDI = new MensajeMIDI(name, Bb);
        addMensaje();
    }
    if (tono === "F" && grado === "V" && modo === "Mayor") { //CM
        //console.log("CM");
        newMIDI = new MensajeMIDI(name, CM);
        addMensaje();
    }

    //================== Fm ===============================
    //Fm
    if (tono === "F" && grado === "I" && modo === "menor") { //Fm
        //console.log("fm");
        newMIDI = new MensajeMIDI(name, Fm);
        addMensaje();
    }
    if (tono === "F" && grado === "IV" && modo === "menor") { //BbM
        //console.log("Fm");
        newMIDI = new MensajeMIDI(name, Bbm);
        addMensaje();
    }
    if (tono === "F" && grado === "V" && modo === "menor") { //Cm
        //console.log("Gm");
        newMIDI = new MensajeMIDI(name, Cm);
        addMensaje();
    }

    //================== F7 ===============================
    //F7
    if (tono === "F" && grado === "I" && modo === "7ª") { //F7
        //console.log("f7");
        newMIDI = new MensajeMIDI(name, F7);
        addMensaje();
    }
    if (tono === "F" && grado === "IV" && modo === "7ª") { //Bb7
        //console.log("Bb7");
        newMIDI = new MensajeMIDI(name, Bb7);
        addMensaje();
    }
    if (tono === "F" && grado === "V" && modo === "7ª") { //C7
        //console.log("C7");
        newMIDI = new MensajeMIDI(name, C7);
        addMensaje();
    }

    //================== GM ===============================
    //GM
    if (tono === "G" && grado === "I" && modo === "Mayor") { //GM
        //console.log("GM");
        newMIDI = new MensajeMIDI(name, GM);
        addMensaje();
    }
    if (tono === "G" && grado === "IV" && modo === "Mayor") { //CM
        //console.log("CM");
        newMIDI = new MensajeMIDI(name, CM);
        addMensaje();
    }
    if (tono === "G" && grado === "V" && modo === "Mayor") { //DM
        //console.log("DM");
        newMIDI = new MensajeMIDI(name, DM);
        addMensaje();
    }

    //================== Gm ===============================
    //Gm
    if (tono === "G" && grado === "I" && modo === "menor") { //Gm
        //console.log("Gm");
        newMIDI = new MensajeMIDI(name, Gm);
        addMensaje();
    }
    if (tono === "G" && grado === "IV" && modo === "menor") { //Cm
        //console.log("Cm");
        newMIDI = new MensajeMIDI(name, Cm);
        addMensaje();
    }
    if (tono === "G" && grado === "V" && modo === "menor") { //Dm
        //console.log("Dm");
        newMIDI = new MensajeMIDI(name, Dm);
        addMensaje();
    }

    //================== G7 ===============================
    //G7
    if (tono === "G" && grado === "I" && modo === "7ª") { //G7
        //console.log("G7");
        newMIDI = new MensajeMIDI(name, G7);
        addMensaje();
    }
    if (tono === "G" && grado === "IV" && modo === "7ª") { //C7
        //console.log("Cm");
        newMIDI = new MensajeMIDI(name, C7);
        addMensaje();
    }
    if (tono === "G" && grado === "V" && modo === "7ª") { //D7
        //console.log("Dm");
        newMIDI = new MensajeMIDI(name, D7);
        addMensaje();
    }
    //================== AM ===============================
    //AM
    if (tono === "A" && grado === "I" && modo === "Mayor") { //AM
        //console.log("AM");
        newMIDI = new MensajeMIDI(name, AM);
        addMensaje();
    }
    if (tono === "A" && grado === "IV" && modo === "Mayor") { //DM
        //console.log("DM");
        newMIDI = new MensajeMIDI(name, DM);
        addMensaje();
    }
    if (tono === "A" && grado === "V" && modo === "Mayor") { //EM
        //console.log("EM");
        newMIDI = new MensajeMIDI(name, EM);
        addMensaje();
    }

    //================== Am ===============================
    //Am
    if (tono === "A" && grado === "I" && modo === "menor") { //Am
        //console.log("AM");
        newMIDI = new MensajeMIDI(name, Am);
        addMensaje();
    }
    if (tono === "A" && grado === "IV" && modo === "menor") { //Dm
        //console.log("DM");
        newMIDI = new MensajeMIDI(name, Dm);
        addMensaje();
    }
    if (tono === "A" && grado === "V" && modo === "menor") { //Em
        //console.log("EM");
        newMIDI = new MensajeMIDI(name, Em);
        addMensaje();
    }

    //================== A7 ===============================
    //A7
    if (tono === "A" && grado === "I" && modo === "7ª") { //A7
        //console.log("AM");
        newMIDI = new MensajeMIDI(name, A7);
        addMensaje();
    }
    if (tono === "A" && grado === "IV" && modo === "7ª") { //D7
        //console.log("DM");
        newMIDI = new MensajeMIDI(name, D7);
        addMensaje();
    }
    if (tono === "A" && grado === "V" && modo === "7ª") { //Em
        //console.log("EM");
        newMIDI = new MensajeMIDI(name, E7);
        addMensaje();
    }

    //NULL Vacío
    if (tono === "NULL" && grado === "NULL" && modo === "NULL") { //NULL
        //console.log("NULL");
        newMIDI = new MensajeMIDI(name, vacio);
        addMensaje();
    }

    //console.log(mensajeNota);
}
//============================= FIN COMPROBACIÓN MENSAJES ====================



//Agregar Mensajes MIDI al array "mensajeNota []"
function addMensaje() {
    mensajeNota.push(newMIDI);
    //console.log(mensajeNota);
}

//Crea las nuevas clases de los mensajes MIDI
function MensajeMIDI(nombre, acorde) {
    this.nombre = nombre;
    this.acorde = acorde;
}