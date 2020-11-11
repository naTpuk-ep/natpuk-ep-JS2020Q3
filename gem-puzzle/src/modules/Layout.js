import Gem from "./Gem";

export default class Layout {
	constructor() {
		this.body = document.querySelector('body');
		this.main = this.createMain();
		this.startMenu = this.createStartMenu();
		this.buttons = this.createButtons();
		this.bindTriggers();
	}

	bindTriggers() {
		this.buttons["new-game"].addEventListener("click", () => {
			this.newGameHandler();
		})
	}
	
	createMain() {
		const main = document.createElement('main');
		this.body.prepend(main);
		return main;
	}

	createStartMenu() {
		const startMenu = document.createElement('div');
		startMenu.classList.add('start-menu');
		this.main.appendChild(startMenu);
		return startMenu;
	}

	createButtons() {
		const buttons = {};
		const startUl = document.createElement('ul');
		["NEW GAME", "CONTINUE", "TOP 10"].forEach(elem => {
			const li = document.createElement('li');
			startUl.appendChild(li);
			const button = document.createElement('button');
			li.appendChild(button);
			button.textContent = elem;
			button.id = elem.split(" ").join("-").toLowerCase();
			buttons[button.id] = button;
		})
		this.startMenu.appendChild(startUl);
		return buttons;
	}

	newGameHandler() {
		this.startMenu.style.display = "none";
		this.puzzle = new Gem(4);
		this.timerElement = this.createTimerElement();
	}

	createTimerElement() {
		this.timerElement = document.createElement("time");
		this.body.prepend(this.timerElement);
		this.showtime();
		return this.timerElement;
	}

	showtime() {
		this.timerElement.innerHTML = `${this.puzzle.timer.min}<span>:</span>${this.puzzle.timer.sec}`;
		setTimeout(() => {
			this.showtime();
		}, 1000)
	}
}