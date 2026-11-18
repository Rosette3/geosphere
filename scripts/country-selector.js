import { Countrylist } from "../database/countries.js";
import { news } from "../database/news.js";
console.log("COUNTRY SELECTOR MODULE LOADED");

function selectcountry(countryName) {
    console.log(news);
    const panel =
        document.getElementById("panel")
    panel.classList.add("active")
    const country =
        Countrylist[countryName];
        if (!country) return;
        console.log("Selected:", country.name);

    let newsHTML = "";
    let newsCount = 0;

    for (let selected of news) {
        
        if (selected.country === country.name) {
            newsCount++;
            newsHTML += `
                <div class="panel-news-card">
                <h>${selected.title}</h>
                <div class="country-row"><sac>${selected.country}</sac><img class="Flags"
                src="Flags/${selected.image_set}"></div>
                <p class="date">${selected.date}</p class="date">
                <img class="Newsac" src="News/${selected.news_image}"</img class="Newsac">
                <p class="description">${selected.desc}</p class="description">
                </div>
            `;
        }
    }
    console.log(newsCount);
    if (newsCount === 0) {
        newsHTML = `
            <div class="no-news">
                Nothing to report here yet. Check back later for future articles.
            </div>
        `;
    }


    document.getElementById("newsText").innerHTML = `

        <img class="banner"
        src="Cities/${country.city}">
    
        <div class="CountryHeader">
        <p class="gh">${country.name}</p>
        <p class="gn">${country.fullname}</p class="gn">
        <img class="sc"
        src="Flags/${country.flag}">
        </div>

        <p class="gp">Region ${country.region}</p class="gp">
        <p class="gp">Capital ${country.capital}</p class="gp">
        <p class="gp">Population ${country.population}</p class="gp">
        <p class="gp">Government ${country.government}</p class="gp">
        <p class="gd">${country.description}</p class="gd">

        <div class="gnc">
        ${newsHTML}
        </div class="gnc">
        
    `;
    console.log("country clicked");
    
}
function unselectcountry() {
    const panel =
        document.getElementById("panel")
    panel.classList.remove("active")
    console.log("unselected");
}


// Expose functions to HTML
window.selectcountry = selectcountry;
window.unselectcountry = unselectcountry;






