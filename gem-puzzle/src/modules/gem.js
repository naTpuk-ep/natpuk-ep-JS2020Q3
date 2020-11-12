
import {randomImage} from "./randomImage";
import Cell from "./Cell";

export default class Gem {
	constructor(layout, dim = 4, save = {imgSrc: randomImage(), cellsIndexes: [], movements: 0, timer: { min: 0, sec: 0 }}){
		this.layout = layout;
		this.dim = dim;
		this.imgSrc = save.imgSrc;
		this.size = 300;
		this.main = document.querySelector("main");
		this.wrapper = this.createWrapper();
		this.main.appendChild(this.wrapper);
		this.cells = [];
		this.cellsIndexes = save.cellsIndexes;
		this.movements = save.movements;
		this.timer = save.timer;
		this.setTimer();
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
		for(let key in this.save) {
			localStorage.setItem(key, this.save[key]);
		}
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
		this.cells[j].setPosition(j);
		if (this.isAssambled()) {
			console.log("good");
		}
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
		localStorage.clear();
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
		}
		this.layout.movementsElement.textContent = this.movements;
		console.log(this.cells);
	}
}
