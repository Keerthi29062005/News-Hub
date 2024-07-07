const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '0ed52ba20bmsh7970921908bcee3p1948afjsn34af86e95e87',
        'X-RapidAPI-Host': 'google-news13.p.rapidapi.com'
    }
};

window.addEventListener('load', () => fetchNews('latest?'));

async function fetchNews(query) {
    try {
        const url = `https://google-news13.p.rapidapi.com/${query}lr=en-US`;
        const res = await fetch(url, options);
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
    cardsContainer.innerHTML = "";
    items.forEach((item) => {
        if (!item.images || !item.images.thumbnail) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, item);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, item) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    console.log('Item:', item);
    newsImg.src = item.images.thumbnailProxied;
    newsTitle.innerHTML = item.title;
    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(item.newsUrl, "_blank");
    });
}

const searchButton = document.getElementById('searchbtn');
const searchText = document.getElementById("searchInput");

function onNav(id) {
    fetchNews(id);
    searchText.value = "";
}

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(`search?keyword=${query}&`);
});
