/*
====================== INSTANCIACIÓN ELEMENTOS DOM ==================
*/


document.getElementById('addClass').addEventListener('click', onAddClass);


//====================== DATOS SELECT =======================
//Tonalidad
function CambiarTonalidad(nombre) {
    var CambiarT = document.getElementById('SelTono' + nombre);
    var displayT = CambiarT.options[CambiarT.selectedIndex].text;
    //console.log(displayT);
    return displayT;
}

//Grado
function CambiarGrado(nombre) {
    var CambiarG = document.getElementById('SelGrado' + nombre);
    var displayG = CambiarG.options[CambiarG.selectedIndex].text;
    //console.log(displayG);
    return displayG;

}

//MODO
function CambiarModo(nombre) {
    var CambiarM = document.getElementById('SelModo' + nombre);
    var displayM = CambiarM.options[CambiarM.selectedIndex].text;
    //console.log(displayM);
    return displayM;

}

//=================================================================

let Camara;
let RelacionCamara;
let SketchCanvas;
let CartaMensaje;

let Basedatos = [];
let clases = [];
let clase;
const CLASS_LIMIT = 5;

let foto;

let UsoEtiqueta = "vacio";
let Ultimoacorde = [];
let Etiqueta;
let modelo;
let knn;
let Clasificado = false;
let CargandoNeurona = false;

let notePlay = [];

//===================================================================

//Recoje el valor del campo texto y llama a la funcion "addClase(nombre)"
function onAddClass() {
    //console.log("dentro");
    addClase(document.getElementById('TextBox').value); //Toma el valor del input
    document.getElementById('TextBox').value = ""; //Limpia el input
}



//Añande el HTML de la clase
function addClase(nombre) {
    if (exist(nombre) || clases.length >= CLASS_LIMIT || nombre == "") return; //comprueba que la clase sea correcta

    //Dibuja el HTML
    clase = document.getElementById('clases');
    clase.innerHTML += `
        <div class="col s12">
            <div id="panel${nombre}" class="card-panel red accent-1 center align">
                <span class="white-text">${nombre}</span>
                <div class= "progress">
                    <div id="animacion${nombre}" class="determinate yellow" style="width: 0%"></div>
                </div>

                <div class="row">
                    <div class="col s12 center-align">
                        <a id="foto${nombre}" class="btn-floating btn-large waves-effect light-green" title="Captura" onclick ="captura('${nombre}')"><i class="material-icons">add_a_photo</i></a>  
                    </div>
                    <div id="train${nombre}"></div>

                    <div id="inputTono" class="col s4">
                        <label class="white-text">TONALIDAD</label>
                        <select id="SelTono${nombre}" class="browser-default" onchange="CambiarTonalidad('${nombre}')">
                            <option value="" disabled selected>Tono</option>
                            <option value="1">C</option>
                            <option value="2">F</option>
                            <option value="3">G</option>
                            <option value="4">A</option>
                            <option value="5">NULL</option>
                        </select>
                    </div>

                    <div id="inputGrado" class="col s4">
                        <label class="white-text">GRADO</label>
                        <select id="SelGrado${nombre}" class="browser-default" onchange="CambiarGrado('${nombre}')">
                            <option value="" disabled selected>Grado</option>
                            <option value="1">I</option>
                            <option value="1">IV</option>
                            <option value="2">V</option>
                            <option value="3">NULL</option>
                        </select>
                    </div>
                    
                    <div id="inputModo" class="col s4">
                        <label class="white-text">MODO</label>
                        <select id="SelModo${nombre}" class="browser-default" onchange="CambiarModo('${nombre}')">
                            <option value="" disabled selected>Modo</option>
                            <option value="1">Mayor</option>
                            <option value="2">menor</option>
                            <option value="3">7ª</option>
                            <option value="4">NULL</option>
                        </select>
                    </div>      
                </div> 
            </div> 
        </div>    
    `

    clases.push(nombre); //Inserta en el array el nombre de la clase
}



