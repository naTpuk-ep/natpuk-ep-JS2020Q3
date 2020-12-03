import cardsInfo from './cardsInfo.js';
import MainCards from './MainCards';

export default class BurgerMenu {
	constructor (menuSelector, triggerSelector) {
		this.menu = document.querySelector(menuSelector);
		this.trigger = document.querySelector(triggerSelector);
		this.filter = document.querySelector('.filter');
		this.body = document.querySelector('body');
		this.header = document.querySelector('header');
		this.isShow = false;
		this.linkList = this.initList();
		this.main = new MainCards(this);
		this.bindTriggers();
	}

	burgerRotate(){
		this.trigger.style.transform = this.isShow ? 'rotate(90deg)' : 'rotate(0deg)';
	}

	show(){
		this.isShow = !this.isShow;
		this.burgerRotate();
		this.body.style.overflow = 'hidden';
		this.filter.style.display = 'block';
		this.menu.style.left = 0;
	}

	hide(){
		this.filter.style.display = 'none';
		this.body.style.overflow = '';
		this.isShow = !this.isShow;
		this.menu.style.left = '-320px';
		this.burgerRotate();
	}

	linkHandler(i) {
		this.linkList.forEach(el => {
			el.classList.remove('menu__link-active');
		});
		this.linkList[i].classList.add('menu__link-active');
		if (i === 0) {
			this.main = new MainCards(this);
		} else {
			this.main.openCategoryHandler(i - 1);
		}
	}

	bindTriggers(){
		this.trigger.addEventListener('click', () => {
			if (!this.isShow) this.show();
			else this.hide();
		});
		this.filter.addEventListener('click', () => {
			this.hide();
		});
		this.linkList.forEach((link, i) => {
			link.addEventListener('click', () => {
				this.linkHandler(i);
			});
		});
	}

	initList(){
		let linklist = [];
		let list = document.createElement('ul');
		list.classList.add('menu__list');
		cardsInfo.forEach((cat, i) => {
			let li = document.createElement('li');
			let a = document.createElement('a');
			a.classList.add('menu__link');
			if (i === 0) {
				a.classList.add('menu__link-active');
				a.textContent = 'Main Page';
			} else {
				a.textContent = cardsInfo[0][i - 1];
			}
			li.appendChild(a);
			linklist.push(a);
			list.appendChild(li);
		});
		this.menu.appendChild(list);
		return linklist;
	}
}