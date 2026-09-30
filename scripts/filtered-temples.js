const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "images/aba-nigeria-temple.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "images/manti-utah-temple.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "images/payson-utah-temple.webp"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "images/yigo-guam-temple.webp"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "images/washington-d.c.-temple.webp"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "images/lima-peru-temple.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "images/mexico-city-mexico-temple.jpg"
    },

    // Three additional temples
    {
        templeName: "Salt Lake Utah Temple",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl: "images/salt-lake-temple.jpg"
    },
    {
        templeName: "Lubbock Texas Temple",
        location: "Lubbock, Texas",
        dedicated: "2002, April, 21",
        area: 41010,
        imageUrl: "images/texas-temple.jpg"
    },
    {
        templeName: "Bountiful Utah Temple",
        location: "Bountiful, Utah",
        dedicated: "1995, January, 11",
        area: 17500,
        imageUrl: "images/bountiful-temple.jpg"
    }
];

const templeContainer = document.querySelector("main");

function displayTemples(templeList) {
    templeContainer.innerHTML = "";

    templeList.forEach((temple) => {
        const card = document.createElement("section");

        const name = document.createElement("h2");
        name.textContent = temple.templeName;

        const location = document.createElement("p");
        location.innerHTML = `<strong>Location:</strong> ${temple.location}`;

        const dedicated = document.createElement("p");
        dedicated.innerHTML = `<strong>Dedicated:</strong> ${temple.dedicated}`;

        const area = document.createElement("p");
        area.innerHTML = `<strong>Area:</strong> ${temple.area.toLocaleString()} sq ft`;

        const image = document.createElement("img");
        image.src = temple.imageUrl;
        image.alt = temple.templeName;
        image.loading = "lazy";
        image.width = 400;
        image.height = 250;

        card.appendChild(name);
        card.appendChild(location);
        card.appendChild(dedicated);
        card.appendChild(area);
        card.appendChild(image);

        templeContainer.appendChild(card);
    });
}

function filterTemples(filter) {
    let filteredTemples;

    if (filter === "old") {
        filteredTemples = temples.filter((temple) => {
            const year = parseInt(temple.dedicated);
            return year < 1900;
        });
    } else if (filter === "new") {
        filteredTemples = temples.filter((temple) => {
            const year = parseInt(temple.dedicated);
            return year > 2000;
        });
    } else if (filter === "large") {
        filteredTemples = temples.filter((temple) => {
            return temple.area > 90000;
        });
    } else if (filter === "small") {
        filteredTemples = temples.filter((temple) => {
            return temple.area < 10000;
        });
    } else {
        filteredTemples = temples;
    }

    displayTemples(filteredTemples);
}

const menuLinks = document.querySelectorAll("#menu a");

menuLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const filter = link.textContent.toLowerCase();

        filterTemples(filter);
    });
});

displayTemples(temples);

document.querySelector("#currentyear").textContent = new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;