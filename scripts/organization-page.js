
import { organizations } from "../database/organizations.js";
import { news } from "../database/news.js";

const params = new URLSearchParams(window.location.search);
const organizationId = params.get("id");

const organization = organizations.find(
    item => String(item.id) === organizationId
);
const profile = document.getElementById("organization-profile");
if (!organization) {
    profile.textContent = "Organization not found.";
} else {

    document.title = `${organization.name} | GEOSPHERE`;

    const logo = document.getElementById("organization-logo");
    logo.src = `Logos/${organization.logo}`;
    logo.alt = `${organization.name} logo`;

    logo.onerror = () => {
        console.error("Organization logo failed to load:", organization.logo);
    };

    const fields = {
        "organization-name": organization.name,
        "organization-abbreviation": organization.abbreviation,
        "organization-type": organization.type,
        "organization-founded": organization.founded,
        "organization-headquarters": organization.headquarters,
        "organization-leader": organization.leader,
        "organization-description": organization.desc
    };

    for (const [id, value] of Object.entries(fields)) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value || "Not specified";
        }
    }

    const website = document.getElementById("organization-website");

    if (website && organization.website) {
        website.href = organization.website;
        website.textContent = organization.website;
    } else if (website) {
        website.textContent = "Not available";
        website.removeAttribute("href");
    }
}

const newsGrid = document.getElementById("organization-news");
const newsStatus = document.getElementById("news-status");

if (!organization) {

    newsStatus.textContent = "Organization not found.";

} else {
    const organizationNews = news.filter(
        article => article.source === organization.name
    );
    if (organizationNews.length === 0) {
        newsStatus.textContent = "No news articles found.";
    } else {
        newsStatus.textContent = "";
        organizationNews.forEach(article => {

            const card = document.createElement("a");
            card.className = "news-card";
            card.href = `article.html?id=${encodeURIComponent(article.id)}`;

            const image = document.createElement("img");
            image.src = `News/${article.news_image}`;
            image.alt = article.title;

            const title = document.createElement("h3");
            title.textContent = article.title;

            const date = document.createElement("p");
            date.textContent = article.date || "Date not specified";

            card.append(image, title, date);
            newsGrid.appendChild(card);
        });
    }

    console.log(`Loaded ${organizationNews.length} articles for ${organization.name}.`);
}
