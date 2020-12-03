import Card from './Card';
import cardsInfo from './cardsInfo';

export default class MainCards {
	constructor (burgerMenu) {
		this.burgerMenu = burgerMenu;
		this.wrapper = document.querySelector('.main-wrapper');
		this.removeAll();
		this.assetsPath = './assets';
		this.cards = [];
		this.cardsElems = this.initCards();
		this.bindTriggers();
	}

	bindTriggers() {
		this.cardsElems.forEach((card, index) => {
			card.addEventListener('click', () => {
				this.burgerMenu.linkHandler(index + 1);
			});
		});
	}

	openCategoryHandler(index) {
		this.removeAll();
		cardsInfo[index + 1].forEach((card, i) => {
			this.cards.push(new Card(index + 1, i));
		});
	}

	removeAll() {
		[...this.wrapper.children].forEach(el => {
			el.remove();
		});
	}

	initCards() {
		let mainCards = [];
		cardsInfo[0].forEach((cat, i) => {
			let card = document.createElement('div');
			card.classList.add('card', 'main-card');
			let divImg = document.createElement('div');
			divImg.classList.add('card__img');
			let img = document.createElement('img');
			let someImgOfcategory = 3;
			img.src = `${this.assetsPath}/${cardsInfo[i + 1][someImgOfcategory].image}`;
			divImg.appendChild(img);
			let desc = document.createElement('div');
			desc.classList.add('card__desc');
			desc.textContent = cat;
			card.appendChild(divImg);
			card.appendChild(desc);
			this.wrapper.appendChild(card);
			mainCards.push(card);
		});
		return mainCards;
	}
}