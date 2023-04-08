import Slider from './Slider.js';
import data from './data.js';
import { createContent } from './utils.js';

function setOveflowHidden() {
	document.body.classList.toggle('overflow-hidden');
	togleOverlow();
}
function togleOverlow() {
	document.querySelector('.overlow').classList.toggle('show');
}
const navigationMenu = document.getElementById('navigation');
const navigationToggleBtn = document.getElementById('toggle-nav');

navigationToggleBtn.addEventListener('click', () => {
	setOveflowHidden();
	navigationToggleBtn.setAttribute(
		'aria-expanded',
		navigationToggleBtn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true',
	);
	navigationMenu.classList.toggle('open');
});
navigationMenu.addEventListener('click', (e) => {
	if (e.target.closest('.navigation__item')) {
		setOveflowHidden();
		navigationToggleBtn.setAttribute('aria-expanded', false);
		navigationMenu.classList.remove('open');
	}
});
document.addEventListener('click', (e) => {
	if (e.target.closest('#navigation') || e.target.closest('#toggle-nav')) {
		return;
	}
	if (navigationMenu.classList.contains('open')) {
		setOveflowHidden();
		navigationToggleBtn.setAttribute('aria-expanded', false);
		navigationMenu.classList.remove('open');
	}
});

//========================main page===========================
const sliderContainer = document.querySelector('.slider__wrapper');

const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
if (sliderContainer) {
	const slider = new Slider(sliderContainer, data);
	slider.init();
	nextBtn.addEventListener('click', () => slider.next(nextBtn));
	prevBtn.addEventListener('click', () => slider.prev(prevBtn));
}

//========================pets page===========================
const pets_friends_layout = document.getElementById('pets_layout');
const sm = window.matchMedia('(max-width: 767px)');
const md = window.matchMedia('(min-width: 768px)');
const lg = window.matchMedia('(min-width: 1280px)');

const setContenfForPets = (count) => {
	pets_friends_layout.innerHTML = '';
	if (pets_friends_layout) {
		let HTML_STRING = '';
		for (let i = 0; i < count; i++) {
			HTML_STRING += createContent(data[i]);
		}
		pets_friends_layout.insertAdjacentHTML('afterbegin', HTML_STRING);
	}
};
if (pets_friends_layout) {
	let count = 0;
	if (sm.matches) {
		count = 3;
	}
	if (md.matches) {
		count = 6;
	}
	if (lg.matches) {
		count = 8;
	}
	setContenfForPets(count);

	md.addEventListener('change', (e) => {
		if (e.matches) {
			count = 6;
		} else {
			count = 3;
		}
		console.log(count);
		setContenfForPets(count);
	});

	lg.addEventListener('change', (e) => {
		if (e.matches) {
			count = 8;
		} else {
			count = 6;
		}
		setContenfForPets(count);
	});
}
