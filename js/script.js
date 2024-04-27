let open = [];
let moves = 0;
let isClickEnabled = true;

const cards = document.querySelector(".cards");
const resetBtn = document.querySelector(".btn-reset");
const movesCard = document.querySelector(".card-moves span.count")
const congratulationsMessage = document.querySelector(".congratulations")

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function selectRandomIcons(data) {
    const randomIcons = shuffle(data).slice(0, 8);
    const iconPairs = [...randomIcons, ...randomIcons];
    return shuffle(iconPairs);
}

function renderIcons(icons) {
    cards.innerHTML = "";
    icons.forEach(({ image, name }) => {
        const button = document.createElement("button");
        button.className = "card";
        button.name = name;

        const img = document.createElement("img");
        img.src = `./icons/${image}`;

        button.appendChild(img);
        cards.appendChild(button);

        button.addEventListener("click", handleClick);
    });
}

function changeMoves(count) {
    movesCard.innerHTML = count
}

function handleClick(event) {
    const button = event.target;

    if (!isClickEnabled || button.classList.contains("open")) {
        return;
    }

    button.classList.add("open");
    open.push(button);
    changeMoves(++moves)

    if (open.length === 2) {
        isClickEnabled = false;
        setTimeout(() => {
            if (open[0].name === open[1].name) {
                open.forEach(card => card.classList.add("done"));
            } else {
                open.forEach(card => card.classList.remove("open"));
            }

            const doneButtons = document.querySelectorAll(".done")

            if (doneButtons.length === 16) {
                congratulationsMessage.classList.add("active")
            }

            open = [];
            isClickEnabled = true;
        }, 500);
    }
}

resetBtn.addEventListener("click", () => {
    isClickEnabled = true;
    moves = 0
    changeMoves(moves)
    congratulationsMessage.classList.remove("active")
    renderIcons(selectRandomIcons(data));
});

window.onload = function () {
    renderIcons(selectRandomIcons(data));
};