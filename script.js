//News data sets
let news = [
    {
    // AUSTRALIA
    id: 1,
    title: "Australia Announces Major Renewable Energy Investments",
    country: "Australia",
    image_set: "Flag_of_Australia.svg.png",
    date: "September 7, 2024",
    news_image: "Australia_1.jpg",
    desc: "Australia unveiled expanded renewable energy investment plans supporting solar projects, battery storage facilities, and electrical grid modernization as part of national climate and energy transition objectives."
    },


    {
    // BRAZIL
    id: 2,
    title: "Brazil Reports Decline in Amazon Deforestation Rates",
    country: "Brazil",
    image_set: "Flag_of_Brazil.svg.png",
    date: "November 8, 2024",
    news_image: "Brazil_1.jpg",
    desc: "Brazilian environmental agencies reported a significant reduction in deforestation across parts of the Amazon rainforest following expanded monitoring operations and environmental enforcement measures. Officials described the results as an important step toward long-term conservation goals."
    },

    {
    // CHINA
    id: 3,
    title: "China Expands Global Electric Vehicle Production",
    country: "China",
    image_set: "Flag_of_the_People's_Republic_of_China.svg.png",
    date: "Feburary 15, 2025",
    news_image: "China_1.jpg",
    desc: "Chinese electric vehicle manufacturers continued expanding international exports and domestic production capacity as competition intensified within the global EV market. Analysts noted rising influence from Chinese battery technology and automotive firms across Asia and Europe."
    },

    {
    // FRANCE
    id: 4,
    title: "France Strengthens Security Ahead of Paris Olympic Games",
    country: "France",
    image_set: "Flag_of_France.svg.png",
    date: "July 10, 2024",
    news_image: "France_1.jpg",
    desc: "French authorities expanded transportation monitoring and public security operations ahead of the 2024 Olympic Games in Paris. Officials described preparations as one of the country’s largest peacetime security deployments in recent decades."
    },

    {
    // GERMANY
    id: 5,
    title: "Germany Accelerates Renewable Energy Expansion Plans",
    country: "Germany",
    image_set: "Flag_of_Germany.svg",
    date: "April 22, 2025",
    news_image: "Germany_1.jpg",
    desc: "Germany announced additional investment initiatives supporting wind, solar, and energy infrastructure projects as part of long-term climate and industrial transition strategies. Energy pricing and grid modernization remained central topics within domestic political debate."
    },

    {
    // INDIA
    id: 6,
    title: "India Expands Lunar and Space Exploration Programs",
    country: "India",
    image_set: "Flag_of_India.svg",
    date: "August 18, 2024",
    news_image: "India_1.jpg",
    desc: "India continued expanding its national space exploration initiatives following recent lunar mission successes and new satellite development programs. ISRO officials emphasized scientific research, communications infrastructure, and future interplanetary ambitions."
    },

    {
    // JAPAN
    id: 7,
    title: "Japan Successfully Lands SLIM Spacecraft on the Moon",
    country: "Japan",
    image_set: "Flag_of_Japan.svg.png",
    date: "Janurary 20, 2024",
    news_image: "Japan_1.jpg",
    desc: "Japan became the fifth nation to successfully land a spacecraft on the Moon after JAXA’s SLIM lunar mission achieved a precision landing. Officials described the mission as a major technological milestone for Japan’s growing space program despite technical challenges following touchdown."
    },

    {
    // POLAND
    id: 8,
    title: "Edward Robot Gains Attention After Warsaw Public Safety and Government Appearances",
    country: "Poland",
    image_set: "Flag_of_Poland.svg.png",
    date: "April 15, 2026",
    news_image: "Poland_1.jpg",
    desc: "A humanoid public interaction robot known as Edward has drawn widespread attention in Warsaw after being recorded interacting with civilians, assisting in crowd-facing situations, and appearing in multiple governmental and public institutions including the Polish parliament. The unit, part of an urban robotics research program, was also seen during a forest-edge incident where it assisted in redirecting civilians away from reported wild boar activity, later gaining viral attention online."
    },

    {
    // RUSSIA
    id: 9,
    title: "Russia Expands Arctic Shipping Infrastructure Projects",
    country: "Russia",
    image_set: "Flag_of_Russia.svg.png",
    date: "May 5, 2025",
    news_image: "Russia_1.jpg",
    desc: "Russian authorities continued development of Arctic shipping infrastructure and Northern Sea Route logistics projects aimed at increasing commercial activity and resource transportation through northern maritime corridors."
    },

    {
    // SINGAPORE
    id: 10,
    title: "Singapore Expands Smart City Technology Systems",
    country: "Singapore",
    image_set: "Flag_of_Singapore.svg.png",
    date: "Janurary 11, 2025",
    news_image: "Singapore_1.jpg",
    desc: "Singapore introduced additional urban technology initiatives involving AI-assisted traffic systems, digital infrastructure, and smart city management platforms. Officials stated the projects are intended to improve transportation efficiency and public services."
    },

    {
    // SOUTH KOREA
    id: 11,
    title: "South Korea Expands Investment in AI Semiconductor Industry",
    country: "South Korea",
    image_set: "Flag_of_South_Korea.svg.png",
    date: "March 15, 2025",
    news_image: "South_Korea_1.jpg",
    desc: "South Korea announced expanded national investment plans focused on artificial intelligence semiconductor manufacturing and next-generation chip technology. Government officials stated the initiative aims to strengthen the country’s position within the increasingly competitive global technology supply chain."
    },

    {
    // THAILAND
    id: 12,
    title: "Thailand Legalizes Same-Sex Marriage",
    country: "Thailand",
    image_set: "Flag_of_Thailand.svg.png",
    date: "January 24, 2025",
    news_image: "Thailand_1.jpg",
    desc: "Thailand officially legalized same-sex marriage after parliament approved landmark legislation granting LGBTQ+ couples equal legal recognition. The law marked a major social and political milestone for the country and was celebrated across Bangkok and other major cities. Supporters described the move as a historic step toward equality and civil rights in Southeast Asia."
    },

    {
    id: 13,
    title: "Thailand Begins Nationwide Digital Wallet Economic Stimulus",
    country: "Thailand",
    image_set: "Flag_of_Thailand.svg.png",
    date: "September 1, 2024",
    news_image: "Thailand_2.jpg",
    desc: "Thailands government launched its highly debated digital wallet stimulus initiative aimed at boosting domestic spending and economic recovery. The program distributed financial support through digital systems to millions of eligible citizens, with officials hoping to stimulate local businesses and consumer activity nationwide. Economists and opposition groups continued debating the long-term fiscal impact of the project."
    },

    {
    id: 14,
    title: "Thailand Accelerates High-Speed Rail Expansion Project",
    country: "Thailand",
    image_set: "Flag_of_Thailand.svg.png",
    date: "March 1, 2025",
    news_image: "Thailand_3.jpg",
    desc: "Thailand continued major development of its high-speed railway network connecting Bangkok to northeastern provinces and future regional routes linked to China’s rail infrastructure projects. Government officials described the expansion as a strategic investment for trade, tourism, and regional transportation modernization. Construction progress and budget oversight remained closely monitored throughout the year."
    },

    {
    // UNITED STATES OF AMERICA
    id: 15,
    title: "United States Introduces New Artificial Intelligence Regulations",
    country: "United States",
    image_set: "Flag_of_the_United_States.svg",
    date: "October 30, 2024",
    news_image: "United_States_1.jpg",
    desc: "The United States government introduced new policy measures and executive actions focused on artificial intelligence safety, transparency, and national security concerns. Technology companies and policymakers continued debating the balance between innovation and regulatory oversight."
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
    let usedIndexes = [];
    for (let i = 1; i <= 6; i++) {
        let randomindexgen;
        do { randomindexgen = Math.floor(Math.random() * news.length)}
        while (
            usedIndexes.includes(randomindexgen)
        );
        usedIndexes.push(randomindexgen);
        selected = news[randomindexgen];
        container = document.getElementById("news-container" + i);

        //News information randomized ! ! !
        container.innerHTML = `
        <h>${selected.title}</h>
        <div class="country-row"><sac>${selected.country}</sac><img class="Flags"
        src="Flags/${selected.image_set}"></div>
        <p class="date">${selected.date}</p class="date">
        <img class="News" src="News/${selected.news_image}"</img class="News">
        <p class="description">${selected.desc}</p class="description">
        `;
        console.log(randomindexgen);
        container.classList.remove("fade-card");
        void container.offsetWidth;
        container.classList.add("fade-card");
    }

}

