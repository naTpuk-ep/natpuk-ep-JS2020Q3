import '../autoCloser.js';
import './index.scss';
import Main from './js/Main';
import BurgerMenu from './js/burgerMenu';
import Mode from './js/Mode';

const burger = new BurgerMenu('.menu', '.burger-menu');

const main = new Main(burger);

new Mode(main);