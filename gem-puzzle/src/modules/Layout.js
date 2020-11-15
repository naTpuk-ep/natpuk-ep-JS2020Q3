import Gem from "./Gem";

export default class Layout {
	constructor() {
		this.body = document.querySelector('body');
		this.main = this.createMain();
		this.startMenu = this.createStartMenu();
		this.startButtons = this.createButtons(["NEW GAME", "CONTINUE", "TOP 10"]);
		this.sizeButtons = this.createButtons(["3x3", "4x4", "5x5", "6x6", "7x7", "8x8"]);
		this.timerElement = this.createTimerElement();
		this.movementsElement = this.createMovementsElement();
		this.exit = this.createExit();
		this.header = this.createHeader();
		this.muteElement = this.createSound();
		this.tableData = [];
		this.topTableElement = this.createtopTableElement();
		// this.viewImgElement = this.createviewImgElement();
		this.bindTriggers();
	}

	//------------------layouts-------------------

	createtopTableElement() {
		const tableElem = document.createElement("table");
		const headings = ["", "SIZE" ,"MOVES", "TIME"]
		for (let i = 0; i < 11; i++) {
			const tr = document.createElement("tr");
			this.tableData[i] = [];
			for(let j = 0; j < 4; j++) {
				const td = document.createElement("td");
				const th = document.createElement("th");
				if (i === 0 || j === 0) {
					th.textContent = i === 0 ? headings[j] : null;
					tr.appendChild(th);


				} else {
					// td = 
					this.tableData[i].push(td);
					tr.appendChild(td);
				}
			}
			tableElem.appendChild(tr);
		}
		this.tableData.shift();
		tableElem.style.display = "none";
		this.startMenu.appendChild(tableElem);
		console.log(this.tableData);
		return tableElem;
	}

	createSound() {
		const audio = document.createElement("audio");
		audio.src = "./assets/sound.mp3";
		this.audio = audio;
		this.body.appendChild(audio);
		const muteElem = document.createElement("div");
		muteElem.innerHTML = this.createIconHTML("volume_up");
		muteElem.classList.add("mute");
		this.main.appendChild(muteElem);
		muteElem.style.display = "none";
		return muteElem;
	}

	createMovementsElement() {
		const movements = document.createElement("span");
		return movements;
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
		this.showBtns(this.startButtons);
		return buttons;
	}
	
	createTimerElement() {
		this.timerElement = document.createElement("time");
		return this.timerElement;
	}

	createHeader() {
		const header = document.createElement("header");
		header.appendChild(this.timerElement);
		header.appendChild(this.movementsElement);
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
	
	addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
	}

	createIconHTML(icon_name) {
		return `<i class="material-icons">${icon_name}</i>`;
	}

	// ---------------- Handlers --------------------
	
	newGameHandler() {
		this.hideBtns(this.startButtons);
		this.showBtns(this.sizeButtons);
	}

	sizeHandler(size) {
		this.startMenu.style.display = "none";
		this.movementsElement.textContent = "";
		this.puzzle = new Gem(this, +size[0]);
		this.puzzle.setupNew();
		this.header.style.display = "";
		this.muteElement.style.display = "";
		this.showtime();
	}
	
	continueHandler() {
		this.startMenu.style.display = "none";
		this.puzzle = new Gem(this, +localStorage.dim, {
			imgSrc: localStorage.imgSrc,
			cellsIndexes: localStorage.cellsIndexes.split(",").map(index => +index),
			movements: +localStorage.movements,
			timer: {min: +localStorage.min, sec: +localStorage.sec}
		});
		this.puzzle.setupContinue();
		this.showtime();
		this.header.style.display = "";
		this.muteElement.style.display = "";
	}

	exitHandler() {
		this.stopGame();
		this.puzzle.wrapper.remove();
		this.header.style.display = "none";
		this.hideBtns(this.sizeButtons);
		this.showBtns(this.startButtons);
		this.startMenu.style.display = "";
		this.muteElement.style.display = "none";
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

	showtime() {
		this.timerElement.innerHTML = `${this.addZero(this.puzzle.timer.min)}<span>:</span>${this.addZero(this.puzzle.timer.sec)}`;
		this.timerId = setTimeout(() => {
			this.showtime();
		}, 1000)
	}

	stopGame() {
		clearTimeout(this.puzzle.timerId);
		clearTimeout(this.timerId);
	}

	soundToggle() {
		if (this.muteElement.querySelector(".material-icons").textContent === "volume_up") {
			this.muteElement.innerHTML = this.createIconHTML("volume_off");
			this.audio.muted = true;
		} else {
			this.muteElement.innerHTML = this.createIconHTML("volume_up");
			this.audio.muted = false;
		}
	}

	topHandler() {
		this.hideBtns(this.startButtons);
		this.showTableElement(); //---------
	}

	showTableElement() {
		this.topTableElement.style.display = "";
	}

	hideTableElement() {
		this.topTableElement.style.display = "none";
	}

	// ------------------------bind--------------------------------

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
			this.exitHandler();
		});
		this.startButtons["continue"].addEventListener("click", () => {
			this.continueHandler();
		});
		this.muteElement.addEventListener("click", () => {
			this.soundToggle();
		});
		this.startButtons["top-10"].addEventListener("click", () => {
			this.topHandler();
		})
	}
}