export function randomImage() {
	const img = `./assets/img/${Math.ceil(Math.random() * 150)}.jpg`;
	return  img !== localStorage.imgSrc ? img : randomImage();
};