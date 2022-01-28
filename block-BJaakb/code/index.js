function fetch (url){
 return new Promise((resolve,reject)=>{
     let xhr= new XMLHttpRequest();
     xhr.open(`GET`,url);
     xhr.onload=()=>resolve(JSON.parse(xhr.response));
     xhr.onerror=()=>reject("Something went wrong");
     xhr.send();

 })
}

let data= fetch(url).then((data)=>{
    console.log(data.name);
})
.catch((error)=>{
    alert("Check your Internet Connection");
})