//Toma una captura de video como ejemplo
function captura(nombre) {
    if (validar(nombre) === true) {
        let img = new Image();

        //Elimina el boton de captura
        var btnFoto = document.getElementById('foto' + nombre);
        btnFoto.parentNode.removeChild(btnFoto);

        //Dibuja la captura de la cámara
        foto = document.getElementById('captura');

        foto.innerHTML += ` 
        <img id="foto${nombre}" class="center" src = "${img.src = SketchCanvas.elt.toDataURL()}" width="100" height="100">  
    `

        //Representa el Botón de entrenar
        var captura = document.getElementById('train' + nombre);

        captura.innerHTML += `
        <div id="centrado" class="col s12 center-align">
            <a id="btntrain${nombre}" class="btn-floating btn-large waves-effect blue darken-1" title="Entrenar" onclick ="Entrenar('${nombre}')"><i class="material-icons">accessibility</i></a>  
            <div class="col s12">
                <table class="centered">
                    <thead>
                        <tr>
                            <th class="white-text">Tono</th>
                            <th class="white-text">Grado</th>
                            <th class="white-text">Modo</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td class="white-text">${CambiarTonalidad(nombre)}</td>
                            <td class="white-text">${CambiarGrado(nombre)}</td>
                            <td class="white-text">${CambiarModo(nombre)}</td>
                        </tr>
                    </tbody>    
                </table>
            </div>
        </div>
        `
        //Crea las nuevas clases de objetos
        newDatos = new DatosCaptura(nombre, CambiarTonalidad(nombre), CambiarGrado(nombre), CambiarModo(nombre));

        //Almacena el nuevo objeto en el array
        AddDatos();

        CapturaDatos(); //Envia a notas.js los datos capturados en "Basedatos[]"


        //Elimina los select
        var selTono = document.getElementById('inputTono');
        selTono.parentNode.removeChild(selTono);

        var selModo = document.getElementById('inputModo');
        selModo.parentNode.removeChild(selModo);

        var selGrado = document.getElementById('inputGrado');
        selGrado.parentNode.removeChild(selGrado);
    }
}

function setup() {
    let ObtenerCanva = document.getElementById('input');
    let AnchoCanvas = ObtenerCanva.offsetWidth;

    CartaMensaje = document.getElementById('CartaMensaje');
    CartaMensaje.innerHTML = "Cargando APP..."

    Camara = createCapture(VIDEO);
    Camara.hide();
    RelacionCamara = Camara.height / Camara.width;
    let AltoCanvas = AnchoCanvas * RelacionCamara;
    SketchCanvas = createCanvas(AnchoCanvas, AltoCanvas);
    SketchCanvas.parent('input');

    //Neurona
    modelo = ml5.featureExtractor('MobileNet', ModeloListo);
    knn = ml5.KNNClassifier();
}



function draw() {
    translate(width, 0);
    scale(-1, 1);
    image(Camara, 0, 0, width, height);

    let RelacionCamara2 = Camara.height / Camara.width;
    if (RelacionCamara != RelacionCamara2) {
        let Ancho = width;
        let Alto = Ancho * RelacionCamara2;
        RelacionCamara = RelacionCamara2;
        console.log("Cambiado " + Ancho + " - " + Alto);
        resizeCanvas(Ancho, Alto, true);
    }


    if (knn.getNumLabels() > 0 && !Clasificado) {
        setInterval(clasificar, 500); //Intervalo de clasificación
        Clasificado = true;
    }
}



//=============================== FUNCIONES ===============================
//Neurona
function ModeloListo() {
    console.log("Modelo Listo");
    CartaMensaje.innerHTML = "Modelo Listo";
}


//Entrenar
function Entrenar(nombre) {
    console.log("entrenando" + nombre);
    var logits = modelo.infer(Camara);
    knn.addExample(logits, nombre);
}


