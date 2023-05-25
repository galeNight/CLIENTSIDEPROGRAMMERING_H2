 const swapiapp = (async function(){
    const SWAPIURL = "https://swapi.dev/api"
    const navBar = document.querySelector(".navbar")
    const cardcontainer = document.querySelector(".cardcontainer")
    try{
        const response = await fetch(SWAPIURL)
        const jsonData = await response.json();
        for(let key in jsonData){
            let navItem = document.createElement("a");
            navItem.addEventListener("click",navClick)
            navItem.className="navItem"
            navItem.innerText=key;
            navItem.href=jsonData[key];
            navBar.appendChild(navItem);
        }
    }
    catch(error){
        console.log(error);
    }
    async function navClick(e){
        e.preventDefault();
        let Data = await GetData(this.href)
        console.log(this.href);
        Data.results.forEach(DataItem =>{
            let card = document.createElement("div");
            card.className="card"
            // card.innerText=DataItem.name;
            for(let[k,v] of Object.entries(DataItem)){
                card.insertAdjacentHTML("beforeend",`<span class="key">${k}</span><span class="val">${v}</span><br>`)
            }
            cardcontainer.appendChild(card); 
        })
        // console.log(Data)
    }
    async function GetData(url){
        const response = await fetch(url)
        return await response.json();
    }
})();