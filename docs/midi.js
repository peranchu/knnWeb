//Control de los Mensajes MIDI desde el navegador

//=============================================
let conexion = false;
let selection;
let device;

let estado = false;



let midiOut = [];

function desconectar(){
    WebMidi.disable();
    document.getElementById('SelOUT').value = "Salida MIDI";
    M.toast({
        html: "CERRADA CONEXIÓN MIDI",
        displayLength: 2000,
        classes: 'red lighten-1 rounded'
    });
}

//comieza conexión MIDI
function conectar() {
    WebMidi.enable(function (err) {
        if (err) {
            console.log("Error MIDI", err);
            M.toast({
                html: 'Error MIDI',
                displayLength: 2000,
                classes: 'red lighten-1 rounded'
            });
        } else {
            console.log("MIDI Habilitado");
            M.toast({
                html: 'MIDI Habilitado',
                displayLength: 2000,
                classes: 'purple lighten-1 rounded'
            });

            conexion = true;
            initDevices();
        }
    });
}

//Busca las conexiones de salida MIDI del navegador
function initDevices() {
    //reset
    midiOut = [];

    const outputs = WebMidi.outputs.values();
    for (let output = outputs.next(); output && !output.done; output = outputs.next()) {
        midiOut.push(output.value);
    }
    displayDevices();
}

//Imprime en el select los dispositivos MIDI de salida disposibles
function displayDevices() {
    SelOUT.innerHTML = midiOut.map(device => `<option>${device.name}</option`).join('');
}


//Envía el mensaje MIDI por el puerto de salida
function MensajeON(pitch) {
    device = midiOut[SelOUT.selectedIndex];

    device.playNote(pitch, "all", {
        velocity: 100
    });
}

//Envía el mensaje MIDI por el puerto de salida
function MensajeOFF(pitch) {
    device = midiOut[SelOUT.selectedIndex];

    device.playNote(pitch, "all", {
        velocity: 0
    });
}