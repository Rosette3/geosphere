import { news } from "../../database/news.js";

function GenerateHeadlines() {

    // Sort news by date and time
    const sortedNews = [...news].sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}:00Z`);
        const dateB = new Date(`${b.date}T${b.time}:00Z`);

        return dateB - dateA;
    });

    // Get the newest article
    const featured = sortedNews[0];

    // Get HTML containers
    const featuredContainer = document.getElementById("featured-headline");
    const latestContainer = document.getElementById("latest-news");

    // Display featured article
    featuredContainer.innerHTML = `
    <a href="article.html?id=${featured.id}" class="headline-link">
        <span class="headline-label">TOP STORY</span>
        <h2>${featured.title}</h2>
        <p>${featured.desc}</p>
        <span class="headline-meta">
            ${featured.country} · ${featured.category} · ${featured.date} · ${featured.time} UTC
        </span>
    </a>
    `;

    // Display the next four newest articles
    const latestArticles = sortedNews.slice(1, 5);

    latestArticles.forEach(article => {
        const row = document.createElement("article");
        row.className = "headline-row";

        row.innerHTML = `
        <a href="article.html?id=${article.id}" class="headline-link">
        <h4>${article.title}</h4>
        <p>${article.country} · ${article.category} · ${article.date} ${article.time} UTC</p>
        </a>
        `;

        latestContainer.appendChild(row);
    });
}

GenerateHeadlines();