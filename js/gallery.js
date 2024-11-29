let arts = JSON.parse(localStorage.getItem("arts"));

const gallerySection = document.querySelector("#gallery-section");
const parallaxSlider = document.querySelector(".slider");

parallaxSlider.style = `--quantity: ${arts.length}`;

function updateUI() {
  gallerySection.innerHTML = "";
  arts.forEach((art, i) => {
    const artElement = createArtShow(art, i);
    const artBox = document.createElement("div");
    artBox.classList.add("art-box");
    artBox.appendChild(artElement);

    // Create the overlay
    const artOverlay = document.createElement("div");
    artOverlay.classList.add("art-overlay");

    // Create the button group
    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("button-group");

    // Create the delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("card-btn");
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash");
    deleteButton.appendChild(deleteIcon);

    // Create the edit button
    const editButton = document.createElement("button");
    editButton.classList.add("card-btn");
    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-pen-fancy");
    editButton.appendChild(editIcon);

    // Append buttons to the button group
    buttonGroup.appendChild(deleteButton);
    buttonGroup.appendChild(editButton);

    deleteButton.addEventListener("click", () => {
      let confirmDelete = confirm(
        `Are you sure you want to delete "${art["caption"]}"`
      );

      if (confirmDelete) {
        deleteArt(art["caption"]);
      }
    });

    editButton.addEventListener("click", () => {
      window.location.replace("editor.html?art="+art['caption'])
    })

    // Create the caption paragraph
    const artCaption = document.createElement("p");
    artCaption.classList.add("art-cap");
    artCaption.textContent = art["caption"];

    // Assemble the overlay
    artOverlay.appendChild(buttonGroup);
    artOverlay.appendChild(artCaption);

    // Add the overlay to the art box
    artBox.appendChild(artOverlay);

    // Append the art box to the gallery section
    gallerySection.appendChild(artBox);
  });
}

function createArtShow(art, i) {
  const grid = art["data"];

  const gridElement = document.createElement("div");
  gridElement.classList.add("grid");
  gridElement.classList.add("item");
  gridElement.style = `--position: ${i + 1}`;
  gridElement.style.height = "gridElement.style.width";
  // Dynamically create 1x1 squares for the grid
  grid.forEach((row, ri) => {
    row.forEach((color, ci) => {
      const square = document.createElement("div");
      square.classList.add("square");
      square.style.backgroundColor = color;
      gridElement.appendChild(square);
    });
  });

  return gridElement;
}

function deleteArt(artName) {
  arts = JSON.parse(localStorage.getItem("arts"));
  arts = arts.filter((art) => art["caption"] != artName);

  localStorage.setItem("arts", JSON.stringify(arts));
  updateUI();
}

updateUI();
