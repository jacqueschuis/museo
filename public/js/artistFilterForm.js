// select the radio boxes
const nameSelect = document.querySelector("#artistFilterName");
const lifeSelect = document.querySelector("#artistFilterLife");
const museumSelect = document.querySelector("#artistFilterMuseum");

// select containers to toggle visibility
const artistNameContainer = document.querySelector("#artistNameContainer");
const artistLifeContainer = document.querySelector("#artistLifeContainer");
const artistMuseumContainer = document.querySelector("#artistMuseumContainer");

// select form elements themselves

const nameInput = document.querySelector("#artistName");
const birthInput = document.querySelector("#bornYear");
const deathInput = document.querySelector("#deathYear");
const museumInput = document.querySelector("#museumSelect");
const submitBtn = document.querySelector("#submitButton");

nameSelect.addEventListener("click", () => {
  // enable and require the correct criteria
  nameInput.removeAttribute("disabled");
  submitBtn.removeAttribute("disabled");
  nameInput.setAttribute("required", "");

  // show/hide correct sections
  artistLifeContainer.style.display = "none";
  artistMuseumContainer.style.display = "none";
  artistNameContainer.style.display = "block";
  submitBtn.style.display = "block";

  // ensure other criteria are not functional
  birthInput.setAttribute("disabled", "").removeAttribute("required");
  deathInput.setAttribute("disabled", "").removeAttribute("required");
  museumInput.setAttribute("disabled", "").removeAttribute("required");
});

lifeSelect.addEventListener("click", () => {
  // enable and require the correct criteria
  birthInput.addEventListener("click", () => {
    birthInput.setAttribute("required", "");
    deathInput.removeAttribute("required");
  });
  deathInput.addEventListener("click", () => {
    deathInput.setAttribute("required", "");
    birthInput.removeAttribute("required");
  });

  birthInput.removeAttribute("disabled");
  deathInput.removeAttribute("disabled");
  submitBtn.removeAttribute("disabled");
  birthInput.setAttribute("required", "");
  deathInput.setAttribute("required", "");

  // display proper sections
  artistLifeContainer.style.display = "flex";
  artistMuseumContainer.style.display = "none";
  artistNameContainer.style.display = "none";
  submitBtn.style.display = "block";

  // disable other inputs
  nameInput.setAttribute("disabled", "").removeAttribute("required");
  museumInput.setAttribute("disabled", "").removeAttribute("required");
});

museumSelect.addEventListener("click", () => {
  // show/hide the proper elements
  museumInput.removeAttribute("disabled");
  submitBtn.removeAttribute("disabled");
  museumInput.setAttribute("required", "");

  artistLifeContainer.style.display = "none";
  artistMuseumContainer.style.display = "block";
  artistNameContainer.style.display = "none";
  submitBtn.style.display = "block";

  birthInput.setAttribute("disabled", "").removeAttribute("required");
  deathInput.setAttribute("disabled", "").removeAttribute("required");
  nameInput.setAttribute("disabled", "").removeAttribute("required");
});
