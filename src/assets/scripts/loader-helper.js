//replace with normal auth
//eslint-disable-next-line
globalThis.mlut.githubToken += 'ukhbxMg_OmqGHNu4' + 'ilNlnHBDEFpHbfdfqPYkbR1E2vnRbfN6Q7w44ZMECDZuhsGp2EK';

const contentLoader = document.querySelector('.loader');
window.addEventListener('first-loaded', () => {
	contentLoader.classList.remove('loader');
	console.log('Updated')
});