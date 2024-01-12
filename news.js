/*const API_KEY = "9076ed7ff96947499b717fd80a24cea0";
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
})*/

const url = 'https://google-news13.p.rapidapi.com/latest?lr=en-US';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '9e8a2e21dfmshcc3d1f45e62e3b9p1e0b7djsna1c0f8d687e8',
        'X-RapidAPI-Host': 'google-news13.p.rapidapi.com'
    }
};

async function fetchData() {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        displayNews(data.items);
        console.log(data.items);
    } catch (error) {
        console.error(error);
    }
}
function displayNews(items) {
    const cardsContainer = document.getElementById('cards-container');
    const template = document.getElementById('temp');

    // Clear previous content
    cardsContainer.innerHTML = '';

    // Check if articles is defined and not empty
    if (items && items.length > 0) {
        // Create and append news cards
        items.forEach(item => {
            const clone = template.content.cloneNode(true);
            clone.querySelector('#news-img').src = item.image || 'https://via.placeholder.com/400x200';
            clone.querySelector('#news-title').textContent = item.title || 'Title';
            clone.querySelector('#news-desc').textContent = item.description || 'Description';

            cardsContainer.appendChild(clone);
        });
    } else {
        // Display a message or handle the case where no articles are available
        cardsContainer.innerHTML = '<p>No news available</p>';
    }
}


// Initial load of news
fetchData();

// Function to handle navigation
function onNav(category) {
    // You can implement logic to filter news by category here
    // For now, let's just reload all news
    fetchData();
}

