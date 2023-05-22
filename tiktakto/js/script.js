const gameborard = document.querySelector(".Gameborard")


// gameborard.addEventListener("click",function(e){
// if(e.target.tagName != "BUTTON") return;
// alert(e.target.tagName);
// })


let playerXturn = true
const createEvt = (fields) => {
    fields.forEach(btn => {
        btn.addEventListener("click", (e) => {
            if(e.target.innerText !== "") return;{
                e.target.innerText = playerXturn ? "X": "O"
                if(isWinnerFound()) alert("vinner found")
                playerXturn = ! playerXturn;
            }
        })
    });
};
/*OO O1 O2
  1O 11 12
  2O 21 22 */
  
const isWinnerFound = () =>{
    if(document.querySelector("#r0c0").innerText === document.querySelector("#r0c1").innerText &&
      document.querySelector("#r0c0").innerText === document.querySelector("#r0c2").innerText &&
      document.querySelector("#r0c0").innerText !==""
    )
    return true;
}

const init = () =>{
    // for (let i=0;i<9;i++){
    //     let btn = document.createElement("button");
    //     btn.className ="field";
    //     gameborard.appendChild(btn)
    // }
    for (let row = 0; row < 3; row++){
        for(let col = 0; col < 3; col++) {
            let btn = document.createElement("button");
            btn.className = "field";
            btn.id=`r${row}c${col}`;
            gameborard.appendChild(btn);
        }
    }

    const fields =document.querySelectorAll(".field");
    createEvt(fields);
}
init();