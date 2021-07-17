//creamos un vector para el producto
var producto=[];
//creamos un procedimiento para refistrar 
//caterogia se va a registrar de un combobox-->selec
function Registrar(nomproducto, preproducto, catproducto, canproducto){
    var NuevoProducto={
        nombre=nomproducto,
        precio:preproducto,
        categoria:catproducto,
        cantidad:canproducto
    };
    registro.push(NuevoProducto);

}
//creamos una funcion para obtener los valores del registro
function Mostrar(){
    return producto;
}