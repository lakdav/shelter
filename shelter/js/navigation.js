import { views } from './views.js';
import { removeOveflowHiddenMenu, setOveflowHiddenMenu } from './utils.js';
const { navigationMenu, navigationToggleBtn } = views;
export const navigationHandler = () => {
	navigationToggleBtn.addEventListener('click', () => {
		setOveflowHiddenMenu('.overlow__menu');
		navigationToggleBtn.setAttribute(
			'aria-expanded',
			navigationToggleBtn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true',
		);
		navigationMenu.classList.toggle('open');
	});
	navigationMenu.addEventListener('click', (e) => {
		if (e.target.closest('.navigation__item')) {
			removeOveflowHiddenMenu('.overlow__menu');
			navigationToggleBtn.setAttribute('aria-expanded', false);
			navigationMenu.classList.remove('open');
		}
	});
	document.addEventListener('click', (e) => {
		if (e.target.closest('#navigation') || e.target.closest('#toggle-nav')) {
			return;
		}
		if (navigationMenu.classList.contains('open')) {
			removeOveflowHiddenMenu('.overlow__menu');
			navigationToggleBtn.setAttribute('aria-expanded', false);
			navigationMenu.classList.remove('open');
		}
	});
};
