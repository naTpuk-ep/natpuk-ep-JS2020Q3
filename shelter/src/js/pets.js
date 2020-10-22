import '../styles/petsStyles.scss'
import {images, pets} from './modules/images.js'
import BurgerMenu from './modules/burgerMenu.js'
import Popup from './modules/popup'
import Pagination from './modules/pagination'

document.querySelector('#katrine img').src = pets.katrine;
document.querySelector('#jennifer img').src = pets.jennifer;
document.querySelector('#woody img').src = pets.woody;
document.querySelector('#sophia img').src = pets.sophia;
document.querySelector('#timmy img').src = pets.timmy;
document.querySelector('#charly img').src = pets.charly;
document.querySelector('#scarlett img').src = pets.scarlett;
document.querySelector('#freddie img').src = pets.freddie;

document.querySelector('.footer__img img').src = images.footer;

new BurgerMenu('.slider-menu', '.burger-menu svg', 'flex').init();

new Pagination().render();

// new Popup('.popup').init();