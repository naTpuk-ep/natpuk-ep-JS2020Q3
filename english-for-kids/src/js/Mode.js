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
		this.transformBtnToPlay();
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
			this.main.clearCurrScore();
			this.hideBtn();
		}
	}

	createPlayBtn() {
		let btn = document.createElement('button');
		btn.classList.add('play-btn');
		btn.innerHTML = 'Play';
		btn.style.transform = 'scale(0)';
		document.querySelector('main').appendChild(btn);
		return btn;
	}

	transformBtnToRepeat() {
		this.startPlayBtn.classList.add('repeat-btn');
		this.startPlayBtn.innerHTML = `<i class="material-icons">replay</i>`;
	}

	transformBtnToPlay() {
		this.startPlayBtn.classList.remove('repeat-btn');
		this.startPlayBtn.innerHTML = `Play`;
	}

	// createIconHTML(icon_name) {
	// 	return `<i class="material-icons">${icon_name}</i>`;
	// }

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
			this.transformBtnToRepeat();
		});
	}

}