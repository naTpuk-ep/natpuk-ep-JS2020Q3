import petsInfo from '../../assets/pets/pets.json'

export default class Popup {
	constructor(popupSelector, display = 'flex'){
		this.popup = document.querySelector(popupSelector);
		this.triggers = document.querySelectorAll('.friends__looking-for-house__pets');
		this.closeTrigger = this.popup.querySelector('.btn');
		this.display = display;
		this.filter = document.querySelector('.popup-filter');
		this.popupImg = this.popup.querySelector('.popup__img img');
		this.popupName = this.popup.querySelector('.popup__name');
		this.typeBreed = this.popup.querySelector('.popup__type-breed');
		this.description = this.popup.querySelector('p');
		this.age = this.popup.querySelector('#age span');
		this.inoculations = this.popup.querySelector('#inoculations span');
		this.diseases = this.popup.querySelector('#diseases span');
		this.parasites = this.popup.querySelector('#parasites span');
	}

	culcScroll(){
		let div = document.createElement('div');
		div.style.width = '50px';
		div.style.height = '50px';
		div.style.overflowY = 'scroll';
		div.style.visibility = 'hidden';
		document.body.appendChild(div);
		let scrollWidth = div.offsetWidth - div.clientWidth;  // вычисление длины скрола (полная ширина экрана - ширина без скролла)
		div.remove();
		return scrollWidth;
	}

	createPopup(){
		this.popupImg.src = this.img;
		this.pet = petsInfo.find(pet => this.name == pet.name.toLowerCase());
		this.popupName.innerHTML = this.pet.name;
		this.typeBreed.innerHTML = `${this.pet.type} - ${this.pet.breed}`
		this.description.innerHTML = this.pet.description;
		this.age.innerHTML = `<b>Age: </b>${this.pet.age}`;
		this.inoculations.innerHTML = `<b>Inoculations: </b>${this.pet.inoculations.join(', ')}`;
		this.diseases.innerHTML = `<b>Diseases: </b>${this.pet.diseases.join(', ')}`;
		this.parasites.innerHTML = `<b>Parasites: </b>${this.pet.parasites.join(', ')}`;
	}

	show(){
		document.body.style.overflow = 'hidden';
		this.filter.style.display = 'block';
		this.popup.style.display = this.display;
		setTimeout(() => {
			this.filter.style.opacity = 0.6;
			this.popup.style.opacity = 1;
		});
		document.body.style.marginRight = `${this.culcScroll()}px`;
	}

	hide(){
		document.body.style.marginRight = 0;
		document.body.style.overflow = '';
		this.popup.style.display = 'none';
		this.popup.style.opacity = 0;
		this.filter.style.display = 'none';
		this.filter.style.opacity = 0;
	}

	bind(){
		const closeItems = [this.closeTrigger, this.filter];
		closeItems.forEach(item => {
			item.addEventListener('click', () => {
				this.hide();
			});
		})
		this.triggers.forEach(trigger => {
			trigger.addEventListener('click', () => {
				this.img = trigger.querySelector('img').src;
				this.name = trigger.id;
				this.createPopup();
				this.show();
			});
		})
	}

	init(){
		this.bind();
	}
}