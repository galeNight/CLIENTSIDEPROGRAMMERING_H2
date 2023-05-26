import { ignore } from "./modules/filter.mjs";  //imports a const from a nother skript and usses them
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
        document.querySelectorAll(".navItem")[0].click();
    }
    catch(error){
        console.log(error);
    }
    async function navClick(e){
        e.preventDefault();
        document.querySelector(".active")?.classList.remove("active");
        this.classList.add("active")
        let Data = await GetData(this.href)
        showData(Data);
    }
    //mark area you wish to add to a new function showtcut ctrl+shif+r
    function showData(Data) {
        cardcontainer.innerHTML="";
        document.querySelector("#pageing").innerHTML="";
        if(Data.previous!=null){
            const btnprev=document.createElement("a")
            btnprev.addEventListener("click",Page);
            btnprev.innerText="< prev";
            btnprev.href=Data.previous
            document.querySelector("#pageing").appendChild(btnprev);
            //opret knab i pagining
        }
        if(Data.next !=null){
            ////opret knab pagining
            const btnNext=document.createElement("a")
            btnNext.addEventListener("click",Page);
            btnNext.innerText="Next >";
            btnNext.href=Data.next;
            document.querySelector("#pageing").appendChild(btnNext);
        }
        Data.results.forEach(DataItem => {
            let card = document.createElement("div");
            card.className = "card";
            // card.innerText=DataItem.name;
            for (let [k, v] of Object.entries(DataItem)) {
                if (ignore.includes(k)) { continue; }
                card.insertAdjacentHTML("beforeend", `<span class="key">${k.replace("_", " ")}</span>: <span class="val">${v}</span><br>`);
            }
            cardcontainer.appendChild(card);
        });
    }
    async function Page(e){//pageurldata
        e.preventDefault();
        // alert(this.href);
        const Data=await GetData(this.href);
        showData(Data)
    }
    async function GetData(url){
        const response = await fetch(url)
        return await response.json();
    }
})();
//clock timer for array img swap every 1.6 min count in milisec
document.addEventListener("DOMContentLoaded",function(Event){
   
    var imgSource = ["../img/andromedaGalaxy.jpg","../img/NebulaPink.jpg","../Nebulacolor.jpg"]
    var currentindex=0;
    function swapImg(){
        currentindex=(currentindex+1)%imgSource.length;
        document.querySelector(".wrapper").style.backgroundImage =`url(${imgSource[currentindex]})`
    }
    setInterval(swapImg,100000)
})
