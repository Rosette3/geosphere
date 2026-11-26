
import { news } from "../database/news.js";
import { factchecks } from "../database/factcheck.js";
import { topics } from "../database/topics.js";

// Get article ID from URL
const params = new URLSearchParams(window.location.search);
const articleId = (params.get("id") || "").toLowerCase();

// Find article
const article = news.find(
    item => String(item.id).toLowerCase() === articleId
);





// Find matching fact-check entry
const factcheck = factchecks.find(
    item => String(item.articleId) === String(article?.id)
);

console.log("Article:", article);
console.log("All factchecks:", factchecks);
console.log("Matched factcheck:", factcheck);
console.log("Summary:", factcheck?.factsummary);

// HTML elements
const status = document.getElementById("article-status");
const evidenceContainer = document.getElementById("article-evidence");
const detailsContainer = document.getElementById("factcheck-details");
const articleFact = document.querySelector(".article-fact");

// Check whether article exists
if (!article) {
    document.title = "Article Not Found | GEOSPHERE";

    document.getElementById("article-title").textContent =
        "Article Not Found";

    if (status) {
        status.textContent = `No article found for ID "${articleId}".`;
    }

} else {

    document.title = `${article.title} | GEOSPHERE`;

    const topic = topics.find(
        item => item.id === article?.topic
    );

    const topicBanner = document.getElementById("article-topic-banner");
    const topicName = document.getElementById("article-topics");
    const topicImage = document.getElementById("article-topic-image");

    if (topicBanner) {
        if (topic) {
            topicName.textContent = topic.name;

            topicImage.src = `topics/${topic.banner}`;
            topicImage.alt = topic.name;
        } else {
            topicBanner.style.display = "none";
        }
    }

    // Main heading
    document.getElementById("article-title").textContent =
        article.title;

    // Article description
    document.getElementById("article-description").textContent =
        article.desc || "Not specified";

    // Article summary and information
    const fields = {
        "article-category": article.category,
        "article-summary-text": factcheck?.factsummary,
        "article-source": article.source,
        "article-date": article.date,
        "article-content": article.content
    };

    for (const [id, value] of Object.entries(fields)) {
        const element = document.getElementById(id);

        if (element) {
            element.textContent =
                value != null && String(value).trim() !== ""
                    ? value
                    : "Not specified";
        }
    }

    // Article image
    const image = document.getElementById("article-image");

    if (image) {
        image.src = `News/${article.news_image}`;
        image.alt = article.title;

        image.onerror = () => {
            console.error(
                "Article image failed to load:",
                article.news_image
            );
        };
    }

    // Fact-check panel
    if (articleFact) {
        articleFact.className = "article-fact";

        if (factcheck) {
            const overallStatus = factcheck.status || "Unverified";

            articleFact.classList.add(
                overallStatus.toLowerCase().replace(/\s+/g, "-")
            );
        }
    }

    if (factcheck) {

        const claims = factcheck.claims || [];
        const count = claims.length;

        // Evidence count
        if (evidenceContainer) {
            evidenceContainer.textContent =
                `${count} ${count === 1 ? "claim" : "claims"} under review`;
        }

        // Display individual claims
        if (detailsContainer) {
            detailsContainer.innerHTML = "";

            claims.forEach(claim => {
                const claimElement = document.createElement("div");

                claimElement.className =
                    `factcheck-claim ${String(claim.status || "unverified")
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`;

                // Claim statement
                const title = document.createElement("h4");
                title.textContent = claim.statement || "No claim provided.";

                // Claim status
                const claimStatus = document.createElement("span");
                claimStatus.className = "factcheck-status";
                claimStatus.textContent = claim.status || "Unverified";

                // Claim notes
                const notes = document.createElement("p");
                notes.textContent =
                    claim.notes || "No additional notes.";

                claimElement.append(title, claimStatus, notes);

                // Evidence sources
                const sources = document.createElement("div");
                sources.className = "factcheck-sources";

                (claim.evidence || []).forEach(source => {
                    const sourceLink = document.createElement("a");

                    sourceLink.href = source.url;
                    sourceLink.target = "_blank";
                    sourceLink.rel = "noopener noreferrer";
                    sourceLink.textContent =
                        source.title || source.source || "View source";

                    sources.appendChild(sourceLink);
                });

                claimElement.appendChild(sources);
                detailsContainer.appendChild(claimElement);
            });
        }

    } else {

        if (evidenceContainer) {
            evidenceContainer.textContent =
                "No fact-check information available.";
        }

        if (detailsContainer) {
            detailsContainer.textContent =
                "No evidence has been added yet.";
        }
    }

    // Loading status
    if (status) {
        status.textContent = "Article loaded successfully.";
    }

    // Debugging information
    console.log("Article ID:", article.id);
    console.log("Fact-check entry:", factcheck);
    console.log("Fact summary:", factcheck?.factsummary);
}
