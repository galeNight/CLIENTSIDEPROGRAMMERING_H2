const url = "https://dog.ceo/api/breeds/image/random";

const obj = [
    {
        firstName:"osker",
        lastname: "von dingdong",
        profision: "bellman at notra dam"
    },
    {
        firstName:"osker",
        lastname: "von dingdong",
        profision: "bellman at notra dam"
    }

];
console.log(Array.isArray(obj))
// for([key,val]of Object.entries(obj));
// function getImg(){
//     fetch(url).then(function (response){
//         if(response.status==200){
//             return response.json();
//         }
//         document.querySelector("#errmsg").style.display = "block"
//     })
//     .then(function(json){
//         console.log(json);
//         // document.querySelector("#pict").src=json.message
//         const img=document.createElement("img");
//         const pictContainer = document.querySelector("#pictContainer");
//         img.src=json.message
//         pictContainer.appendChild(img);
//     })
//      .chach(function(err){
//          console.log(err)
//});
// }

async function getImg() {
    const response = await fetch(url);
    const json = await response.json();
    return json
}

document.querySelector("#getImg").addEventListener("click",async()=>{
    const data = await getImg();
    const img=document.createElement("img");
    img.src=data.message
    const pictContainer = document.querySelector("#pictContainer");
    pictContainer.appendChild(img);
    // console.log(data)
})