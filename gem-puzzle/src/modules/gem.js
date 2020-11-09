
import Cell from "./Cell"

export default class GemPuzzle {
	constructor(){
		this.main = document.querySelector('main');
		this.imgSrc = './assets/img/139.jpg';
		this.dim = 4;
		this.size = 500;
		this.wrapper = this.createWrapper();
		this.main.appendChild(this.wrapper);
		this.cells = [];

		this.init();
	}

	createWrapper() {
		const div = document.createElement('div');
		div.classList.add('wrapper');
		return div;
	}

	shuffle() {
    for (let i = this.cells.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.cells[i], this.cells[j]] = [this.cells[j], this.cells[i]];
			this.cells[i].setPosition(i);
			this.cells[j].setPosition(j);
		}
	}

	init() {
		for (let i = 0; i < this.dim**2; i++) {
			this.cells.push(new Cell(this, i));
		}
		this.shuffle();
		console.log(this.cells);
	}
}