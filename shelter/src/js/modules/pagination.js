import petsJson from '../../assets/pets/pets.json'
import {pets} from './images'
import Popup from './popup'
import onPress from './onPress'

export default class Pagination{
	constructor(){
		this.petsJson = petsJson;
		this.wrapper = document.querySelector('.friends__looking-for-house__wrapper');
		this.block = document.querySelector('.friends__looking-for-house');
		this.next = document.getElementById('next');
		this.last = document.getElementById('last');
		this.current = document.getElementById('current');
		this.prev = document.getElementById('prev');
		this.first = document.getElementById('first');
		this.nav = document.querySelector('.friends__slider-nav');
	}

	createDom(){
		this.wrapper.innerHTML = 
			`
				${
					this.currArray.map(block => {
						return (
							`
								<div class="friends__looking-for-house">
									${
										block.map((elem, i) => {
												return(
													`
														<div class="friends__looking-for-house__pets" id=${elem.name.toLowerCase()}>
															<img src=${pets[elem.name.toLowerCase()]} alt="">
															<p>${elem.name}</p>
															<button class="btn friends__looking-for-house__btn">Learn more</button>
														</div>
													`
												)
											}).join('')
									}
								</div>
							`
						)
					}).join('')
				}
			`
	}


	createCurrMassive(){
		this.allPets = [];
		for(let j = 0; j < 6; j++){
			this.allPets = this.allPets.concat(this.petsJson);
		}
		this.currArray = [];
		this.lastPage = 48/this.length;
		for (let i = 0; i < this.lastPage; i++){
			let iArr = this.allPets.splice(0, this.length);
			let currSet = new Set();
			for(let currRandElem; currSet.size < this.length;){
				currRandElem = iArr[Math.floor(Math.random()*Math.floor(iArr.length))];
				currSet.add(currRandElem);
			}
			this.currArray.push([...currSet]);
		}
	}

	calcLength(){
		this.length = document.body.clientWidth >= 1280 ? 8 : document.body.clientWidth < 1280 && document.body.clientWidth >= 768 ? 6 : 3
	}

	hideAll(){
		[...this.wrapper.children].forEach(elem => {
			elem.style.display = 'none';
		})
	}

	showNext(){
		this.hideAll();
		this.page += 1;
	}

	showPrev(){
		this.hideAll();
		this.page -= 1;
	}

	showLast(){
		this.hideAll();
		this.page = this.lastPage;
	}

	showFirst(){
		this.hideAll();
		this.page = 1;
	}

	commonNav(){
		if(this.page === 1) {
			[this.prev, this.first].forEach(btn => {
				btn.setAttribute('disabled', 'disabled')
				btn.classList.add('friends__slider-btn-disabled');
			})
		} else {
			[this.prev, this.first].forEach(btn => {
				btn.classList.remove('friends__slider-btn-disabled');
				btn.removeAttribute('disabled');
			})
		}
		if(this.page === this.lastPage){
			[this.next, this.last].forEach(btn => {
				btn.setAttribute('disabled', 'disabled')
				btn.classList.add('friends__slider-btn-disabled');
			})
		} else {
			[this.next, this.last].forEach(btn => {
				btn.classList.remove('friends__slider-btn-disabled');
				btn.removeAttribute('disabled');
			})
		}
		this.wrapper.children[this.page-1].style.display = '';
		this.current.innerText = this.page
	}

	bindTriggers(){
		this.next.addEventListener('click', () => {
			this.showNext();
		});
		this.prev.addEventListener('click', () => {
			this.showPrev();
		})
		this.first.addEventListener('click', () => {
			this.showFirst();
		})
		this.last.addEventListener('click', () => {
			this.showLast();
		})
		this.nav.addEventListener('click', () => {
			this.commonNav();
		});
	}
	

	init(){
		this.calcLength();
		this.createCurrMassive();
		this.createDom();
		this.hideAll();
		this.showFirst();
		this.commonNav();
		new Popup('.popup').init();
		// new onPress().bind();
		
	}

	render(){
		this.init();
		this.bindTriggers();
		this.clientWidth = document.body.clientWidth;
		window.addEventListener('resize', () => {
			if (this.clientWidth >= 1280 && document.body.clientWidth < 1280 && document.body.clientWidth >= 768) {
				this.clientWidth =  document.body.clientWidth;
				this.init();
			}
			if (this.clientWidth < 1280 && this.clientWidth >= 768 && (document.body.clientWidth < 768 || document.body.clientWidth >= 1280)) {
				this.clientWidth =  document.body.clientWidth;
				this.init();
			}
			if (this.clientWidth < 768 && document.body.clientWidth >= 768){
				this.clientWidth =  document.body.clientWidth;
				this.init();
			}
		})
	}

}