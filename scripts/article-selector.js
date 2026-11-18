console.log("ARTICLE SCRIPT IS RUNNING");
import { news } from "../database/news.js";

const params = new URLSearchParams(window.location.search);
const articleId = (params.get("id") || "").toLowerCase();

const article = news.find(
    item => String(item.id).toLowerCase() === articleId.toLowerCase()
);

const status = document.getElementById("article-status");

if (!article) {
    document.getElementById("article-title").textContent =
        "Article Not Found";

    if (status) {
        status.textContent = `No article found for ID "${articleId}".`;
    }
} else {
    document.title = `${article.title} | GEOSPHERE`;

    // Main heading
    document.getElementById("article-title").textContent = article.title;

    // Article description
    document.getElementById("article-description").textContent = article.desc;

    // Article information
    const fields = {
        "article-category": article.category,
        "article-country": article.country,
        "article-date": article.date,
        "article-author": article.author,
        "article-content": article.content
    };

    for (const [id, value] of Object.entries(fields)) {
        const element = document.getElementById(id);

        if (element) {
            element.textContent =
                value !== "" && value != null ? value : "Not specified";
        }
    }

    // Article image
    const image = document.getElementById("article-image");

    if (image) {
        image.src = `News/${article.news_image}`;
        image.alt = article.title;

        image.onerror = () => {
            console.error("Article image failed to load:", article.news_image);
        };
    }

    if (status) {
        status.textContent = "Article loaded successfully.";
    }
}