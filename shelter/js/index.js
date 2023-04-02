import data from './data.js';
//navigation contro; for mobile
const navigationMenu = document.getElementById('navigation');
const navigationToggleBtn = document.getElementById('toggle-nav');

navigationToggleBtn.addEventListener('click', () => {
	navigationToggleBtn.setAttribute(
		'aria-expanded',
		navigationToggleBtn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true',
	);
	navigationMenu.classList.toggle('open');
});
//========================main page===========================
const sliderContent = document.querySelector('.slider__content');
if (sliderContent) {
	let HTML_STRING = '';
	for (let i = 0; i < data.length; i++) {
		HTML_STRING += createContent(data[i]);
	}
	sliderContent.insertAdjacentHTML('afterbegin', HTML_STRING);
}

//========================pets page===========================
const pets_friends_layout = document.getElementById('pets_layout');
const sm = window.matchMedia('(max-width: 767px)');
const md = window.matchMedia('(min-width: 768px)');
const lg = window.matchMedia('(min-width: 1280px)');

function createContent(data) {
	return `<article class="card">
	<div class="card__image">
		<img src="./assets/pets/${data.img}" alt="${data.name}">
	</div>
	<h2 class="card__name">${data.name}</h2>
	<button id="card-modal" class="card__btn btn outlined">Learn more</button>
	</article>`;
}
const setContenfForPets = () => {
	pets_friends_layout.innerHTML = '';
	if (pets_friends_layout) {
		let HTML_STRING = '';
		for (let i = 0; i < count; i++) {
			HTML_STRING += createContent(data[i]);
		}
		pets_friends_layout.insertAdjacentHTML('afterbegin', HTML_STRING);
	}
};
let count = 3;
setContenfForPets();
sm.addEventListener('change', (e) => {
	if (e.matches) {
		count = 3;
		setContenfForPets();
	}
});
md.addEventListener('change', (e) => {
	if (e.matches) {
		count = 6;
		setContenfForPets();
	}
});
lg.addEventListener('change', (e) => {
	if (e.matches) {
		count = 8;
		setContenfForPets();
	}
});
