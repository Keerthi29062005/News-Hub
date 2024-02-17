const url = 'https://google-news13.p.rapidapi.com/latest?lr=en-US';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '9e8a2e21dfmshcc3d1f45e62e3b9p1e0b7djsna1c0f8d687e8',
        'X-RapidAPI-Host': 'google-news13.p.rapidapi.com'
    }
};
window.addEventListener('load',() => fetchNews("latest"));
async function fetchNews(query){
    try {
        const res = await fetch(url,options);
        const data = await res.json();
        console.log(data);
        if (data.status === 'error') {
            console.error('Error:', data.message);
            return; // Stop further execution if there's an error
        }

        if (!data.items || !Array.isArray(data.items)) {
            console.error('No articles found or invalid data format.');
            return;
        }
        bindData(data.items);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

function bindData(items) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("temp");
    cardsContainer.innerHTML ="";
    items.forEach((item) =>{
        if(!item.images || !item.images.thumbnail) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,item);
        cardsContainer.appendChild(cardClone);
    });

}
function fillDataInCard(cardClone,item) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
console.log('Item:',item);
    newsImg.src = item.images.thumbnail;
    newsTitle.innerHTML = item.title;
cardClone.firstElementChild.addEventListener('click',()=> {
    window.open(item.newsurl, "_blank");
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
