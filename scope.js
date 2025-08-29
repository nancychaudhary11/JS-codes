/** Global scope */
var name = "Nancy"
console.log(name); 

function fun(){
    console.log(name); // can access global variable
}
fun()

/** Function scope */
function fun()
{
    var num =20
    console.log(num)
}
fun()
