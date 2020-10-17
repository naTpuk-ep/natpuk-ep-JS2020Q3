import '../styles/petsStyles.scss'
import {images, pets} from './modules/images.js'
import Popup from './modules/popup.js';

document.querySelector('.katrine img').src = pets.katrine;
document.querySelector('.jennifer img').src = pets.jennifer;
document.querySelector('.woody img').src = pets.woody;
document.querySelector('.sophia img').src = pets.sophia;
document.querySelector('.timmy img').src = pets.timmy;
document.querySelector('.charly img').src = pets.charly;
document.querySelector('.scarlett img').src = pets.scarlett;
document.querySelector('.freddie img').src = pets.freddie;

document.querySelector('.footer__img img').src = images.footer;

new Popup('.slider-menu', '.burger-menu', 'right', 'flex').init();
