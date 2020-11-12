import Gem from "./Gem";

export default class Layout {
	constructor() {
		this.body = document.querySelector('body');
		this.main = this.createMain();
		this.startMenu = this.createStartMenu();
		this.startButtons = this.createButtons(["NEW GAME", "CONTINUE", "TOP 10"]);
		this.showBtns(this.startButtons);
		this.sizeButtons = this.createButtons(["3x3", "4x4", "5x5", "6x6", "7x7", "8x8"]);
		this.timerElement = this.createTimerElement();
		this.exit = this.createExit();
		this.header = this.createHeader();
		this.bindTriggers();
	}
	
	bindTriggers() {
		this.startButtons["new-game"].addEventListener("click", () => {
			this.newGameHandler();
		});
		for (let key in this.sizeButtons) {
			this.sizeButtons[key].addEventListener("click", () => {
				this.sizeHandler(this.sizeButtons[key].id)
			})
		};
		this.exit.addEventListener("click", () => {
			console.log(localStorage);
			this.exitHandler();
		});
		this.startButtons["continue"].addEventListener("click", () => {
			this.continueHandler();
		})
	}

	continueHandler() {
		this.startMenu.style.display = "none";
		this.puzzle = new Gem( +localStorage.dim, {
			imgSrc: localStorage.imgSrc,
			cellsIndexes: localStorage.cellsIndexes.split(",").map(index => +index),
			movements: +localStorage.movements,
			timer: {min: +localStorage.min, sec: +localStorage.sec}
		});
		this.puzzle.setupContinue();
		this.showtime();
		this.header.style.display = "";
	}

	exitHandler() {
		this.stopGame();
		this.puzzle.wrapper.remove();
		this.header.style.display = "none";
		this.hideBtns(this.sizeButtons);
		this.showBtns(this.startButtons);
		this.startMenu.style.display = "";
		console.log(localStorage);
	}

	stopGame() {
		clearTimeout(this.puzzle.timerId);
		clearTimeout(this.timerId);
	}

	createHeader() {
		const header = document.createElement("header");
		header.appendChild(this.timerElement);
		header.appendChild(this.exit);
		header.style.display = "none";
		this.body.prepend(header);
		return header;
	}

	createExit() {
		const exit = document.createElement("button");
		exit.innerHTML = this.createIconHTML("exit_to_app");
		return exit;
	}

	addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
	}

	createIconHTML(icon_name) {
		return `<i class="material-icons">${icon_name}</i>`;
	}

	showBtns(btns) {
		for (let key in btns) {
			btns[key].style.display = "";
		}
	}

	hideBtns(btns) {
		for (let key in btns) {
			btns[key].style.display = "none";
		}
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

	createButtons(arr) {
		const buttons = {};
		const startUl = document.createElement('ul');
		arr.forEach(elem => {
			const li = document.createElement('li');
			startUl.appendChild(li);
			const button = document.createElement('button');
			li.appendChild(button);
			button.textContent = elem;
			button.id = elem.split(" ").join("-").toLowerCase();
			buttons[button.id] = button;
			button.style.display = "none";
		})
		this.startMenu.appendChild(startUl);
		return buttons;
	}

	newGameHandler() {
		this.hideBtns(this.startButtons);
		this.showBtns(this.sizeButtons);
	}

	sizeHandler(size) {
		this.startMenu.style.display = "none";
		this.puzzle = new Gem(+size[0]);
		this.puzzle.setupNew();
		this.header.style.display = "";
		this.showtime();
	}

	createTimerElement() {
		this.timerElement = document.createElement("time");
		return this.timerElement;
	}

	showtime() {
		this.timerElement.innerHTML = `${this.addZero(this.puzzle.timer.min)}<span>:</span>${this.addZero(this.puzzle.timer.sec)}`;
		this.timerId = setTimeout(() => {
			this.showtime();
		}, 1000)
	}
}