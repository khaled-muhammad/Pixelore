// Load saved arts from localStorage
let arts = JSON.parse(localStorage.getItem("arts"));

// DOM Elements
const gallerySection = document.querySelector("#gallery-section");
const parallaxSlider = document.querySelector(".slider");

// Set the number of items for the parallax slider using a CSS variable
parallaxSlider.style.setProperty('--quantity', arts.length);

function updateUI() {
  // Clear the gallery section
  gallerySection.innerHTML = "";
  
  // For each art, create its visual representation
  arts.forEach((art, i) => {
    const artElement = createArtShow(art, i);
    
    // Wrap each art in an art-box container
    const artBox = document.createElement("div");
    artBox.classList.add("art-box");
    artBox.appendChild(artElement);

    // Create the overlay
    const artOverlay = document.createElement("div");
    artOverlay.classList.add("art-overlay");

    // Create the button group (for delete and edit)
    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("button-group");

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("card-btn");
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash");
    deleteButton.appendChild(deleteIcon);

    // Edit button
    const editButton = document.createElement("button");
    editButton.classList.add("card-btn");
    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-pen-fancy");
    editButton.appendChild(editIcon);

    // Append buttons to the group
    buttonGroup.appendChild(deleteButton);
    buttonGroup.appendChild(editButton);

    // Set up event listeners for the buttons
    deleteButton.addEventListener("click", () => {
      let confirmDelete = confirm(
        `Are you sure you want to delete "${art["caption"]}"`
      );
      if (confirmDelete) {
        deleteArt(art["caption"]);
      }
    });

    editButton.addEventListener("click", () => {
      window.location.replace("editor.html?art=" + art['caption']);
    });

    // Create the caption element
    const artCaption = document.createElement("p");
    artCaption.classList.add("art-cap");
    artCaption.textContent = art["caption"];

    // Assemble the overlay
    artOverlay.appendChild(buttonGroup);
    artOverlay.appendChild(artCaption);

    // Add the overlay to the art-box container
    artBox.appendChild(artOverlay);

    // Append the art-box to the gallery section
    gallerySection.appendChild(artBox);
  });
}

function createArtShow(art, i) {
  const gridData = art["data"];
  const rows = gridData.length;
  const cols = gridData[0].length;

  // Create the grid container for this art
  const gridElement = document.createElement("div");
  gridElement.classList.add("grid", "item");

  // Set custom property for parallax slider positioning
  gridElement.style.setProperty('--position', i + 1);
  
  // Set up grid layout dynamically based on the art data dimensions
  gridElement.style.display = "grid";
  gridElement.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  gridElement.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

  // Create each cell (square) of the art grid
  gridData.forEach((row) => {
    row.forEach((color) => {
      const square = document.createElement("div");
      square.classList.add("square");
      square.style.backgroundColor = color;
      gridElement.appendChild(square);
    });
  });

  return gridElement;
}

function deleteArt(artName) {
  // Reload arts from storage, filter out the deleted one, and update storage
  arts = JSON.parse(localStorage.getItem("arts"));
  arts = arts.filter((art) => art["caption"] !== artName);
  localStorage.setItem("arts", JSON.stringify(arts));
  updateUI();
}

// Initial UI update
updateUI();