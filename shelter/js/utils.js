export function createContent(data, cls) {
	return `<article class="card">
	<div class="card__image">
		<img src="./${data.img}" alt="${data.name}">
	</div>
	<h2 class="card__name">${data.name}</h2>
	<button id="card-modal" class="card__btn btn outlined">Learn more</button>
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
	document.body.classList.toggle('overflow-hidden');
	togleOverlow();
}
export function togleOverlow() {
	document.querySelector('.overlow').classList.toggle('show');
}
export function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}
