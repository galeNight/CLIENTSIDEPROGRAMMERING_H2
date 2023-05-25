const baseurl= "https://swapi.dev/api"
const navbar=document.querySelector(".navbar")

fetch(baseurl)
    .then(res=>{
        return res.json();
    })
    .then(menudata =>{
        for(let menuitem in menudata){
            let navitem = document.createElement("a")
            navitem.addEventListener("click",navclick);
            navitem.className="menubar"
            navitem.innerText = menuitem;
            navitem.href = menudata[menuitem];
            navbar.appendChild(navitem);
        }
    })

async function navclick(e){
    e.preventDefault();
    const data =await getData(this.href)
    console.log(data)
    // alert(this.href)
}

// async function getData(url) {
//     try{
//         const res=await fetch(url);
//         return await res.json();
//     }
//     catch(err){
//         console.log(err);
//     }
// }

// getData();