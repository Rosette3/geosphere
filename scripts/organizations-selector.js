
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

organizations.forEach(organization => {
    // Create a clickable link for each organization
    const card = document.createElement("a");
    card.className = "organization-card";
    card.href = `organization.html?id=${encodeURIComponent(organization.id)}`;

    // Organization logo
    const logo = document.createElement("img");
    logo.src = `organization/${organization.logo}`;
    logo.alt = `${organization.name} logo`;

    // Organization name
    const name = document.createElement("h2");
    name.textContent = organization.name ?? "Unnamed organization";

    // Organization type
    const type = document.createElement("p");
    type.textContent = organization.type ?? "Type not specified";

    card.append(logo, name, type);
    grid.appendChild(card);
});

console.log(`Rendered ${organizations.length} organizations.`);
