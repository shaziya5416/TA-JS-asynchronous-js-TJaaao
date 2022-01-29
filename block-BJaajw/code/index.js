let url= `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`
let select=document.querySelector("select");
let allNews=[];
let root=document.querySelector("ul")


/*
                <div class="news">
                <img src="istockphoto-1182477852-612x612.jpg">
                <div class="source">
                <h2>NDTV News</h2>
                <p>Something Something.Blah Blah Blah Blah Blah
                    Something Something.Blah Blah Blah Blah Blah
                    Something Something.Blah Blah Blah Blah Blah
                </p>
                <button>Read More</button>
                </div>
                </div>
*/
function selectOptions(sources){
    sources.map(options=>{
        let option=document.createElement("option");
        option.innerText=options;
        option.value=options;
        select.append(option);
        

        /*<option value="arstechnica">Arstechnica</option>
                <option value="nasaspaceflight">NASA Spacelight</option>
                <option value="spacenews">SpaceNews</option>
                <option value="nasa">Nasa</option>
                <option value="spaceflightnow">Spaceflight Now</option>
                <option value="teslarati">Teslarati</option>
                */

    })

}
function newsUI(news){
    root.innerHTML="";
    news.forEach(elm=>{
        let li =document.createElement(`li`);
        li.classList.add("news");
        let img=document.createElement("img");
        img.src = elm.imageUrl;
        let div=document.createElement("div");
        div.classList.add("source");
        let h2=document.createElement("h2");
        h2.innerText=elm.newsSite;
        let p=document.createElement("p");
        p.innerText=elm.summary;
        let a=document.createElement("a");
        a.href=elm.url;
        let button=document.createElement("button");
        button.innerText="Read More"
        a.append(button);
        div.append(h2,p,a);
        li.append(img,div);
        root.append(li);
    })
}
function handleSpineer(status=false){
    if (status){
        root.innerHTML=`<div class="donut"></div>`;
    }
}
function init(){
    handleSpineer(true);
    fetch(url).then((res)=>res.json())
    .then((news)=>{
    handleSpineer();
    allNews=news;
    newsUI(news);
    let AllSources=Array.from(new Set (news.map((elm)=>elm.newsSite)));
    console.log(AllSources);
    selectOptions(AllSources);

});
}

select.addEventListener("change", (event) => {
    let source = event.target.value.trim();
    let filterNews;
    if (source) {
      filterNews = allNews.filter((news) => news.newsSite === source);
    } else {
      filterNews = allNews;
    }
  
    newsUI(filterNews);
  });

