
import { organizations } from "../database/organization.js";

console.log("Organization database loaded:", organizations);

const grid = document.getElementById("organization-grid");
const status = document.getElementById("grid-status");

if (!grid) {
    throw new Error("Cannot find #organization-grid in HTML");
}

if (!Array.isArray(organizations)) {
    throw new Error("organizations.js did not export an array");
}

if (organizations.length === 0) {
    if (status) {
        status.textContent = "No organizations found in the database.";
    }
}

let renderedCount = 0;

organizations.forEach(organization => {

    const organizationStatus = organization.status ?? "Available";

    // Hide organizations not yet implemented
    if (organizationStatus === "Not_Implamented") {
        return;
    }

    const card = document.createElement("a");
    card.className = "organization-card";
    card.href = `organization.html?id=${encodeURIComponent(organization.id)}`;

    // Apply development styling
    if (organizationStatus === "Development") {
        card.classList.add("under-development");
    }

    const logo = document.createElement("img");
    logo.src = `organization/${organization.logo}`;
    logo.alt = `${organization.name} logo`;

    logo.onerror = () => {
        console.error(
            `Organization logo failed to load for ${organization.name}:`,
            logo.src
        );
    };

    const name = document.createElement("h2");
    name.textContent = organization.name ?? "Unnamed organization";

    const type = document.createElement("p");
    type.textContent = organization.type ?? "Type not specified";

    card.append(logo, name, type);
    grid.appendChild(card);

    renderedCount++;
});

console.log(`Rendered ${renderedCount} organizations.`);
