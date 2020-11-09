
export default class Cell  {
	constructor(puzzle, index) {
		this.puzzle = puzzle;
		this.index = index;
		this.size = this.puzzle.size / this.puzzle.dim;
		this.cell = this.createDiv();
		puzzle.wrapper.appendChild(this.cell);
	}

	createDiv() {
		const div = document.createElement('div');
		const left = this.size * (this.index % this.puzzle.dim);
		const top = this.size * Math.floor(this.index / this.puzzle.dim);

		div.classList.add("cell");
		
		div.style.backgroundImage = `url(${this.puzzle.imgSrc})`;
		div.style.backgroundSize = `${this.puzzle.size}px`;
		div.style.border = "1px solid #fff"
		div.style.width = `${this.size}px`;
		div.style.height = `${this.size}px`;

		div.style.backgroundPosition = `-${left}px -${top}px`;

		return div;
	}

	getPosition(index) {
		return {
			left : this.size * (index % this.puzzle.dim),
			top : this.size * Math.floor(index / this.puzzle.dim),

		}
	}

	setPosition(index) {
		const {left, top} = this.getPosition(index);

		this.cell.style.left = `${left}px`;
		this.cell.style.top = `${top}px`;
	}


}