export function createContent(data, cls) {
	return `<article  class="card">
	<div class="card__image">
		<img src="./${data.img}" alt="${data.name}">
	</div>
	<h2 class="card__name">${data.name}</h2>
	<button  data-modal="${data.name}" aria-label="read more about ${data.name}" class="card__btn btn outlined">Learn more</button>
	</article>`;
}
export function media(mediaString) {
	return window.matchMedia(mediaString);
}
export function getRndInteger(min, max) {
	let n = min;
	if (min === 0) n = 1;
	return Math.floor(Math.random() * (1 + max - min)) + min;
}
export function setOveflowHidden() {
	const p = window.innerWidth - document.body.clientWidth + 'px';
	document.body.style.setProperty('--p', p);
	document.body.classList.add('overflow-hidden');
}
export function RemoveOveflowHidden() {
	document.body.style.setProperty('--p', 0);
	document.body.classList.remove('overflow-hidden');
}
export function setOveflowHiddenMenu(selector) {
	document.body.classList.toggle('overflow-hidden');
	togleOverlow(selector);
}
export function removeOveflowHiddenMenu(selector) {
	document.body.classList.remove('overflow-hidden');
	togleOverlow(selector);
}
export function togleOverlow(selector) {
	document.querySelector(selector).classList.toggle('show');
}
export function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}
// name: 'Katrine',
// img: 'assets/images/katrine.png',
// type: 'Cat',
// breed: 'British Shorthair',
// description:
// 	'Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.',
// age: '6 months',
// inoculations: ['panleukopenia'],
// diseases: ['none'],
// parasites: ['none'],
export function modalHtml({ name, img, type, breed, description, age, inoculations, diseases, parasites }) {
	return `<div class="modal__layout">
		<div class="modal__decor"><img src="${img}" alt="${name}"/></div>
		<div class="modal__content">
			<div class="modal__header">
				<h2>${name}</h2>
				<h3> ${type} - ${breed}</h3>
			</div>
			<p class="modal__text"> ${description}</p>
			<div class="modal__footer">
				<ul class="modal__list">
					<li class="modal__item modal__age"><span class="dot"></span>
						<p><span class="field">Age:</span><span class="value">&nbsp;${age}</span></p>
					</li>
					<li class="modal__item modal__inoculations"><span class="dot"></span>
						<p><span class="field">Inoculations:</span><span class="value">&nbsp;${inoculations}</span></p>
					</li>
					<li class="modal__item modal__diseases"><span class="dot"></span>
						<p><span class="field">Diseases:</span><span class="value">&nbsp;${diseases}</span></p>
					</li>
					<li class="modal__item modal__parasites"><span class="dot"></span>
						<p><span class="field">Parasites:</span><span class="value">&nbsp;${parasites}</span></p>
					</li>
				</ul>
			</div>
		</div>
		<button class=modal__close><span></span><span></span></button>
	</div>`;
}
