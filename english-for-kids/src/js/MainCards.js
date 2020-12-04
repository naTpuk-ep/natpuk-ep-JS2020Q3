import Card from './Card';
import cardsInfo from './cardsInfo';

export default class MainCards {
	constructor (burgerMenu) {
		this.burgerMenu = burgerMenu;
		this.burgerMenu.main = this;
		this.wrapper = document.querySelector('.main-wrapper');
		// this.removeAll();
		this.assetsPath = './assets';
		this.cards = [];
		this.initCards();
	}

	bindTriggers() {
		this.mainCardsElems.forEach((card, index) => {
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
		if (this.mode.playMode) {
			this.mode.showBtn();
			this.hideDesc();
		}
	}

	hideDesc() {
		this.cards.forEach(card => {
			card.cardElement.classList.toggle('play-card', this.playMode);
		});
	}

	removeAll() {
		[...this.wrapper.children].forEach(el => {
			el.remove();
		});
		this.cards = [];
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
		
		this.mainCardsElems = mainCards;
			if (this.mode) { 
				if (this.mode.playMode) {
					this.mainCardPlayVisualize();
				}
			}

		this.bindTriggers();
		// return mainCards;
	}
	mainCardPlayVisualize() {
		this.mainCardsElems.forEach(el => {
			el.classList.toggle('main-card__play');
		});
	}
}