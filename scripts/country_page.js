import { Countrylist } from "../database/countries.js";

const params = new URLSearchParams(window.location.search);
const countryKey = params.get("id");
const country = Countrylist[countryKey];

document.body.insertAdjacentHTML("beforeend", `
    <div style="position:fixed; bottom:10px; left:10px;
    background:white; color:black; padding:15px; z-index:9999;">
        <p>URL ID: ${countryKey}</p>
        <p>Database loaded: ${!!Countrylist}</p>
        <p>Country found: ${!!country}</p>
        <p>Country name: ${country?.name ?? "Not found"}</p>
    </div>
`);

if (!country) throw new Error("Country not found");

document.getElementById("country-flag").src = `Flags/${country.flag}`;
document.getElementById("country-name").textContent = country.name ?? countryKey;
document.getElementById("country-fullname").textContent = country.fullname ?? "";
document.getElementById("country-capital").textContent = country.capital ?? "Unknown";
document.getElementById("country-population").textContent = country.population ?? "Unknown";
document.getElementById("country-region").textContent = country.region ?? "Unknown";
document.getElementById("country-government").textContent = country.government ?? "Unknown";
document.getElementById("country-description").innerHTML = country.description ?? "No description available.";