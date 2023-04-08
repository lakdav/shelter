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
	return Math.floor(Math.random() * (max - min)) + min;
}
