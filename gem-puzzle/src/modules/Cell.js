
export default class Cell  {
	constructor(puzzle, index) {
		this.puzzle = puzzle;
		this.index = index;
		this.size = this.puzzle.size / this.puzzle.dim;
		this.div = this.createDiv();
		this.bindTriggers();
		puzzle.wrapper.appendChild(this.div);
		this.setImage();
		this.setPosition(this.index);
	}

	bindTriggers() {
		if (this.index === this.puzzle.dim ** 2 - 1) {
		} else {
			this.div.onclick = () => this.swapHandler();
			this.div.ondragstart = () => this.dragStartHandler();
			this.div.ondragend = () => this.dragEndHandler();
		}
	}

	dragStartHandler() {
		setTimeout(() => {
			this.div.style.display = "none";
		})
	}

	dragEndHandler() {
		if (this.puzzle.drop) {
			this.swapHandler();
		}
		this.div.style.display = "";
	}

	swapHandler() {
		if (this.canSwap()) {
				this.puzzle.swap(this.currentIndex, this.emptyIndex);
				this.puzzle.movements ++;
				console.log(this.puzzle.movements);
			} 
	}

	canSwap() {
		this.currentIndex = this.puzzle.findPosition(this.index);
		this.emptyIndex = this.puzzle.findEmpty();

		const {x: currentX, y: currentY} = this.getXY(this.currentIndex);
		const {x: emptyX, y: emptyY} = this.getXY(this.emptyIndex);

		return ((currentX === emptyX || currentY === emptyY) && 
			(Math.abs(currentX - emptyX) === 1 || Math.abs(currentY - emptyY) === 1));
	}

	createDiv() {
		const div = document.createElement("div");
		div.classList.add("cell");
		div.style.backgroundSize = `${this.puzzle.size}px`;
		div.style.width = `${this.size}px`;
		div.style.height = `${this.size}px`;
		div.draggable = "true";
		return div;
	}

	getPosition(index) {
		const {x, y} = this.getXY(index);
		return {
			left : this.size * x,
			top : this.size * y,
		};
	}

	setPosition(index) {
		const {left, top} = this.getPosition(index);
		this.div.style.left = `${left}px`;
		this.div.style.top = `${top}px`;
	}

	setImage() {
		if (this.index === this.puzzle.dim ** 2 - 1) {
			this.isEmpty = true;
			return;
		}
		this.div.style.border = "1px solid #fff";
		this.div.style.cursor = "pointer";
		const {x, y} = this.getXY(this.index);
		const left = this.size * x;
		const top = this.size * y;
		this.div.style.backgroundImage = `url(${this.puzzle.imgSrc})`;
		this.div.style.backgroundPosition = `-${left}px -${top}px`;
	}

	getXY(index) {
		return {
			x: index % this.puzzle.dim,
			y: Math.floor(index / this.puzzle.dim)
		};
	}

}