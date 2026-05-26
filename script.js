//News data sets
let news = [
    {
    id: 1,
    title: "Typhoon Near Okinawa",
    country: "Japan",
    image_set: "Flag_of_Japan.svg.png",
    desc: "Heavy rain and evacuation warnings issued."
    },

    {
    id: 2,
    title: "New Railway Project Approved",
    country: "Thailand",
    desc: "Government announces major transport expansion."
    },

    {
    id: 3,
    title: "Parrot Escapes Local Zoo",
    country: "Brazil",
    desc: "Bird reportedly learned to imitate alarms."
    },

    {
    id: 4,
    title: "AI Traffic System Tested",
    country: "South Korea",
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
    randomindexgen = Math.floor(Math.random() * news.length);
    selected = news[randomindexgen];
    container = document.getElementById("news-container");

    //News information randomized ! ! !
    container.innerHTML = `
    <h>${selected.title}</h>
    <img src="Flags/${selected.image_set}">
    <p>${selected.country}</p>
    <p>${selected.desc}</p>
    `;
    console.log(randomindexgen);
}