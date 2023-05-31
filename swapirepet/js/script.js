//import constants from another script
import { ignore,ignore2 } from "./modules/filter.mjs";  

const swapiapp = (async function(){
    const SWAPIURL = "https://swapi.dev/api"
    const navBar = document.querySelector(".navbar")
    const cardcontainer = document.querySelector(".cardcontainer")
    const pageing = document.querySelector("#pageing")
    let activeNavItemIndex=0;

    try{
        //method to get and await data from SWAPIURL
        const response = await fetch(SWAPIURL)
        const jsonData = await response.json();

        //interate over the properties of the json
        for(let key in jsonData){
            let navItem = document.createElement("a");
            navItem.addEventListener("click",navClick)
            navItem.className="navItem"
            navItem.innerText=key;
            navItem.href=jsonData[key];
            //create and add navigation item to the navbar
            navBar.appendChild(navItem);
        }
        //trigger a click event on the first navigaton item
        document.querySelectorAll(".navItem")[0].click();
    }
    // catch eny error and show it in console log
    catch(error){ 
        console.log(error);
    }
    async function navClick(e){ 
        //event handler for navigation item clicks
        e.preventDefault();
        //add the active clas to the clicked navigation item
        // and removes it from det prevuis click item
        document.querySelector(".active")?.classList.remove("active");
        this.classList.add("active")
        activeNavItemIndex=Array.from(navBar.children).indexOf(this)
        let Data = await GetData(this.href)
        //fetch and display data for the selected category
        showData(Data);
    }
    
    function showData(Data) {
        //display data in card container
        cardcontainer.style.display="grid"
        cardcontainer.innerHTML="";
        document.querySelector("#pageing").innerHTML="";
        
        //add pagination buttons if previous and/or nex page are available
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

        //interrate over the resulted and create card element
        Data.results.forEach(DataItem => { 
            let card = document.createElement("div");
            card.className = "card";
            for (let [k, v] of Object.entries(DataItem)) {
                //skip ignored properties
                if (ignore.includes(k)) {continue;}
                //display key-values pairs in the card
                card.insertAdjacentHTML("beforeend", `<span class="key">${k.replace("_", " ")}</span>: <span class="val">${v}</span><br>`);
            }
            card.addEventListener("click",()=>{
                showCardInfo(DataItem);
            });
            //add the card to the card container
            cardcontainer.appendChild(card);
        });
    }

    async function Page(e){
        // Event handler for pagination buttons
        e.preventDefault();
        const Data=await GetData(this.href);
        // Fetch and display data for the selected page
        showData(Data)
    }

    function showCardInfo(DataItem){ 
          // Display detailed information for a card item
        cardcontainer.style.display="block"
        cardcontainer.innerHTML ="";
        const card =document.createElement("div");
        card.className ="active card"
      
        const bactbtncon=document.createElement("div");
        bactbtncon.className="bactbtncon";
        const btnBack=document.createElement("button");
        btnBack.className="btnBack"
        btnBack.innerText ="X";
        btnBack.addEventListener("click",()=>{
             //add the active clas to the clicked navigation item
             // and removes it from det prevuis click item
             // and go back to the active navbar click via activenavitemindex
            document.querySelector(".active")?.classList.remove("active")
            if(activeNavItemIndex>=0&&activeNavItemIndex<navBar.children.length){
                navBar.children[activeNavItemIndex].click();
            }
        });
        bactbtncon.appendChild(btnBack)
        card.appendChild(bactbtncon)
       // Iterate over the properties of the data item
        for(let [k,v] of Object.entries(DataItem)){
            if(!Array.isArray(v)){
                // Skip ignored properties
                if(ignore2.includes(k)){ continue}
                 // Display key-value pairs in the card
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
                // Display nested list in the card
                card.appendChild(list)
            }
        }
        cardcontainer.appendChild(card);

        //hide btnprev and/or btnnext
        const btnprev = pageing.querySelector("a:first-child")
        const btnNext = pageing.querySelector("a:last-child")
        btnprev.style.display = "none"
        btnNext.style.display = "none"
    }

    async function GetData(url){
           // Fetch data from a URL
        const response = await fetch(url)
        return await response.json();
        
    }

})();


// //clock timer for array img swap every 1.6 min count in milisec
// document.addEventListener("DOMContentLoaded",function(Event){
   
//     var imgSource = ["../img/andromedaGalaxy.jpg","../img/NebulaPink.jpg","../Nebulacolor.jpg"]
//     var currentindex=0;
//     function swapImg(){
//         currentindex=(currentindex+1)%imgSource.length;
//         document.querySelector(".wrapper").style.backgroundImage =`url(${imgSource[currentindex]})`
//     }
//     setInterval(swapImg,100000)
// })
