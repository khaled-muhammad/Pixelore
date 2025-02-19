// Initialization
const gridSize = 10;
let grid = initializeGrid();
let undoStack = [];
let redoStack = [];
let activeColor = "black";

// DOM Elements
const titleInput = document.querySelector("#art-name-input");
const artNameErrP = document.querySelector("#art-name-err");
const gridElement = document.querySelector(".grid");
const colorPickerElement = document.querySelector(".color-picker");

// Colors Palette
const colors = [
  "black",
  "red",
  "orange",
  "yellow",
  "green",
  "aqua",
  "blue",
  "purple",
  "pink",
  "bisque",
  "darkseagreen",
  "cadetblue",
  "darkred",
  "white",
  "coral",
  "grey",
  "brown",
  "burlywood",
  "lightslategray",
  "lightpink",
  "lightgreen",
  "darkmagenta",
  "darkslategrey",
  "darkolivegreen",
  "lightseagreen",
  "lightskyblue",
];

// Set up default arts if none exist (for first-time visitors)
setupDefaultArts();

// Initialize grid from localStorage or create a new one
function initializeGrid() {
  const savedGrid = localStorage.getItem("autoSave");
  return savedGrid
    ? JSON.parse(savedGrid)
    : Array.from({ length: gridSize }, () =>
        Array(gridSize).fill("transparent")
      );
}

// Load the grid UI
function loadGrid() {
  gridElement.innerHTML = "";
  grid.forEach((row, ri) => {
    row.forEach((color, ci) => {
      const square = createSquare(ri, ci, color);
      gridElement.appendChild(square);
    });
  });
}

// Create a square element for the grid
function createSquare(row, col, color) {
  const square = document.createElement("div");
  square.className = "square square-editable";
  square.style.backgroundColor = color;
  square.addEventListener("click", () => {
    updateCellColor(row, col, activeColor);
    square.style.backgroundColor = activeColor;
  });
  return square;
}

// Dynamically add colors to the picker
function setupColorPicker() {
  colors.forEach((color) => {
    const colorOption = document.createElement("div");
    colorOption.className = "color-option";
    colorOption.style.backgroundColor = color;

    if (color === activeColor) {
      colorOption.classList.add("active");
    }

    colorOption.addEventListener("click", () => {
      updateActiveColor(color);
    });

    colorPickerElement.appendChild(colorOption);
  });
}

// Update the active color
function updateActiveColor(color) {
  document
    .querySelectorAll(".color-option")
    .forEach((option) => option.classList.remove("active"));
  activeColor = color;
  document
    .querySelector(`.color-option[style*="background-color: ${color}"]`)
    .classList.add("active");
}

// Update a grid cell's color and manage undo/redo stacks
function updateCellColor(row, col, color) {
  saveToUndoStack();
  redoStack = []; // Clear redo stack as redo operations become invalid
  grid[row][col] = color;
  saveGridToLocalStorage();
}

// Save the grid to localStorage
function saveGridToLocalStorage() {
  localStorage.setItem("autoSave", JSON.stringify(grid));
}

// Undo the last action
function undo() {
  if (undoStack.length > 0) {
    saveToRedoStack();
    grid = undoStack.pop();
    refreshGrid();
  }
}

// Redo the last undone action
function redo() {
  if (redoStack.length > 0) {
    saveToUndoStack();
    grid = redoStack.pop();
    refreshGrid();
  }
}

// Clear the art grid
function clear() {
  localStorage.removeItem("autoSave");
  grid = initializeGrid();
  refreshGrid();
}

// Save the current grid state to the undo stack
function saveToUndoStack() {
  undoStack.push(JSON.parse(JSON.stringify(grid))); // Deep copy
  if (undoStack.length > 50) undoStack.shift(); // Limit stack size
}

// Save the current grid state to the redo stack
function saveToRedoStack() {
  redoStack.push(JSON.parse(JSON.stringify(grid))); // Deep copy
}

// Refresh the grid UI and localStorage
function refreshGrid() {
  loadGrid();
  saveGridToLocalStorage();
}

// Save the current artwork
function saveArt(artName, gridData) {
  const arts = JSON.parse(localStorage.getItem("arts") || "[]");
  arts.push({ caption: artName, data: gridData });
  localStorage.setItem("arts", JSON.stringify(arts));
  clear();
}

// Handle Save button click
function handleSave() {
  const artName = titleInput.value.trim();
  if (!artName) {
    showError("Art name field can't be empty.");
  } else if (grid.flat().every((cell) => cell === "transparent")) {
    showError("You need to draw first before saving!");
  } else {
    saveArt(artName, grid);
    window.location.replace("gallery.html");
  }
}

// Display error messages
function showError(message) {
  artNameErrP.textContent = message;
  artNameErrP.style.opacity = "1";
}

// Load an existing artwork if specified in the URL
function loadCurrentArt() {
  const artName = new URL(window.location.href).searchParams.get("art");
  if (artName) {
    const arts = JSON.parse(localStorage.getItem("arts") || "[]");
    const currentArt = arts.find((art) => art.caption === artName);
    if (currentArt) {
      grid = currentArt.data;
      titleInput.value = currentArt.caption;
      refreshGrid();
    }
  }
}

/* ------------------------------------------
  Share Art as a JPG Image
--------------------------------------------- */
function shareArt() {
  const cellSize = 50; // Define the pixel size of each cell in the output image
  const canvasSize = gridSize * cellSize;
  const canvas = document.createElement("canvas");
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  const ctx = canvas.getContext("2d");

  // Fill the background white (since JPEG doesn't support transparency)
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  // Draw each grid cell onto the canvas
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      // Use white if the cell is "transparent"
      let cellColor = grid[r][c] === "transparent" ? "#ffffff" : grid[r][c];
      ctx.fillStyle = cellColor;
      ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
    }
  }

  // Convert canvas to a JPEG blob
  canvas.toBlob((blob) => {
    if (!blob) {
      console.error("Failed to create image blob");
      return;
    }
    const file = new File([blob], "pixelore-art.jpg", { type: "image/jpeg" });

    // Try to use the Web Share API if available
    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare({ files: [file] })
    ) {
      navigator
        .share({
          files: [file],
          title: "Pixelore Art",
          text: "Check out my Pixelore art!",
        })
        .catch((err) => console.error("Error sharing:", err));
    } else {
      // Fallback: trigger a download of the image
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "pixelore-art.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, "image/jpeg");
}

/* --------------------------------------------------
  Setup 10 Default Arts on First Load
----------------------------------------------------- */
function setupDefaultArts() {
  let arts = JSON.parse(localStorage.getItem("arts") || "[]");
  if (arts.length === 0) {
    const defaultArts = [];
    for (let i = 1; i <= 10; i++) {
      let randomGrid = [];
      for (let r = 0; r < gridSize; r++) {
        let row = [];
        for (let c = 0; c < gridSize; c++) {
          // Pick a random color from the palette
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          row.push(randomColor);
        }
        randomGrid.push(row);
      }
      defaultArts.push({ caption: "Default Art " + i, data: randomGrid });
    }
    localStorage.setItem("arts", JSON.stringify(defaultArts));
  }
}

// Event Listeners
document.querySelector(".save-btn").addEventListener("click", handleSave);
document.querySelector(".undo-btn").addEventListener("click", undo);
document.querySelector(".redo-btn").addEventListener("click", redo);
document.querySelector(".clear-btn").addEventListener("click", clear);
document.querySelector(".share-btn").addEventListener("click", shareArt);

// Initial Setup
setupColorPicker();
loadGrid();
loadCurrentArt();