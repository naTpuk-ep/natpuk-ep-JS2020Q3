import Card from './Card';
import cardsInfo from './cardsInfo';

export default class Main {
	constructor (burgerMenu) {
		this.audio = document.querySelector('audio');
		this.burgerMenu = burgerMenu;
		this.burgerMenu.main = this;
		this.wrapper = document.querySelector('.main-wrapper');
		this.assetsPath = './assets';
		this.cards = [];
		this.categoryNameElement = document.querySelector('.category-name');
		this.initMainCards();
		this.raitingElement = document.querySelector('.raiting');
		this.currScore = [];
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
		this.playCurrHandler();
		this.holdCurrent = false;
	}

	playCurrHandler() {
		this.audio.src = 'assets/' + cardsInfo[this.catNumber][this.currentCardNum].audioSrc;
		this.audio.play();
	}

	endGameHandler() {
		[...document.body.children].forEach(el => {
			el.style.display = 'none';
		});
		let finalElement = this.createFinalElement();
		this.removeAll();
		this.audio.play();
		this.audio.addEventListener('ended', () => {
			[...document.body.children].forEach(el => {
				el.style.display = '';
			});
			finalElement.remove();
			this.initMainCards();
			this.mode.hideBtn();
		}, {once:true});
	}

	createFinalElement() {
		let finalElement = document.createElement('div');
		finalElement.classList.add('final');
		let imgDiv = document.createElement('div');
		finalElement.appendChild(imgDiv);
		if(this.currScore.every(e => e)) {
			this.success(finalElement);
		} else {
			this.failure(finalElement);
		}
		document.body.appendChild(finalElement);
		return finalElement;
	}
	
	success(div) {
			this.audio.src = 'assets/audio/success.mp3';
			div.classList.add('success');
			return div;
		}

	failure(div) {
		this.audio.src = 'assets/audio/failure.mp3';
		div.prepend(`${this.currScore.filter(e => !e).length} errors`);
		div.classList.add('failure');
		return div;
	}

	openCategoryHandler(index) {
		this.removeAll();
		this.catNumber = index + 1;
		cardsInfo[this.catNumber].forEach((card, i) => {
			this.cards.push(new Card(this.catNumber, i, this));
		});
		this.categoryNameElement.textContent = cardsInfo[0][index];
		if (this.mode.playMode) {
			this.mode.showBtn();
			this.hideDesc();
		}
		this.shuffleArr = this.createShuffleArr();
		this.holdCurrent = true;
		this.mode.transformBtnToPlay();
	}

	createShuffleArr() {
		let arr = [];
		for (let i = 0; i < this.cards.length; i++) {
			arr.push(i);
		}
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	}

	hideDesc() {
		this.cards.forEach(card => {
			card.cardElement.classList.toggle('play-card', this.playMode);
		});
	}

	clearCurrScore() {
		[...this.raitingElement.children].forEach(e => e.remove());
		this.currScore = [];
	}

	removeAll() {
		[...this.wrapper.children].forEach(e => e.remove());
		this.cards = [];
		this.clearCurrScore();
	}

	initMainCards() {
		let mainCards = [];
		cardsInfo[0].forEach((cat, i) => {
			let card = document.createElement('div');
			card.classList.add('card', 'main-card');
			let divImg = document.createElement('div');
			divImg.classList.add('card__img');
			let img = document.createElement('img');
			let someImgOfcategoryIndex = Math.floor(Math.random() * cardsInfo[i + 1].length);
			img.src = `${this.assetsPath}/${cardsInfo[i + 1][someImgOfcategoryIndex].image}`;
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
		this.categoryNameElement.textContent = '';
	}

	mainCardPlayVisualize() {
		this.mainCardsElems.forEach(el => {
			el.classList.toggle('main-card__play');
		});
	}

}