import petsInfo from '../../assets/pets/pets.json'
import {pets} from './images';

export default class Slider {
	constructor(){
		this.rightBtn = document.getElementById('slider-btn-right');
		this.leftBtn = document.getElementById('slider-btn-left');
		this.petElems = document.querySelectorAll('.friends__looking-for-house__pets');
		this.pets = petsInfo;
		this.petImgs = pets;
		this.active = true;
	}

	getRandomPets(){
		this.currentPets = Array.from(this.petElems).filter(elem => window.getComputedStyle(elem).display !== 'none');
		this.elsePets = this.pets.filter(pet => !this.currentPets.map(elem => elem.id).includes(pet.name.toLowerCase()));
		this.randomPets = new Set();
		for (; this.randomPets.size < this.currentPets.length; ){
			this.randomPets.add(this.elsePets[Math.floor(Math.random()*Math.floor(this.elsePets.length))]);
		}
		this.randomPets = Array.from(this.randomPets);
	}

	show(){
		this.currentPets.forEach((elem, i) => {
			elem.style.opacity = 0;
			elem.addEventListener('transitionend', () => {
				elem.id = this.randomPets[i].name.toLowerCase();
				elem.querySelector('img').src = this.petImgs[this.randomPets[i].name.toLowerCase()]
				elem.querySelector('p').innerText = elem.id;
				elem.style.opacity = 1;
				this.active = true;
			})
		})
	}

	bind(){
		[this.rightBtn, this.leftBtn].forEach(btn => {
			btn.addEventListener('click', () => {
				if (this.active){
					this.active = false;
					this.getRandomPets()
					this.show();
				}
			})
		})
	}

	init(){
		this.bind();
	}

	render(){
		this.init();
	}
}