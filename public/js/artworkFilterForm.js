// select the radio buttons
const titleSelect = document.querySelector("#artworkFilterTitle");
const dateSelect = document.querySelector("#artworkFilterDate");
const museumSelect = document.querySelector("#artworkFilterMuseum");

// select containers to toggle visibility
const artworkTitleContainer = document.querySelector("#artworkTitleContainer");
const artworkDateContainer = document.querySelector("#artworkDateContainer");
const artworkMuseumContainer = document.querySelector(
  "#artworkMuseumContainer"
);

// select form elements themselves

const titleInput = document.querySelector("#artworkTitle");
const fromInput = document.querySelector("#fromYear");
const toInput = document.querySelector("#toYear");
const museumInput = document.querySelector("#museumSelect");
const submitBtn = document.querySelector("#submitButton");

titleSelect.addEventListener("click", () => {
  // show/hide the proper elements
  titleInput.removeAttribute("disabled", "required");
  submitBtn.removeAttribute("disabled");
  artworkDateContainer.style.display = "none";
  artworkMuseumContainer.style.display = "none";
  artworkTitleContainer.style.display = "block";
  submitBtn.style.display = "block";
  titleInput.setAttribute("required", "required");
  fromInput.setAttribute("disabled", "disabled");
  toInput.setAttribute("disabled", "disabled");
  museumInput.setAttribute("disabled", "disabled");
});

dateSelect.addEventListener("click", () => {
  artworkDateContainer.style.display = "flex";
  submitBtn.style.display = "block";
  submitBtn.removeAttribute("disabled");
  fromInput.setAttribute("required", "required");
  toInput.setAttribute("required", "required");
  fromInput.removeAttribute("disabled");
  toInput.removeAttribute("disabled");
  // event listeners to toggle required on birth/death
  fromInput.addEventListener("click", () => {
    fromInput.setAttribute("required", "required");
    toInput.removeAttribute("required");
  });
  toInput.addEventListener("click", () => {
    toInput.setAttribute("required", "required");
    fromInput.removeAttribute("required");
  });

  // show/hide the proper elements
  artworkMuseumContainer.style.display = "none";
  artworkTitleContainer.style.display = "none";
  titleInput.setAttribute("disabled", "");
  museumInput.setAttribute("disabled", "");
});

museumSelect.addEventListener("click", () => {
  // show/hide the proper elements
  museumInput.removeAttribute("disabled");
  submitBtn.removeAttribute("disabled");
  artworkDateContainer.style.display = "none";
  artworkMuseumContainer.style.display = "block";
  artworkTitleContainer.style.display = "none";
  submitBtn.style.display = "block";
  museumInput.setAttribute("required", "");
  toInput.setAttribute("disabled", "");
  fromInput.setAttribute("disabled", "");
  titleInput.setAttribute("disabled", "");
});
