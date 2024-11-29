const bgs = [
    "imgs/1138740.png",
    "imgs/01073865290819.5d61d475f0072.jpg",
    "imgs/aHR0cHM6Ly9iLnN0YWJsZWNvZy5jb20vMDdlNjM3MGQtZWNmYy00MjJiLTllMmQtYzY4OGVlODlkMmIzLmpwZWc.webp",
    "imgs/akfqd7mvcss51.jpg",
    "imgs/bg.png",
    "imgs/fd40a4b8b151c4e432106576187d03c9.gif",
    "imgs/pine-trees-pixel-art-8bnl3c6xbsilszl7.jpg",
    "imgs/pixel-lakes-sunny-and-sunset-pixel-art-landscape-series-v0-3vciy9e2f0sb1.webp",
    "imgs/pixel-lakes-sunny-and-sunset-pixel-art-landscape-series-v0-6zw068e2f0sb1.webp",
    "imgs/pixel-lakes-sunny-and-sunset-pixel-art-landscape-series-v0-b7p5k8e2f0sb1.webp",
    "imgs/pixel-lakes-sunny-and-sunset-pixel-art-landscape-series-v0-l7vb28e2f0sb1.webp",
    "imgs/pixel-lakes-sunny-and-sunset-pixel-art-landscape-series-v0-o2haw9e2f0sb1.webp",
    "imgs/pixel-lakes-sunny-and-sunset-pixel-art-landscape-series-v0-o3kjy7e2f0sb1.webp",
    "imgs/pixel-lakes-sunny-and-sunset-pixel-art-landscape-series-v0-q17vc8e2f0sb1.webp",
    "imgs/pixel-lakes-sunny-and-sunset-pixel-art-landscape-series-v0-qrslnce2f0sb1.webp",
    "imgs/pixel-lakes-sunny-and-sunset-pixel-art-landscape-series-v0-sg6urce2f0sb1.webp",
    "imgs/pixel-lakes-sunny-and-sunset-pixel-art-landscape-series-v0-wnx459e2f0sb1.webp",
    "imgs/thumb-1920-939716.png",
]

/**
 * Sets a background image for a pseudo-element (::before or ::after).
 * @param {string} selector - The CSS selector for the element (e.g., '.banner').
 * @param {string} pseudo - The pseudo-element ('::before' or '::after').
 * @param {string} imageUrl - The URL of the background image.
 */
function setPseudoElementBackground(selector, pseudo, imageUrl) {
    // Check for an existing style tag or create one
    let styleSheet = document.querySelector('#dynamic-pseudo-styles');
    if (!styleSheet) {
        styleSheet = document.createElement('style');
        styleSheet.id = 'dynamic-pseudo-styles';
        document.head.appendChild(styleSheet);
    }

    // Create the CSS rule
    const rule = `
        ${selector}${pseudo} {
            background-image: url('${imageUrl}');
        }
    `;

    // Add or replace the rule in the style tag
    styleSheet.innerHTML = rule;
}


function randomizeBg() {
    let chosenIndex = Math.floor(Math.random() * bgs.length)
    setPseudoElementBackground('.banner', '::before', bgs[chosenIndex]);
}

setInterval(randomizeBg, 5000)