import cardsInfo from './cardsInfo';

export default class Card {
	constructor (catNumber, cardNumber) {
		this.assetsPath = './assets';
		this.img = `${this.assetsPath}/${cardsInfo[catNumber][cardNumber].image}`;
		this.word = cardsInfo[catNumber][cardNumber].word;
		this.tranlation = cardsInfo[catNumber][cardNumber].translation;
		this.audioSrc = `${this.assetsPath}/${cardsInfo[catNumber][cardNumber].audioSrc}`;
		this.wrapper = document.querySelector('.main-wrapper');
		this.cardElement = this.initCard();
		this.bindTriggers();
	}

	bindTriggers() {
		this.rotate.addEventListener('click', () => {
			this.cardElement.classList.add('translate');
		});
		this.wrapper.addEventListener('mouseover', (e) => {
			if (e.target === this.wrapper) {
				this.cardElement.classList.remove('translate');
			}
		});
	}

	initCard() {
		let card = document.createElement('div');
		card.classList.add('card');
		let front = document.createElement('div');
		front.classList.add('front');
		let divImgF = document.createElement('div');
		divImgF.classList.add('card__img');
		let imgF = document.createElement('img');
		imgF.src = this.img;
		divImgF.appendChild(imgF);
		let back = document.createElement('div');
		back.classList.add('back');
		let divImgB = document.createElement('div');
		divImgB.classList.add('card__img');
		let imgB = document.createElement('img');
		imgB.src = this.img;
		divImgB.appendChild(imgB);
		let descF = document.createElement('div');
		descF.classList.add('card__desc');
		descF.textContent = this.word;
		let descB = document.createElement('div');
		descB.classList.add('card__desc');
		descB.textContent = this.tranlation;
		let rotate = document.createElement('div');
		rotate.classList.add('rotate-icon');
		descF.appendChild(rotate);
		front.appendChild(divImgF);
		front.appendChild(descF);
		back.appendChild(divImgB);
		back.appendChild(descB);
		card.appendChild(front);
		card.appendChild(back);
		this.wrapper.appendChild(card);

		this.rotate = rotate;
		this.back = back;
		
		return card;
	}
}