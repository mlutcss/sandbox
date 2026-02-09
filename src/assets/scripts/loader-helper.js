const contentLoader = document.querySelector('.loader');
window.addEventListener('remove-loader', () => {
	contentLoader.classList.remove('loader');
});