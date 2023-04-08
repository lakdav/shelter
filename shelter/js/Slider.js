import { getRndInteger, createContent as htmlContent, media } from './utils.js';

export default class Slider {
	constructor(container, data) {
		this.data = data;
		this.container = container;
		/**
		 * @type {HTMLDivElement}
		 */
		this.content = this.createEl();
		this.contentPrev = null;
		this.contentNext = null;
		this.currentItems = [];
		this.currentItemsCached = [];
		this.nextItems = [];
		this.prevItems = [];
		this.length = 1;
		this.active = true;
	}
	init() {
		this.setLength();
	}
	create() {
		this.createContent(this.content, this.currentItems);
		this.container.append(this.content);
	}
	createEl(cls) {
		const el = document.createElement('div');
		el.className = 'slider__content';
		if (cls) {
			el.classList.add(cls);
		}
		return el;
	}
	createContent(el, items) {
		el.innerHTML = '';
		let HTML_STRING = '';
		for (let i = 0; i < items.length; i++) {
			HTML_STRING += htmlContent(items[i]);
		}
		el.insertAdjacentHTML('afterbegin', HTML_STRING);
	}
	setLength() {
		const sm = media('(max-width: 767px)');
		const md = media('(min-width: 768px)');
		const lg = media('(min-width: 1280px)');
		if (sm.matches) {
			this.length = 1;
		}
		if (md.matches) {
			this.length = 2;
		}
		if (lg.matches) {
			this.length = 3;
		}
		this.setcurrentItems();
		this.create();

		md.addEventListener('change', (e) => {
			if (e.matches) {
				this.length = 2;
			} else {
				this.length = 1;
			}
			this.create();
		});

		lg.addEventListener('change', (e) => {
			if (e.matches) {
				this.length = 3;
			} else {
				this.length = 2;
			}
			this.create();
		});
	}
	setcurrentItems() {
		const currentItems = [];
		while (currentItems.length < 3) {
			const index = getRndInteger(0, this.data.length);
			if (currentItems.findIndex((item) => item.name === this.data[index].name) === -1) {
				currentItems.push(this.data[index]);
			}
		}
		this.currentItems = currentItems;
	}
	setItems() {
		const newItems = [];
		while (newItems.length < 3) {
			const index = getRndInteger(0, this.data.length - 1);
			if (
				this.currentItems.findIndex((item) => item.name === this.data[index].name) === -1 &&
				newItems.findIndex((item) => item.name === this.data[index].name) === -1
			) {
				newItems.push(this.data[index]);
			}
		}
		return newItems;
	}
	isActive = (btn, e) => {
		if (e.propertyName === 'transform') {
			btn.style.opacity = 0.2;
			this.active = false;
		}
	};
	isInActive = (btn, e) => {
		if (e.propertyName === 'transform') {
			btn.style.opacity = 1;
			this.active = true;
		}
	};
	next(btn) {
		const isActive = this.isActive.bind(null, btn);
		const isInActive = this.isInActive.bind(null, btn);
		if (!this.contentNext) {
			this.contentNext = this.createEl('next');
			this.nextItems = this.setItems();
			this.createContent(this.contentNext, this.nextItems);
			this.container.append(this.contentNext);
		}
		this.contentNext.addEventListener('transitionstart', isActive);
		this.contentNext.addEventListener('transitionend', isInActive);
		this.contentNext.addEventListener('transitionend', (e) => {
			e.target.removeEventListener('transitionstart', isActive);
			e.target.removeEventListener('transitionend', isInActive);
		});
		if (!this.active) {
			return;
		}

		if (this.contentPrev) {
			let for_remove = this.contentPrev;
			for_remove.remove();
			for_remove = null;
		}
		setTimeout(() => {
			this.content.classList.add('prev');
			this.contentNext.classList.remove('next');
			this.contentPrev = this.content;
			this.prevItems = this.currentItems;
			this.content = this.contentNext;
			this.currentItems = this.nextItems;
			this.contentNext = this.createEl('next');
			this.nextItems = this.setItems();
			this.createContent(this.contentNext, this.nextItems);
			this.container.insertAdjacentElement('beforeEnd', this.contentNext);
		}, 0);
	}

	prev(btn) {
		const isActive = this.isActive.bind(null, btn);
		const isInActive = this.isInActive.bind(null, btn);
		if (!this.contentPrev) {
			this.contentPrev = this.createEl('prev');
			this.prevItems = this.setItems();
			this.createContent(this.contentPrev, this.prevItems);
			this.container.prepend(this.contentPrev);
		}
		this.contentPrev.addEventListener('transitionstart', isActive);
		this.contentPrev.addEventListener('transitionend', isInActive);
		this.contentPrev.addEventListener('transitionend', (e) => {
			e.target.removeEventListener('transitionstart', isActive);
			e.target.removeEventListener('transitionend', isInActive);
		});
		if (!this.active) {
			return;
		}
		if (this.contentNext) {
			let for_remove = this.contentNext;
			for_remove.remove();
			for_remove = null;
		}
		setTimeout(() => {
			this.content.classList.add('next');
			this.contentPrev.classList.remove('prev');
			this.contentNext = this.content;
			this.nextItems = this.currentItems;
			this.content = this.contentPrev;
			this.currentItems = this.prevItems;
			this.contentPrev = this.createEl('prev');
			this.prevItems = this.setItems();
			this.createContent(this.contentPrev, this.prevItems);
			this.container.insertAdjacentElement('afterbegin', this.contentPrev);
		}, 0);
	}
}
