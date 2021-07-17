//declaramos variable
var txtCod=document.getElementById("txtCod");
var txtNom=document.getElementById("txtNom");
var txtApe=document.getElementById("txtApe");
var txtCor=document.getElementById("txtCor");
var tbRegistro=document.getElementById("tbRegistro");
var btnActualizar=document.getElementById("btnActualizar");

// function writeUserData(nm, ap, cr) {
//     database.ref('registro/').set({
//         nombre: nm,
//         apellido: ap,
//         correo: cr
//     });
// }

//creamos un procedimiento para buscar datos
function Buscar(codigo) {
    //seleccionamos la tabla 
    var db = database.ref().child("registro");
    db.once("value").then(function (snapshot) {
        snapshot.forEach(function (data) {
            //declarar una variable para el codigo de la tabla
            var key = data.key;
            //evaluamos que el key de la tabla sea igual al codigo buscado 
            if(key == codigo) {
                var cod = key;
                var nom = data.val().nombre;
                var ape = data.val().apellido;
                var cor = data.val().correo;
                //enviasmos los datos a los controles 
                txtCod.value = cod;
                txtNom.value = nom;
                txtApe.value = ape;
                txtCor.value = cor;

            }
        });
    });
}

//crear un procedimiento para limpiar
function Limpiar(){
    txtNom.value="";
    txtApe.value="";
    txtCor.value="";
    txtNom.focus();
}

function Mostrar(){
    var i = 0;
    tbody = document.querySelector("#tbRegistro tbody");
    tbody.innerHTML = "";

    var db = database.ref().child("registro");
    db.once("value",function (snapshot) {
        if (snapshot.exists()) {
            snapshot.forEach(function (data){
                var nom = data.val().nombre;
                var ape = data.val().apellido;
                var cor = data.val().correo;

                var fila = tbody.insertRow(i);

                var titulonombre = fila.insertCell(0);
                var tituloapellido = fila.insertCell(1);
                var titulocorreo = fila.insertCell(2);
                var tituloact = fila.insertCell(3);
                var titulocor = fila.insertCell(4);
                //agregamos los valores
                titulonombre.innerHTML = nom;
                tituloapellido.innerHTML = ape;
                titulocorreo.innerHTML = cor;
                tituloact.innerHTML =
                "<a href='#' onclick=Buscar('" + cod + "')>Seleccionar</a>";
                titulocor.innerHTML = "<a href='#' onclick=Eliminar('" + cod + "')>Seleccionar</a>";

                tbody.appendChild(fila);
                i++;
            });
        }
    });
}

window.onload = Mostrar;


function Registrar(){
    if(txtNom.value=="" || txtNom.value==null){
        alert("Ingrese su nombre");
        txtNom.focus();
    }else if(txtApe.value=="" || txtApe.value==null){
        alert("Ingresa su apellido");
        txtApe.focus();
    }else if(txtCor.value=="" || txtCor.value==null){
        alert("Ingrese su correo");
        txtCor.focus();
    }else{
        var nom=txtNom.value;
        var ape=txtApe.value;
        var cor=txtCor.value;
        
        var db=database.ref('registro');

        var registros=db.push();

        registros.set({
            'nombre': nom,
            'apellido': ape,
            'correo': cor,
        });
        alert("Se registro los datos");
        Limpiar();
        Mostrar();
    }
}
//creamos el procedimiento para actualizar 
function Actualizar() {
    //capturando valores
    var cod=txtCod.value;
    var nom=txtNom.value;
    var ape=txtApe.value;
    var cor=txtCor.value;
    //seleccionamos la tabla que vamos a actualizar
    var db = database.ref("registro/" + cod);
    //le pasamos los datos que vamos a actualizar 
    db.update({
            nombre: nom,
            apellido: ape,
            corre: cor
        });
        alert("se actualizo el dato");
        //llamamos al procedimi8ento limpiar 
        Limpiar();
        //llamamos al procedimiento mostrar
        Mostrar();
}
//creamos un procedimiento para eliminar 
function Eliminar(codigo){
    //preguntamos si quiere eliminar
    var result=confirm("¿Estás seguro que quieres eliminar?");
    //evaluamos la respuesta
    if(result){
        //pasamos el codigo al registro que se va a eliminar 
        var cod=codigo;
        //selecionamos la tabla con el codigo correspondiente para eliminarla
        var db = database.ref("registro/" + cod).remove();
        alert("se elimino el dato");
        //llamamos al la funcion limpiar
        Limpiar();
        //llamamos a la funcion mostrar
        Mostrar();
    }
}
//llamamos al la funcion registrar en el boton
btnRegistrar.addEventListener("click", Registrar);
btnActualizar.addEventListener("click", Actualizar);