//Clasificar
function clasificar() {
    if (Clasificado) {
        var logits = modelo.infer(Camara);
        knn.classify(logits, function (error, result) {
            if (error) {
                console.log("Error en Clasificar", error);
            } else {
                //console.log(result);
                Etiqueta;
                var Confianza;

                Etiqueta = result.label;
                Confianza = Math.ceil(result.confidencesByLabel[result.label] * 100);

                CartaMensaje.innerHTML = Etiqueta + " - " + Confianza + "%";

                updateBar(result);
                
                //Activa la secuencia armónica según la etiqueta detectada
                for (let i = 0; i < mensajeNota.length; i++) {
                    if (mensajeNota[i].nombre == Etiqueta) {
                        if (UsoEtiqueta != Etiqueta) {
                            UsoEtiqueta = mensajeNota[i].nombre;
                            MensajeOFF(Ultimoacorde);
                            Ultimoacorde = mensajeNota[i].acorde;
                            //console.log(Ultimoacorde);
                            MensajeON(Ultimoacorde);
                            //console.log("si");
                        } 
                    }
                }

            }
        });
    }
}


//Borrar Neurona
function RefreshNeurona() {
    console.log("Borrado HTML");

     //MensajeOff MIDI
     MensajeOFF(Ultimoacorde);

    //Vaciado Array
    Basedatos = [];
    mensajeNota = [];
    clases = [];
    Ultimoacorde = [];

    UsoEtiqueta = "vacio";
   
    clase = document.getElementById('clases');
    clase.innerHTML = ``; //Elimina El HTML

    foto = document.getElementById('captura');
    foto.innerHTML = ``;

    if (Clasificado) {
        Clasificado = false;
        clearInterval(clasificar);
        knn.clearAllLabels();
        CartaMensaje.innerHTML = "Neurona Borrada";

        clase = document.getElementById('clases');
        clase.innerHTML = ``; //Elimina El HTML

        foto = document.getElementById('captura');
        foto.innerHTML = ``;
    }
}


//-----------------------------------------------------------

//Actualiza las barras de confianza
function updateBar(result) {
    let results = result.confidencesByLabel;

    for (const key in results) {
        document.getElementById("animacion" + key).style.width = results[key].toFixed(3) * 100 + "%";
    }
}


//Validacion de select
function validar(nombre) {
    if (document.getElementById('SelTono' + nombre).value == "") {
        M.toast({
            html: 'Selecciona una tonalidad',
            displayLength: 2000,
            classes: 'red lighten-1 rounded'
        });
        return false;
    }
    if (document.getElementById('SelModo' + nombre).value == "") {
        M.toast({
            html: 'Selecciona un Modo',
            displayLength: 2000,
            classes: 'red lighten-1 rounded'
        });
        return false;
    }
    if (document.getElementById('SelGrado' + nombre).value == "") {
        M.toast({
            html: 'Selecciona un Grado',
            displayLength: 2000,
            classes: 'red lighten-1 rounded'
        });
        return false;
    }
    return true;
}

//Comprueba que la clase no exista
function exist(nombre) {
    //console.log(nombre);
    return (clases.includes(nombre)); //Devuelve los nombres del array clases
}


//Redimensiona la pantalla con el Navegador
function windowResized() {
    let ObtenerCanva = document.getElementById('input');
    let Ancho = ObtenerCanva.offsetWidth;
    let Alto = Ancho * RelacionCamara;
    resizeCanvas(Ancho, Alto);
}



//Crea el objeto y lo guarda en "Basedatos[]"
function AddDatos() {
    Basedatos.push(newDatos);
    console.log(Basedatos);
}


function DatosCaptura(nombre, tonalidad, grado, modo) {
    this.nombre = nombre;
    this.tonalidad = tonalidad;
    this.grado = grado;
    this.modo = modo;
}