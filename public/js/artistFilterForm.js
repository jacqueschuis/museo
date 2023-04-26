// select the radio boxes
const nameSelect = document.querySelector('#artistFilterName');
const lifeSelect = document.querySelector('#artistFilterLife');
const museumSelect = document.querySelector('#artistFilterMuseum');

// select containers to toggle visibility
const artistNameContainer = document.querySelector('#artistNameContainer');
const artistLifeContainer = document.querySelector('#artistLifeContainer');
const artistMuseumContainer = document.querySelector('#artistMuseumContainer');

// select form elements themselves

const nameInput = document.querySelector('#artistName');
const birthInput = document.querySelector('#bornYear');
const deathInput = document.querySelector('#deathYear');
const museumInput = document.querySelector('#museumSelect');
const submitBtn = document.querySelector('#submitButton')

nameSelect.addEventListener('click', () => {
 // show/hide the proper elements 
    nameInput.removeAttribute('disabled');
    submitBtn.removeAttribute('disabled');
    artistLifeContainer.style.display = 'none';
    artistMuseumContainer.style.display = 'none';
    artistNameContainer.style.display = 'block';
    submitBtn.style.display = 'block'
    birthInput.setAttribute('disabled');
    deathInput.setAttribute('disabled');
    museumInput.setAttribute('disabled');
})

lifeSelect.addEventListener('click', () => {
 // show/hide the proper elements 
    birthInput.removeAttribute('disabled');
    deathInput.removeAttribute('disabled');
    submitBtn.removeAttribute('disabled');
    artistLifeContainer.style.display = 'flex';
    artistMuseumContainer.style.display = 'none';
    artistNameContainer.style.display = 'none';
    submitBtn.style.display = 'block'
    nameInput.setAttribute('disabled');
    museumInput.setAttribute('disabled');
})

museumSelect.addEventListener('click', () => {
 // show/hide the proper elements 
    museumInput.removeAttribute('disabled');
    submitBtn.removeAttribute('disabled');
    artistLifeContainer.style.display = 'none';
    artistMuseumContainer.style.display = 'block';
    artistNameContainer.style.display = 'none';
    submitBtn.style.display = 'block'
    deathInput.setAttribute('disabled');
    nameInput.setAttribute('disabled');
})