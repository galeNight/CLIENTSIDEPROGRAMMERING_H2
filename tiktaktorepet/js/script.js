const gameboard = document.querySelector(".gameboard")
let playerXturn = true;
let scoreX = 0, scoreO = 0;
function updatescore() {
    document.querySelector("#scoreX").innerText = "player X" + scoreX
    document.querySelector("#scoreO").innerText = "player O" + scoreO
}
const winner = function () {
    const fields = document.querySelectorAll(".gameboard button")
    for (let i = 0; i < 3; i++) {
        if (// row
            document.querySelector(`#R${i}C0`).innerText === document.querySelector(`#R${i}C1`).innerText &&
            document.querySelector(`#R${i}C0`).innerText === document.querySelector(`#R${i}C2`).innerText &&
            document.querySelector(`#R${i}C0`).innerText !== ""
        ) {
            return true
        }
        if (//col
            document.querySelector(`#R0C${i}`).innerText === document.querySelector(`#R1C${i}`).innerText &&
            document.querySelector(`#R0C${i}`).innerText === document.querySelector(`#R2C${i}`).innerText &&
            document.querySelector(`#R0C${i}`).innerText !== ""
        ) {
            return true
        }
    }
    if ( //diaginal1
        document.querySelector(`#R0C0`).innerText === document.querySelector(`#R1C1`).innerText &&
        document.querySelector(`#R0C0`).innerText === document.querySelector(`#R2C2`).innerText &&
        document.querySelector(`#R0C0`).innerText !== ""
    ) {
        return true
    }
    if ( //diaginal2
        document.querySelector(`#R0C2`).innerText === document.querySelector(`#R1C1`).innerText &&
        document.querySelector(`#R0C2`).innerText === document.querySelector(`#R2C0`).innerText &&
        document.querySelector(`#R0C2`).innerText !== ""
    ) {
        return true
    }
    return false
}
const setmark = function (e) {
    if (this.innerText !== "") { return }
    if (winner() == true) { return; }
    this.innerText = playerXturn ? "X" : "O"
    if (winner() == true) {
        if (playerXturn) { scoreX++; }
        else { scoreO++; }
        updatescore();
        // let w = `player ${playerXturn? "X" : "O"}`
        // alert(w)
    }
    playerXturn = !playerXturn
}
for (let row = 0; row < 3; row++) {

    for (let col = 0; col < 3; col++) {
        let btn = document.createElement("button");
        btn.id = `R${row}C${col}`
        btn.addEventListener("click", setmark)
        gameboard.appendChild(btn)
    }
}

function NewGame() {
    const fields = document.querySelectorAll(".gameboard button")
    fields.forEach(f => {
        f.innerText = "";
    });
    playerXturn = true
}
document.querySelector("#btnNewGame").addEventListener("click", NewGame)

function ResetGame(){
    const fields=document.querySelectorAll(".gameboard button")
    fields.forEach(f=>{
        f.innerText="";
    });
    scoreX=0
    scoreO=0
    updatescore()
}
document.querySelector("#btnReset").addEventListener("click",ResetGame)