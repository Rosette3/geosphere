//News data sets
let news = [
    {
    id: 1,
    title: "Tokyo Tests AI Train Monitoring System",
    country: "Japan",
    image_set: "Flag_of_Japan.svg.png",
    desc: "Rail operators across Tokyo have begun testing a new AI-assisted monitoring system designed to improve railway safety, predict maintenance issues, and reduce train delays during peak commuting hours. The system analyzes real-time camera feeds and operational data to detect unusual activity, overcrowding, and potential technical failures before they escalate into larger disruptions. Officials stated the project is part of Japan’s broader push toward smart infrastructure modernization ahead of future transportation expansion plans."
    },

    {
    id: 2,
    title: "New Railway Project Approved",
    country: "Thailand",
    image_set: "Flag_of_Thailand.svg.png",
    desc: "Government announces major transport expansion."
    },

    {
    id: 3,
    title: "Parrot Escapes Local Zoo",
    country: "Brazil",
    image_set: "Flag_of_Brazil.svg.png",
    desc: "Bird reportedly learned to imitate alarms."
    },

    {
    id: 4,
    title: "AI Traffic System Tested",
    country: "South Korea",
    image_set: "Flag_of_South_Korea.svg.png",
    desc: "Smart traffic management enters trial phase."
    }

]

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
    for (let i = 1; i <= 6; i++) {
        randomindexgen = Math.floor(Math.random() * news.length);
        selected = news[randomindexgen];
        container = document.getElementById("news-container" + i);

        //News information randomized ! ! !
        container.innerHTML = `
        <h>${selected.title}</h>
        <div class="country-row"><sac>${selected.country}</sac><img class="Flags"
        src="Flags/${selected.image_set}"></div>
        <p class="description">${selected.desc}</p class="description">
        `;
        console.log(randomindexgen);
    }

}

