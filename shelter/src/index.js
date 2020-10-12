import './styles/style.scss';
import startScreenPuppy from './assets/images/start-screen-puppy.png';
import aboutPets from './assets/images/about-pets.png';
import katrine from './assets/images/katrine.png'
import jenifer from './assets/images/jennifer.png'
import woody from './assets/images/woody.png'
import petFood from './assets/icons/pet-food.png'
import bowlsAndCups from './assets/icons/bowls-and-cups.png'
import collarsOrLeashes from './assets/icons/collars-or-leashes.png'
import medicines from './assets/icons/medicines.png'
import shampoos from './assets/icons/shampoos.png'
import sleepingAreas from './assets/icons/sleeping-area.png'
import toys from './assets/icons/toys.png'
import transportation from './assets/icons/transportation.png'
import vitamins from './assets/icons/vitamins.png'
import donation from './assets/images/donation-dog.png'
import footer from './assets/images/footer-puppy.png'

console.log(startScreenPuppy);

const images = {
	startScreenPuppy,
	aboutPets,
	katrine,
	jenifer,
	woody,
	donation,
	footer
}

document.querySelector('.hero__img img').src = images.startScreenPuppy;
document.querySelector('.about__img img').src = images.aboutPets;
document.querySelector('.katrine img').src = images.katrine;
document.querySelector('.jenifer img').src = images.jenifer;
document.querySelector('.woody img').src = images.woody;
document.querySelector('.addition__img img').src = images.donation;
document.querySelector('.footer__img img').src = images.footer;


const icons = {
	petFood,
	bowlsAndCups,
	collarsOrLeashes,
	medicines,
	shampoos,
	sleepingAreas,
	toys,
	transportation,
	vitamins
}


const helpIcons = ['pet-food', 'transportation', 'toys', 'bowls-and-cups', 'shampoos', 'vitamins', 'medicines', 'collars-or-leashes', 'sleeping-areas'];


const imgName = (name) => {
	return name.split('').map((item, i) => i === 0 ? item.toUpperCase() : item).join('').replace(/\-/g, ' ').replace(/\sor\s/g, ' / ');
}

const varName = (name) => {
	return name.split('').map((item, i, arr) => arr[i-1] === '-' ? item.toUpperCase() : item).join('').replace(/\-/g, '');
}

// console.log(varName('pet-food'));

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
 
