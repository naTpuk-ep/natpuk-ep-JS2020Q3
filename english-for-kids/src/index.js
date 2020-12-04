import '../autoCloser.js';
import './index.scss';
import MainCards from './js/MainCards';
import BurgerMenu from './js/burgerMenu';
import Mode from './js/Mode';

const burger = new BurgerMenu('.menu', '.burger-menu');

const mainCards = new MainCards(burger);

new Mode(mainCards);