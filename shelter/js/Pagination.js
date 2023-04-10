import { getRndInteger, shuffle } from './utils.js';

export default class Pagination {
	constructor() {
		this.lg = null;
		this.md = null;
		this.sm = null;
		this.page = 1;
		this.currentData = [];
		this.action = null;
	}
	init() {
		this.lg = this.createDate(6, 8).flat();
		this.md = this.createDate(8, 6).flat();
		this.sm = this.createDate(16, 3).flat();
		this.setCurrentData();
	}
	log = () => {
		console.log(this.currentData);
	};
	#render = () => {
		if (this.page > this.totalPage) {
			this.page = this.totalPage;
		}
		if (this.action) {
			this.action(this.getpage(this.page));
		}
	};
	setCurrentData() {
		const sm = window.matchMedia('(max-width: 767px)');
		const md = window.matchMedia('(min-width: 768px)');
		const lg = window.matchMedia('(min-width: 1280px)');
		if (sm.matches) {
			this.limit = 3;
			this.currentData = this.sm;
			this.totalPage = this.currentData.length / this.limit;
		}
		if (md.matches) {
			this.limit = 6;
			this.currentData = this.md;
			this.totalPage = this.currentData.length / this.limit;
		}
		if (lg.matches) {
			this.limit = 8;
			this.currentData = this.lg;
			this.totalPage = this.currentData.length / this.limit;
		}

		md.addEventListener('change', (e) => {
			if (e.matches) {
				this.limit = 6;
				this.currentData = this.md;
				this.totalPage = this.currentData.length / this.limit;
			} else {
				this.limit = 3;
				this.currentData = this.sm;
				this.totalPage = this.currentData.length / this.limit;
			}
			this.#render();
		});

		lg.addEventListener('change', (e) => {
			if (e.matches) {
				this.limit = 8;
				this.currentData = this.lg;
				this.totalPage = this.currentData.length / this.limit;
			} else {
				this.limit = 6;
				this.currentData = this.md;
				this.totalPage = this.currentData.length / this.limit;
			}
			this.#render();
		});
	}
	getpage = (page = 1) => {
		this.page = page;
		const skip = (this.page - 1) * this.limit;
		return {
			pets: this.currentData.slice(skip, skip + this.limit),
			next: this.currentData.slice(skip + this.limit).length / this.limit,
			prev: this.currentData.slice(0, skip).length / this.limit,
			last: this.totalPage,
			page: this.page,
		};
	};
	createDate(page, items) {
		let arr = [];
		for (let i = 0; i < page; i++) {
			arr[i] = [];
		}
		let n = 0;
		while (n < 48) {
			let idx = getRndInteger(0, 7);
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].includes(idx) || arr[i].length === items) {
					continue;
				}
				arr[i].push(idx);
				n++;
				break;
			}
		}
		arr = arr.map((item) => {
			shuffle(item);
			return item;
		});
		if (new Set(arr.map((item) => item.join(''))).size !== arr.length) {
			return this.createDate(page, items);
		} else {
			return arr;
		}
	}
}
