import Modal from './Modal.js';
import Pagination from './Pagination.js';
import Slider from './Slider.js';
import data from './data.js';
import { navigationHandler } from './navigation.js';
import { createContent } from './utils.js';
import { views } from './views.js';

const {
	sliderContainer,
	nextBtn,
	prevBtn,
	pets_friends_layout,
	firstPage,
	prevPage,
	currentPage,
	nextPage,
	lastPage,
	spiner,
} = views;

navigationHandler();
//========================main page===========================

if (sliderContainer) {
	const modal = new Modal();
	const modalHandler = (e) => {
		const target = e.target;
		if (target.closest('[data-modal]')) {
			const pet = data.find((item) => item.name === target.dataset.modal);

			modal.show(pet);
		}
	};

	const slider = new Slider(sliderContainer, data);
	slider.handler = modalHandler;
	slider.init();

	nextBtn.addEventListener('click', () => {
		slider.next(nextBtn);
	});
	prevBtn.addEventListener('click', () => {
		slider.prev(prevBtn);
	});
}
//========================modal===============================
//========================pets page===========================

if (pets_friends_layout) {
	const modal = new Modal();
	const modalHandler = (e) => {
		const target = e.target;
		if (target.closest('[data-modal]')) {
			const pet = data.find((item) => item.name === target.dataset.modal);
			modal.show(pet);
		}
	};
	const pagination = new Pagination();
	pagination.init();
	const render = async (res) => {
		const { pets, prev, page, last } = res;

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
		pets_friends_layout.onclick = modalHandler;
		lastPage.dataset.last = last;
		paginationCheck(prev, page, last);
		if (currentPage.dataset.page > last) {
			currentPage.dataset.page = last;
			currentPage.textContent = last;
		}
	};
	render(pagination.getpage());
	pagination.action = render;

	function paginationCheck(prev, page, last) {
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
	}

	nextPage.addEventListener('click', () => {
		const page = +currentPage.dataset.page + 1;
		const response = pagination.getpage(page);
		render(response);
	});
	prevPage.addEventListener('click', () => {
		const page = +currentPage.dataset.page - 1;
		const response = pagination.getpage(page);
		render(response);
	});
	firstPage.addEventListener('click', () => {
		const page = 1;
		const response = pagination.getpage(page);
		render(response);
	});
	lastPage.addEventListener('click', () => {
		const page = +lastPage.dataset.last;
		const response = pagination.getpage(page);
		render(response);
	});
}
