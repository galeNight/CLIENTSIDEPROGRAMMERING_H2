import { ignore,ignore2 } from "./modules/filter.mjs";  //imports a const from a nother skript and usses them


const swapiapp = (async function(){
    const SWAPIURL = "https://swapi.dev/api"
    const navBar = document.querySelector(".navbar")
    const cardcontainer = document.querySelector(".cardcontainer")
    const pageing = document.querySelector("#pageing")

    try{ // metod to get and await data
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

    async function navClick(e){ // create a click and activate funtion on navbar 
        e.preventDefault();
        document.querySelector(".active")?.classList.remove("active");
        this.classList.add("active")
        let Data = await GetData(this.href)
        showData(Data);
    }
    
    function showData(Data) { // display api data in a grid
        cardcontainer.style.display="grid"
        cardcontainer.innerHTML="";
        document.querySelector("#pageing").innerHTML="";
        
        if(Data.previous != null){
            const btnprev=document.createElement("a")
            btnprev.addEventListener("click",Page);
            btnprev.innerText="< prev";
            btnprev.href=Data.previous
            document.querySelector("#pageing").appendChild(btnprev);
        }

        if(Data.next != null){
            const btnNext=document.createElement("a")
            btnNext.addEventListener("click",Page);
            btnNext.innerText="Next >";
            btnNext.href=Data.next;
            document.querySelector("#pageing").appendChild(btnNext);
        }

        Data.results.forEach(DataItem => { 
            let card = document.createElement("div");
            card.className = "card";
            for (let [k, v] of Object.entries(DataItem)) {
                if (ignore.includes(k)) {continue;}// removes specific data from the json object
                card.insertAdjacentHTML("beforeend", `<span class="key">${k.replace("_", " ")}</span>: <span class="val">${v}</span><br>`);
            }
            card.addEventListener("click",()=>{
                showCardInfo(DataItem);
            });
            cardcontainer.appendChild(card);
        });
    }

    async function Page(e){ // create a function to a new page
        e.preventDefault();
        const Data=await GetData(this.href);
        showData(Data)
    }

    function showCardInfo(DataItem){ // show card Info when is click on
        cardcontainer.style.display="block"
        cardcontainer.innerHTML ="";
        const card =document.createElement("div");
        card.className ="active card"

        for(let [k,v] of Object.entries(DataItem)){
            if(!Array.isArray(v)){
                if(ignore2.includes(k)){ continue}
                card.insertAdjacentHTML("beforeend", `<span class="key">${k.replace("_", " ")}</span>: <span class="val">${v}</span><br>`);
            }
            else{
                let list = document.createElement("ul")
                list.style="list-style-type:none"
                list.insertAdjacentHTML("beforeend",`<br><li class="key">${k.replaceAll("_", " ")}</li>`);

                if (v.length!=0){
                    let listcon=document.createElement("li")
                    let inList=document.createElement("ul")
                    inList.style="list-style-type: none; text-indent: 2rem"
                    v.forEach(Element =>{
                        inList.insertAdjacentHTML("beforeend",`<li class="val">${Element}</li>`);
                    });
                    inList.insertAdjacentHTML("beforeend",`<br>`);
                    listcon.appendChild(inList)
                    list.appendChild(listcon)
                }
                card.appendChild(list)
            }
        }
        cardcontainer.appendChild(card);
        //hide the prev and nex button when click on a card
        const btnprev = pageing.querySelector("a:first-child")
        const btnNext = pageing.querySelector("a:last-child")
        btnprev.style.display = "none"
        btnNext.style.display = "none"
    }

    async function GetData(url){ // get data from a url
        const response = await fetch(url)
        return await response.json();
        
    }

})();


//clock timer for array img swap every 1.6 min count in milisec

// document.addEventListener("DOMContentLoaded",function(Event){
   
//     var imgSource = ["../img/andromedaGalaxy.jpg","../img/NebulaPink.jpg","../Nebulacolor.jpg"]
//     var currentindex=0;
//     function swapImg(){
//         currentindex=(currentindex+1)%imgSource.length;
//         document.querySelector(".wrapper").style.backgroundImage =`url(${imgSource[currentindex]})`
//     }
//     setInterval(swapImg,100000)
// })
