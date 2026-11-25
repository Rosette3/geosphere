import { Countrylist } from "../database/countries.js";

const grid = document.getElementById("country-grid");
const status = document.getElementById("grid-status");

if (!grid) {
    throw new Error("Cannot find #country-grid in HTML");
}

const countries = Object.entries(Countrylist);

if (countries.length === 0 && status) {
    status.textContent = "No countries found in the database.";
}

countries.forEach(([countryKey, country]) => {

    const countryStatus = country.status ?? "Available";

    if (countryStatus === "Not_Implemented") {
        return;
    }

    const card = document.createElement("a");
    card.className = "country-card";
    card.href = `country.html?id=${encodeURIComponent(countryKey)}`;

    const logo = document.createElement("img");
    logo.src = `Flags/${country.flag}`;
    logo.alt = `${country.name} flag`;

    logo.onerror = () => {
        console.error(`Failed to load flag for ${country.name}:`, logo.src);
    };

    const name = document.createElement("h2");
    name.textContent = country.name ?? "Unnamed country";

    const type = document.createElement("p");
    type.textContent = country.region ?? "Region not specified";

    if (countryStatus === "Development") {
        card.classList.add("under-development");
    }

    card.append(logo, name, type);
    grid.appendChild(card);
});

console.log(`Rendered ${countries.length} countries.`);