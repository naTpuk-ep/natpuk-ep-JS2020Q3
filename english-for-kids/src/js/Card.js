import cardsInfo from './cardsInfo';

export default class Card {
	constructor (catNumber, cardNumber, main) {
		this.audio = document.querySelector('audio');
		this.main = main;
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
		this.cardElement.addEventListener('mouseleave', () => {
					this.cardElement.classList.remove('translate');
		});
		this.frontImg.addEventListener('click', () => {
			this.playHandler();
		});
	}

	correctHandler() {
		this.audio.src = 'assets/audio/correct.mp3';
		this.audio.play();
		this.cardElement.style.transform = 'scale(0.9)';
		this.front.style.boxShadow = '0 0 1px 0 black';
		this.cardElement.style.filter = 'grayscale(0.8)';
		this.front.setAttribute("disabled", "disabled");
		this.front.style.pointerEvents = 'none';
		this.audio.addEventListener('ended', () => {

			if (this.main.shuffleArr.length === 0) {
				this.main.endGameHandler();
			} else {
				this.main.playNextHandler();
			}
		}, {once:true});
		this.addCorrectStar();
	}

	addCorrectStar() {
		let star = document.createElement('div');
		star.classList.add('star', 'star-correct');
		this.main.raitingElement.appendChild(star);
		this.main.currScore.push(true);
	}

	addErrorStar() {
		let star = document.createElement('div');
		star.classList.add('star', 'star-error');
		this.main.raitingElement.appendChild(star);
		this.main.currScore.push(false);
	}

	errorHandler() {
		this.audio.src = 'assets/audio/error.mp3';
		this.audio.play();
		this.addErrorStar();
	}

	playHandler() {
		if (this.main.mode.playMode) {
			if (this.checkRightCard(this.main.currentCardNum)) {
				this.correctHandler();
			} else {
				this.errorHandler();
			}
		} else {
			this.playCardAudio();
		}
	}

	checkRightCard(curr) {
		return this.main.cards.indexOf(this) === curr;
	}

	playCardAudio() {
		this.audio.src = this.audioSrc;
		this.audio.play();
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
		this.front = front;
		this.frontImg = divImgF;
		this.back = back;

		return card;
	}
}