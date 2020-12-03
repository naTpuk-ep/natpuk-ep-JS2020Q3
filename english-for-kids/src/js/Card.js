import cardsInfo from './cardsInfo';

export default class CategoryCard {
	constructor (catNumber, cardNumber) {
		this.assetsPath = './assets';
		console.log(cardsInfo[catNumber][cardNumber]);
		this.img = `${this.assetsPath}/${cardsInfo[catNumber][cardNumber].image}`;
		this.word = cardsInfo[catNumber][cardNumber].word;
		this.tranlation = cardsInfo[catNumber][cardNumber].translation;
		this.audioSrc = `${this.assetsPath}/${cardsInfo[catNumber][cardNumber].audioSrc}`;
		this.wrapper = document.querySelector('.main-wrapper');
		this.initCard();
	}

	initCard() {
		let card = document.createElement('div');
		card.classList.add('card', 'main-card');
		let divImg = document.createElement('div');
		divImg.classList.add('card__img');
		let img = document.createElement('img');
		img.src = this.img;
		divImg.appendChild(img);
		let desc = document.createElement('div');
		desc.classList.add('card__desc');
		desc.textContent = this.word;
		card.appendChild(divImg);
		card.appendChild(desc);
		this.wrapper.appendChild(card);
	}
}