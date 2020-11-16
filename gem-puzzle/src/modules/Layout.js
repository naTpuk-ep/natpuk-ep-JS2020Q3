import Gem from "./Gem";

export default class Layout {
	constructor() {
		// localStorage.clear();
		this.body = document.querySelector('body');
		this.main = this.createMain();
		this.mainWrapper = this.createMainWrapper();
		this.startMenu = this.createStartMenu();
		this.startButtons = this.createButtons(["NEW GAME", "CONTINUE", "TOP 10"]);
		this.sizeButtons = this.createButtons(["3x3", "4x4", "5x5", "6x6", "7x7", "8x8"]);
		this.showBtns(this.startButtons);
		this.timerElement = this.createTimerElement();
		this.movementsElement = this.createMovementsElement();
		this.exit = this.createExit();
		this.head = this.createHead();
		this.foot = this.createFootElement();
		this.muteElement = this.createMuteElement();
		this.viewImgElement = this.createviewImgElement();
		this.ViewImgButton = this.createViewImgButton();
		this.tableData = [];
		this.topTableElement = this.createtopTableElement();
		this.bindTriggers();
	}

	//------------------layouts-------------------

	createViewImgButton() {
		const btn = document.createElement("button");
		btn.classList.add("viewImg");
		btn.innerHTML = this.createIconHTML("image");
		this.foot.appendChild(btn);
		return btn;
	}

	createviewImgElement() {
		const img = document.createElement("img");
		img.classList.add("view");
		img.style.display = "none";
		this.mainWrapper.appendChild(img);
		return img;
	}
	
	createMuteElement() {
		const audio = document.createElement("audio");
		audio.src = "./assets/sound.mp3";
		this.audio = audio;
		this.body.appendChild(audio);
		const muteElem = document.createElement("button");
		muteElem.innerHTML = this.createIconHTML("volume_up");
		muteElem.classList.add("mute");
		this.foot.appendChild(muteElem);
		return muteElem;
	}
	
	createFootElement() {
		const foot = document.createElement("div")
		foot.classList.add("foot");
		foot.style.opacity = 0;
		this.main.appendChild(foot);
		return foot;
	}

	createtopTableElement() {
		const tableElem = document.createElement("table");
		const headings = ["NAME", "SIZE" ,"MOVES", "TIME"]
		for (let i = 0; i < 11; i++) {
			const tr = document.createElement("tr");
			this.tableData[i] = [];
			for(let j = 0; j < 4; j++) {
				const td = document.createElement("td");
				const th = document.createElement("th");
				if (i === 0) {
					th.textContent = headings[j];
					tr.appendChild(th);
				} else {
					this.tableData[i].push(td);
					tr.appendChild(td);
				}
			}
			tableElem.appendChild(tr);
		}
		this.tableData.shift();
		tableElem.style.display = "none";
		this.startMenu.appendChild(tableElem);
		return tableElem;
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
		return buttons;
	}
	
	createTimerElement() {
		this.timerElement = document.createElement("time");
		return this.timerElement;
	}

	createHead() {
		const head = document.createElement("div");
		head.classList.add("head");
		head.appendChild(this.timerElement);
		head.appendChild(this.movementsElement);
		head.appendChild(this.exit);
		head.style.opacity = 0;
		this.main.prepend(head);
		return head;
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
	
	createMainWrapper() {
		const wrapper = document.createElement("div");
		wrapper.classList.add("main-wrapper");
		this.main.prepend(wrapper);
		return wrapper;
	}

	createStartMenu() {
		const startMenu = document.createElement('div');
		startMenu.classList.add('start-menu');
		this.mainWrapper.appendChild(startMenu);
		return startMenu;
	}
	
	addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
	}

	createIconHTML(icon_name) {
		return `<i class="material-icons">${icon_name}</i>`;
	}

	// ---------------- Handlers --------------------
	
	viewImgHandler() {
		if (window.getComputedStyle(this.viewImgElement).display === "none") {
			try {
				this.puzzle.wrapper.style.display = "none";
			} catch(e) {};
			this.viewImgElement.style.display = "";
			this.ViewImgButton.innerHTML = this.createIconHTML("grid_on");
		} else {
			this.puzzle.wrapper.style.display = "";
			this.viewImgElement.style.display = "none";
			this.ViewImgButton.innerHTML = this.createIconHTML("image");			
		}
	}

	newGameHandler() {
		this.hideBtns(this.startButtons);
		this.showBtns(this.sizeButtons);
	}

	sizeHandler(size) {
		this.startMenu.style.display = "none";
		this.movementsElement.textContent = "";
		this.puzzle = new Gem(this, +size[0]);
		this.viewImgElement.src = this.puzzle.imgSrc;
		this.puzzle.setupNew();
		this.head.style.opacity = 1;
		this.foot.style.opacity = 1;
		this.showtime();
	}
	
	continueHandler() {
		this.startMenu.style.display = "none";
		const save = JSON.parse(localStorage.save);
		this.puzzle = new Gem(this, save.dim, {
			imgSrc: save.imgSrc,
			cellsIndexes: save.cellsIndexes,
			movements: save.movements,
			timer: {min: save.min, sec: save.sec}
		});
		this.viewImgElement.src = this.puzzle.imgSrc;
		this.puzzle.setupContinue();
		this.showtime();
		this.head.style.opacity = 1;
		this.foot.style.opacity = 1;
	}

	exitHandler() {
		this.stopGame();
		try {
			this.puzzle.wrapper.remove();
			this.puzzle.winElement.remove();
		} catch(e) {}
		this.head.style.opacity = 0;
		this.foot.style.opacity = 0;
		this.viewImgHandler();
		this.viewImgElement.style.display = "none";
		this.hideBtns(this.sizeButtons);
		this.showBtns(this.startButtons);
		this.startMenu.style.display = "";
		this.hideTableElement();
		this.mainWrapper.classList.remove("no-shadow");
	}
	
	showBtns(btns) {
		for (let key in btns) {
			btns[key].style.display = "";
		}
		try {
			btns["continue"].disabled = localStorage.save ? false : true;
		} catch(e) {}
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
		try {
			clearTimeout(this.puzzle.timerId);
			clearTimeout(this.timerId);
		} catch(e) {}
	}

	soundToggle() {
		if (this.audio.muted) {
			this.muteElement.innerHTML = this.createIconHTML("volume_up");
			this.audio.muted = false;
		} else {
			this.muteElement.innerHTML = this.createIconHTML("volume_off");
			this.audio.muted = true;
		}
	}

	topHandler() {
		this.hideBtns(this.startButtons);
		this.hideBtns(this.sizeButtons);
		this.timerElement.textContent = "";
		this.movementsElement.textContent = "";
		this.head.style.opacity = 1;
		this.foot.style.opacity = 0;
		this.tableData.forEach((score, i , data) => {
			if (localStorage.score && JSON.parse(localStorage.score)[i]) {
				score[0].textContent = JSON.parse(localStorage.score)[i].name;
				score[1].textContent = `${JSON.parse(localStorage.score)[i].size}x${JSON.parse(localStorage.score)[i].size}`;
				score[2].textContent = JSON.parse(localStorage.score)[i].moves;
				score[3].textContent = `${this.addZero(JSON.parse(localStorage.score)[i].time.min)}:${this.addZero(JSON.parse(localStorage.score)[i].time.sec)}`;
			}
		})
		this.showTableElement();
		this.startMenu.style.display = "";
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
		});
		this.ViewImgButton.addEventListener("click", () => {
			this.viewImgHandler();
		})
	}
}