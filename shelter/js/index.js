import Pagination from './Pagination.js';
import Slider from './Slider.js';
import data from './data.js';
import { createContent, setOveflowHidden } from './utils.js';

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
const firstPage = document.getElementById('firstPage');
const prevPage = document.getElementById('prevPage');
const currentPage = document.getElementById('currentPage');
const nextPage = document.getElementById('nextPage');
const lastPage = document.getElementById('lastPage');
const spiner = document.getElementById('spiner');
if (pets_friends_layout) {
	const pagination = new Pagination();
	pagination.init();

	const render = async (pets, last) => {
		pets_friends_layout.innerHTML = '';
		let HTML_STRING = '';
		for (let i = 0; i < pets.length; i++) {
			HTML_STRING += createContent(data[pets[i]]);
		}
		spiner.setAttribute('aria-hidden', 'false');
		await new Promise((r, j) => {
			setTimeout(r, 150);
		});
		spiner.setAttribute('aria-hidden', 'true');
		pets_friends_layout.insertAdjacentHTML('afterbegin', HTML_STRING);

		lastPage.dataset.last = last;
		if (currentPage.dataset.page > last) {
			currentPage.dataset.page = last;
			currentPage.textContent = last;
		}
	};
	const response = pagination.getpage();
	render(response.pets, response.last);
	pagination.action = render;

	const paginationCheck = (prev, page, last) => {
		if (last - page === 0) {
			nextPage.disabled = true;
			lastPage.disabled = true;
		}
		if (last - page === 1) {
			nextPage.disabled = false;
			lastPage.disabled = true;
		}
		if (last - page >= 2) {
			nextPage.disabled = false;
			lastPage.disabled = false;
		}
		if (prev === 0) {
			firstPage.disabled = true;
			prevPage.disabled = true;
		}
		if (prev === 1) {
			firstPage.disabled = true;
			prevPage.disabled = false;
		}
		if (prev >= 2) {
			firstPage.disabled = false;
			prevPage.disabled = false;
		}
		currentPage.dataset.page = page;
		currentPage.textContent = page;
	};
	paginationCheck(response.prev, response.page, response.last);

	nextPage.addEventListener('click', () => {
		const page = +currentPage.dataset.page + 1;
		const response = pagination.getpage(page);
		paginationCheck(response.prev, response.page, response.last);
		render(response.pets, response.last);
	});
	prevPage.addEventListener('click', () => {
		const page = +currentPage.dataset.page - 1;
		const response = pagination.getpage(page);
		paginationCheck(response.prev, response.page, response.last);
		render(response.pets, response.last);
	});
	firstPage.addEventListener('click', () => {
		const page = 1;
		const response = pagination.getpage(page);
		paginationCheck(response.prev, response.page, response.last);
		render(response.pets, response.last);
	});
	lastPage.addEventListener('click', () => {
		const page = +lastPage.dataset.last;
		const response = pagination.getpage(page);
		paginationCheck(response.prev, response.page, response.last);
		render(response.pets, response.last);
	});
}
