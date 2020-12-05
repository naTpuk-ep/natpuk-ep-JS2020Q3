import Card from './Card';
import cardsInfo from './cardsInfo';

export default class Main {
	constructor (burgerMenu) {
		this.audio = document.querySelector('audio');
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

	playNextHandler() {
		this.currentCardNum = this.shuffleArr.pop();
		this.audio.src = 'assets/' + cardsInfo[this.catNumber][this.currentCardNum].audioSrc;
		this.playCurrHandler();
		this.holdCurrent = false;
	}

	playCurrHandler() {
		this.audio.play();
	}

	succesHandler() {
		this.audio.src = 'assets/audio/success.mp3';
		this.audio.play();
		this.removeAll();
		document.querySelector('body').style.background = 'assets/img/success.jpg';
		this.audio.addEventListener('ended', () => {
			// this.removeAll();
			// this.initCards();
		}, {once:true});
	}

	openCategoryHandler(index) {
		this.removeAll();
		this.catNumber = index + 1;
		cardsInfo[this.catNumber].forEach((card, i) => {
			this.cards.push(new Card(this.catNumber, i, this));
		});
		if (this.mode.playMode) {
			this.mode.showBtn();
			this.hideDesc();
		}
		this.shuffleArr = this.createShuffleArr();
		this.holdCurrent = true;
		// console.log(this.shuffleArr);
	}

	createShuffleArr() {
		let a = [];
		for (let i = 0; i < this.cards.length; i++) {
			a.push(i);
		}
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
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
	}

	mainCardPlayVisualize() {
		this.mainCardsElems.forEach(el => {
			el.classList.toggle('main-card__play');
		});
	}

}