import '../styles/mainStyles.scss'
import {images, icons, pets} from './modules/images'
import Popup from './modules/popup.js'

const helpIcons = ['pet-food', 'transportation', 'toys', 'bowls-and-cups', 'shampoos', 'vitamins', 'medicines', 'collars-or-leashes', 'sleeping-areas'];

document.querySelector('.hero__img img').src = images.startScreenPuppy;
document.querySelector('.about__img img').src = images.aboutPets;
document.querySelector('.addition__img img').src = images.donation;
document.querySelector('.footer__img img').src = images.footer;

document.querySelector('.katrine img').src = pets.katrine;
document.querySelector('.jennifer img').src = pets.jennifer;
document.querySelector('.woody img').src = pets.woody;

const imgName = (name) => {
	return name.split('').map((item, i) => i === 0 ? item.toUpperCase() : item).join('').replace(/\-/g, ' ').replace(/\sor\s/g, ' / ');
}

const varName = (name) => {
	return name.split('').map((item, i, arr) => arr[i-1] === '-' ? item.toUpperCase() : item).join('').replace(/\-/g, '');
}

helpIcons.forEach((iconName, i)=> {
	let iconBlock = document.createElement('div');
	iconBlock.classList.add('help__help-item');
	let img = document.createElement('img');
	img.src = icons[varName(iconName)];
	let h4 = document.createElement('h4');
	h4.textContent = imgName(iconName);
	iconBlock.appendChild(img);
	iconBlock.appendChild(h4);
	if (i < 5) {
		document.querySelectorAll('.help__items-container')[0].appendChild(iconBlock)
	} else {
		document.querySelectorAll('.help__items-container')[1].appendChild(iconBlock)
	}
})

 
new Popup('.slider-menu', '.burger-menu', 'right', 'flex').init();