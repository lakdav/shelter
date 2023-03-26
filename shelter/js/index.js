import data from './data.js';
console.log(data);
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

const pets_friends_layout = document.getElementById('pets_layout');
if (pets_friends_layout) {
	let HTML_STRING = '';
	for (let i = 0; i < data.length; i++) {
		HTML_STRING += `<article class="card">
   <div class="card__image">
	   <img src="./assets/pets/${data[i].img}" alt="${data[i].name}">
   </div>
   <h2 class="card__name">${data[i].name}</h2>
   <button id="card-modal" class="card__btn btn outlined">Learn more</button>
   </article>`;
	}
	pets_friends_layout.insertAdjacentHTML('afterbegin', HTML_STRING);
}
