
import {randomImage} from "./randomImage";
import Cell from "./Cell";

export default class Gem {
	constructor(layout, dim = 4, save = {imgSrc: randomImage(), cellsIndexes: [], movements: 0, timer: { min: 0, sec: 0 }}){
		this.layout = layout;
		this.dim = dim;
		this.imgSrc = save.imgSrc;
		this.mainWrapper = this.layout.mainWrapper;
		this.wrapper = this.createWrapper();
		this.mainWrapper.prepend(this.wrapper);
		this.size = this.getSize();
		this.cells = [];
		this.cellsIndexes = save.cellsIndexes;
		this.movements = save.movements;
		this.timer = save.timer;
		this.setTimer();
		this.winElement = this.createWinElement();
		this.mainWrapper.classList.add("no-shadow");
		this.layout.ViewImgButton.innerHTML = this.layout.createIconHTML("image");	
	}

	createWinElement() {
		const winElem = document.createElement("div");
		winElem.classList.add("win");
		const nameInput = document.createElement("input");
		nameInput.type = "text";
		["input", "keydown"].forEach(event => {
			nameInput.addEventListener(event, (e) => {
				this.topReset(e);
			})
		});
		this.nameInput = nameInput;
		this.mainWrapper.appendChild(winElem);
		winElem.style.display = "none";
		return winElem;
	}

	topReset(e) {
		if (e.type === "input") {
			this.currentScore = {
				name: e.target.value,
				time: this.timer,
				moves: this.movements,
				size: this.dim,
			};
		}
		if (e.type === "keydown" && e.key === "Enter") {
			const score = localStorage.getItem("score") ? JSON.parse(localStorage.getItem("score")) : [];
			score.push(this.currentScore);
			this.sortScore(score);
			localStorage.setItem("score", JSON.stringify(score));
			this.winElement.style.display = "none";
			this.layout.topHandler.call(this.layout);
		}
	}

	sortScore(score) {
		score.sort((a, b) => {
			const res = c => c.size * (1 / (c.moves * (c.time.sec + c.time.min * 60)));
			return res(b) - res(a);
		})
	}
	
	win() {
		this.mainWrapper.classList.remove("no-shadow");
		this.layout.head.style.opacity = 0;
		this.layout.foot.style.opacity = 0;
		this.layout.stopGame();
		this.wrapper.remove();
		this.winElement.innerHTML = `<p>GOOD JOB!</p><p>Time: ${this.layout.addZero(this.timer.min)}:${this.layout.addZero(this.timer.sec)}</p><p>Moves: ${this.movements}</p><p>Enter your name:</p>`;
		this.winElement.appendChild(this.nameInput);
		this.winElement.style.display = "";
		this.nameInput.focus();
		localStorage.removeItem("save");
	}

	getSize() {
		const wrapperSize = window.getComputedStyle(this.wrapper).width;
		return parseFloat(wrapperSize);
	}

	saveGame() {
		this.save = {
			dim: this.dim,
			cellsIndexes: this.cells.map(cell => cell.index),
			movements: this.movements,
			min: this.timer.min,
			sec: this.timer.sec,
			imgSrc: this.imgSrc,
		};
		localStorage.setItem("save", JSON.stringify(this.save));
	}

	setTimer() {
		this.saveGame();
		this.timerId = setTimeout(() => {
			this.timer.sec ++;
			if (this.timer.sec === 60) {
				this.timer.min ++;
				this.timer.sec = 0;
			}
			clearTimeout(this.timerId)
			this.setTimer();
		}, 1000);
	}

	createWrapper() {
		const div = document.createElement("div");
		div.classList.add("gem-wrapper");
		return div;
	}

	shuffle() {
    for (let i = this.cells.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			this.swap(i, j);
		}
	}

	swap(i, j) {
		[this.cells[i], this.cells[j]] = [this.cells[j], this.cells[i]];
		this.cells[i].setPosition(i);
		this.cells[i].positionOuter(i);
		this.cells[j].setPosition(j);
		this.cells[j].positionOuter(j);
		setTimeout(() => {
			if (this.isAssambled()) {
				this.win();
			}
		})
	}

	isAssambled() {
		return this.cells.every((cell, i) => i === cell.index);
	}

	findPosition(index) {
		return this.cells.findIndex(cell => cell.index === index);
	}

	findEmpty() {
		return this.cells.findIndex(cell => cell.isEmpty);
	}

	bindDrop(cell) {
		if (cell.isEmpty) {
			cell.div.ondragover = (e) => e.preventDefault();
			cell.div.ondrop = () => {
				this.drop = true;
			};
		}
	}

	setupNew() {
		localStorage.removeItem("save");
		for (let i = 0; i < this.dim**2; i++) {
			this.cells.push(new Cell(this, i));
			this.bindDrop(this.cells[i]);
		}
		this.shuffle();
	}

	setupContinue() {
		for (let i = 0; i < this.dim**2; i++) {
			this.cells.push(new Cell(this, this.cellsIndexes[i]));
			this.bindDrop(this.cells[i]);
		}
		for (let i = 0; i < this.cells.length; i++) {
			this.cells[i].setPosition(i);
			this.cells[i].positionOuter(i);
		}
		this.layout.movementsElement.textContent = this.movements;
	}
}
