
import {randomImage} from "./randomImage";
import Cell from "./Cell";

export default class Gem {
	constructor(dimension){
		this.dim = dimension;
		this.imgSrc = randomImage();
		this.size = 300;
		this.main = document.querySelector("main");
		this.wrapper = this.createWrapper();
		this.main.appendChild(this.wrapper);
		this.cells = [];
		this.movements = 0;
		this.setup();
		this.timer = { min: 0, sec: 0 };
		this.setTimer();
	}

	setTimer() {
		console.log(this.timer);
		setTimeout(() => {
			this.timer.sec ++;
			if (this.timer.sec === 60) {
				this.timer.min ++;
				this.timer.sec = 0;
			}
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
			console.log("div");
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

	setup() {
		for (let i = 0; i < this.dim**2; i++) {
			this.cells.push(new Cell(this, i));
			this.bindDrop(this.cells[i]);
		}
		this.shuffle();
	}

	init() {

	}
}
