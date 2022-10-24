
function loguear(){

    let user = document.getElementById("usuario").value;
    let pass = document.getElementById("clave").value;

    if(user=="Angel" && pass=="12345" || user=="Estuardo" && pass=="123456"){
        window.location="principal.html";
    } else {
        alert("Datos Incorrectos")
    }
}