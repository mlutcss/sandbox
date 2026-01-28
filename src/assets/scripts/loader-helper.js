//replace with normal auth
//eslint-disable-next-line
globalThis.mlut.githubToken = 'github'+'_pat_11ACX5TXY0pH'+'JX2lKUGh5M_B9TrwNMoCtdEHMP70'+'VlVH2lTkxVZ8WLpm1zpMAhiZ5cS2'+'FXBO2LQD6IXFtL';

const contentLoader = document.querySelector('.loader');
window.addEventListener('first-loaded', () => {
	contentLoader.classList.remove('loader');
});