const gameboard = document.querySelector(".gameboard")
let playerXturn = true; // x firts turn always
let scoreX = 0, scoreO = 0;
function updatescore() { // places a score
    document.querySelector("#scoreX").innerText = "player X" + scoreX
    document.querySelector("#scoreO").innerText = "player O" + scoreO
}
const winner = function () { // checks if you have 3 x or o in eny direction and return true or false
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
    this.innerText = playerXturn ? "X" : "O" //places a x or o
    if (winner() == true) { // checks if ther is a winner
        if (playerXturn) { scoreX++; }
        else { scoreO++; }
        updatescore();
    }
    playerXturn = !playerXturn // turn base
}
for (let row = 0; row < 3; row++) { // makes row and col and have button to clic and places x or o

    for (let col = 0; col < 3; col++) {
        let btn = document.createElement("button");
        btn.id = `R${row}C${col}`
        btn.addEventListener("click", setmark)
        gameboard.appendChild(btn)
    }
}

function NewGame() { // reset the board and keeps the score
    const fields = document.querySelectorAll(".gameboard button")
    fields.forEach(f => {
        f.innerText = "";
    });
    playerXturn = true
}
document.querySelector("#btnNewGame").addEventListener("click", NewGame)

function ResetGame(){ //resets the board and score
    const fields=document.querySelectorAll(".gameboard button")
    fields.forEach(f=>{
        f.innerText="";
    });
    scoreX=0
    scoreO=0
    updatescore()
}
document.querySelector("#btnReset").addEventListener("click",ResetGame)