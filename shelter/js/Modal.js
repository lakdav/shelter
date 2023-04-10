import { RemoveOveflowHidden, modalHtml, setOveflowHidden } from './utils.js';

export default class Modal {
	constructor() {
		this.overlow = document.querySelector('.overlow__modal');
		this.modal = null;
		this.i = 0;
	}
	show(data) {
		if (this.modal) {
			this.modal.remove();
		}
		this.create(data);
		setOveflowHidden();
		document.body.appendChild(this.modal);
		this.modal.classList.add('fadeIn');
		this.modal.querySelector('.modal__close').addEventListener('click', () => {
			this.close();
		});
		this.modal.addEventListener('click', (e) => {
			if (e.target === e.currentTarget) {
				this.close();
			}
		});
	}
	close = () => {
		this.modal.classList.remove('fadeIn');
		this.modal.classList.add('fadeOut');
		this.modal.addEventListener('animationend', () => {
			RemoveOveflowHidden();
			this.modal.remove();
			this.modal = null;
		});
	};
	create(data) {
		const div = document.createElement('div');
		div.className = 'modal';
		div.insertAdjacentHTML('afterbegin', modalHtml(data));
		this.modal = div;
	}
}
