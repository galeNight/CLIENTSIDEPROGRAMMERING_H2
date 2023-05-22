const btnOff = document.getElementById("btnOff");
const btnOn = document.getElementById("BtnON");
const imgLamp = document.getElementById("imgLamp");

btnOff.addEventListener("click",function (e) {
    const kontakt = confirm("vil du slukke lampen");
    if(kontakt==false)
    {
    }
    else
    {
        imgLamp.src="../img/pic_bulboff.gif"
        imgLamp.className="tilleft"
    }
    
})
btnOn.addEventListener("click",function (e) {
    imgLamp.src="../img/pic_bulbon.gif"
    imgLamp.className="tilright"
    //imgLamp.classList.toggle("tilleft")
})