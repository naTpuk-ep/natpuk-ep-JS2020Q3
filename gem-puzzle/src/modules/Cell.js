
export default class Cell  {
	constructor(puzzle, index) {
		this.puzzle = puzzle;
		this.index = index;
		this.size = this.puzzle.size / this.puzzle.dim;
		this.cell = this.createDiv();
		this.moveHandler();
		puzzle.wrapper.appendChild(this.cell);
		this.setImage();
		this.setPosition(this.index);
	}

	moveHandler() {
		this.cell.onclick = () => {

			const currentIndex = this.puzzle.findPosition(this.index);
			const emptyIndex = this.puzzle.findEmpty();

			const {x: currentX, y: currentY} = this.getXY(currentIndex);
			const {x: emptyX, y: emptyY} = this.getXY(emptyIndex);

			if((currentX === emptyX || currentY === emptyY) && 
				(Math.abs(currentX - emptyX) === 1 || Math.abs(currentY - emptyY) === 1)) {
					this.puzzle.swap(currentIndex, emptyIndex);
					this.puzzle.movements ++;
					console.log(this.puzzle.movements);
				} 
		}
	}

	createDiv() {
		const div = document.createElement('div');
		div.classList.add("cell");
		div.style.backgroundSize = `${this.puzzle.size}px`;
		div.style.width = `${this.size}px`;
		div.style.height = `${this.size}px`;



		return div;
	}

	getPosition(index) {
		const {x, y} = this.getXY(index);
		return {
			left : this.size * x,
			top : this.size * y,
		}
	}

	setPosition(index) {
		const {left, top} = this.getPosition(index);
		this.cell.style.left = `${left}px`;
		this.cell.style.top = `${top}px`;
	}

	setImage() {
		if (this.index === this.puzzle.dim ** 2 - 1) {
			this.isEmpty = true;
			return;
		};
		this.cell.style.border = "1px solid #fff"
		const {x, y} = this.getXY(this.index);
		const left = this.size * x;
		const top = this.size * y;
		this.cell.style.backgroundImage = `url(${this.puzzle.imgSrc})`;
		this.cell.style.backgroundPosition = `-${left}px -${top}px`;
	}

	getXY(index) {
		return {
			x: index % this.puzzle.dim,
			y: Math.floor(index / this.puzzle.dim)
		}
	}

}