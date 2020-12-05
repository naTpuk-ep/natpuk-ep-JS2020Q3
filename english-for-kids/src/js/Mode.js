// import cardsInfo from './cardsInfo';

export default class Mode {
	constructor(main) {
		this.main = main;
		this.main.mode = this;
		this.toggle = document.querySelector('.toggle');
		this.playMode = false;
		this.startPlayBtn = this.createPlayBtn();
		this.audio = document.querySelector('audio');
		this.bindTriggers();
	}

	showBtn() {
		this.startPlayBtn.style.transform = 'scale(1)';
	}

	hideBtn() {
		this.startPlayBtn.style.transform = 'scale(0)';
	}

	visualizeMode() {
		this.toggle.classList.toggle('play');
		setTimeout(() => {
			this.toggle.querySelector('.mode').textContent = this.toggle.querySelector('.mode').textContent.toLowerCase() === 'play' ? 'train' : 'play';
		}, 100);
		this.main.mainCardPlayVisualize();
		this.main.hideDesc();
	}

	modeToggle() {
		this.playMode = !this.playMode;
		this.visualizeMode();
		if(this.playMode && this.main.cards.length > 0) {
			this.showBtn();
		} else {
			this.hideBtn();
		}
	}

	createPlayBtn() {
		let btn = document.createElement('button');
		btn.classList.add('play-btn');
		btn.textContent = 'Play';
		btn.style.transform = 'scale(0)';
		document.querySelector('main').appendChild(btn);
		return btn;
	}

	bindTriggers() {
		this.toggle.addEventListener('click', () => {
			this.modeToggle();
		});
		this.startPlayBtn.addEventListener('click', () => {
			if (this.main.holdCurrent) {
				this.main.playNextHandler();
			} else {
				this.main.playCurrHandler();
			}
		});
	}

}