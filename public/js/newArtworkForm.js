// selecting options
const imageOptionsContainer = document.querySelector("#imageOptionsContainer");
const uploadImageBtn = document.querySelector("#uploadImageBtn");
const imageUrlBtn = document.querySelector("#imageUrlBtn");

// image inputs container
const imageInputsContainer = document.querySelector("#imageInputsContainer");

// image upload things
const imageUploadContainer = document.querySelector("#imageUploadContainer");
const imageUploadInput = document.querySelector("#image");

// image url things
const imageUrlContainer = document.querySelector("#imageUrlContainer");
const imageUrlInput = document.querySelector("#imageUrl");

// parent form
const newArtworkForm = document.querySelector("#newArtworkForm");

uploadImageBtn.addEventListener("click", () => {
  // display the proper inputs
  imageInputsContainer.style.display = "block";
  imageUploadContainer.style.display = "block";

  // hide other inputs
  imageUrlContainer.style.display = "none";

  // enable proper inputs
  imageUploadInput.removeAttribute("disabled");
  imageUploadInput.setAttribute("required", "required");

  // disable other inputs
  imageUrlInput.setAttribute("disabled", "disabled");
  imageUrlInput.removeAttribute("required");

  //change form
  newArtworkForm.setAttribute("action", "/artworks/newByUpload");
  newArtworkForm.setAttribute("enctype", "multipart/form-data");
});

imageUrlBtn.addEventListener("click", () => {
  // display the proper inputs
  imageInputsContainer.style.display = "block";
  imageUrlContainer.style.display = "block";

  // hide other inputs
  imageUploadContainer.style.display = "none";

  // enable proper inputs
  imageUrlInput.removeAttribute("disabled");
  imageUrlInput.setAttribute("required", "required");

  // disable other inputs
  imageUploadInput.setAttribute("disabled", "disabled");
  imageUploadInput.removeAttribute("required");

  //change form
  newArtworkForm.setAttribute("action", "/artworks/newByUrl");
  newArtworkForm.setAttribute("enctype", "application/x-www-form-urlencoded");
});
