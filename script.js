import { news } from "../../database/news.js";

const RandomArticles = document.getElementById("RandomArticles")

//News generated onload
window.onload = function () {
    GenerateNews();
}

//Random Article generated onclick
RandomArticles.onclick = function(){
    GenerateNews();
}

//The function to GenerateNews
function GenerateNews() {
    let usedIndexes = [];
    for (let i = 1; i <= 6; i++) {
        let randomindexgen;
        do { randomindexgen = Math.floor(Math.random() * news.length)}
        while (
            usedIndexes.includes(randomindexgen)
        );
        usedIndexes.push(randomindexgen);
        selected = news[randomindexgen];
        container = document.getElementById("news-container" + i);

        //News information randomized ! ! !
        container.innerHTML = `
            <h>${selected.title}</h>
            <div class="country-row">
            <sac>${selected.country}</sac>
            <img class="Flags" src="Flags/${selected.image_set}">
        </div>
        <p class="date">${selected.date}</p>
        <img class="News" src="News/${selected.news_image}">
        <p class="description">${selected.desc}</p>
        `;

        container.onclick = function () {
            window.location.href =
            `article.html?id=${encodeURIComponent(selected.id)}`;
        };
        
        container.style.cursor = "pointer";
    }
}
