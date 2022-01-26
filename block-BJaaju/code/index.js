let searchInput=document.querySelector(`input`);
let root=document.querySelector(`ul`);

function url(query){
    return (`https://api.unsplash.com/search/photos?query=${query}&client_id=CMt9OH14UL9j99JuSVDnK6ymaKeord44BxiqTF_70nk;`);
}



searchInput.addEventListener(`keyup`,handleButton);

function handleButton(event){
    if (event.keyCode===13){
    let xhr=new XMLHttpRequest();
    
    xhr.open('GET',url(event.target.value))
    xhr.onload=function(){
        root.innerHTML="";
        let data=JSON.parse(xhr.response);
        data.results.forEach(elm => {
            const img=document.createElement("img");
            img.src=elm.urls.small;
            img.classList.add("search_image");
            root.append(img)
        });   
    }
    xhr.send();
    event.target.value="";
}
}
   
