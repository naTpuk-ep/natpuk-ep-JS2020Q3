// const fs = require('fs');
const path = require('path');

import './styles/style.scss'
import startScreenPuppy from './assets/images/start-screen-puppy.png'
import aboutPets from './assets/images/about-pets.png'
import katrine from './assets/images/katrine.png'
import jenifer from './assets/images/jennifer.png'
import woody from './assets/images/woody.png'
import donation from './assets/images/donation-dog.png'
import footer from './assets/images/footer-puppy.png'

const helpIcons = ['pet-food', 'transportation', 'toys', 'bowls-and-cups', 'shampoos', 'vitamins', 'medicines', 'collars-or-leashes', 'sleeping-areas'];

document.querySelector('.hero__img img').src = startScreenPuppy;
document.querySelector('.about__img img').src = aboutPets;
document.querySelector('.katrine img').src = katrine;
document.querySelector('.jenifer img').src = jenifer;
document.querySelector('.woody img').src = woody;
document.querySelector('.addition__img img').src = donation;
document.querySelector('.footer__img img').src = footer;

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
	img.src = path.join('../src/assets/icons', `${iconName}.png`);
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
 
