const API_KEY = "9076ed7ff96947499b717fd80a24cea0";
const url='https://newsapi.org/v2/everything?q=';
window.addEventListener('load',() => fetchNews("top-headlines"));
async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("temp");
    cardsContainer.innerHTML ="";
    articles.forEach((article) =>{
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });

}
function fillDataInCard(cardClone,article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
cardClone.firstElementChild.addEventListener('click',()=> {
    window.open(article.url, "_blank");
});
}
function onNav(id) {
    fetchNews(id);
    searchText.value = "";
}

const searchButton = document.getElementById('searchbtn');
const searchText = document.getElementById("searchInput");

searchButton.addEventListener("click",() => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
})
