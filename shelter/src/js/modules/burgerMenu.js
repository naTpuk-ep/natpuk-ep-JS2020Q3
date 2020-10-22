export default class BurgerMenu {
	constructor (popupSelector, triggerSelector, display = 'flex') {
		this.menu = document.querySelector(popupSelector);
		this.trigger = document.querySelector(triggerSelector);
		this.burgerLines = this.trigger.querySelectorAll('line');
		this.stroke = this.trigger.querySelector('line').getAttribute('stroke');
		this.display = display;
		this.filter = document.querySelector('.filter');
		this.logos = document.querySelectorAll('.logo');
		this.body = document.querySelector('body');
		this.header = document.querySelector('header');
		this.isShow = false;
		this.dur = '0.2s';
		this.active = true;

	}

	burgerRotate(){
		this.trigger.style.transitionDelay = this.isShow ? this.dur : '0s';
		this.trigger.style.transform = this.isShow ? 'rotate(0deg)' : 'rotate(-90deg)';
	}

	burgerLinesToggle(){
		let delay = this.isShow ? parseFloat(this.dur) : 0;
		setTimeout(() => {
			this.burgerLines.forEach(line => {
				line.setAttribute('stroke', delay == 0 ? '#F1CDB3' : this.stroke );
			});
		}, delay*1000*2)
	}

	logoToggle(){
		if (this.isShow){
			this.logos[0].style.cssText = `transition-duration: ${this.dur}; transition-delay: ${this.dur};	opacity: 1; transform: scale(1);`;
			this.logos[1].style.cssText = `transition-duration: ${this.dur}; transition-delay: 0s; transform: scale(0); opacity: 0;`;
		}else{
			this.logos[0].style.cssText = `transition-duration: ${this.dur}; transition-delay: 0s; transform: scale(0); opacity: 0;`;
			this.logos[1].style.cssText = `transition-duration: ${this.dur}; transition-delay: ${this.dur}; opacity: 1; transform: scale(1);`;
		}
	}

	show(){
		this.active = false
		this.menu.addEventListener('transitionend', ()=> {
			this.menu.style.transitionDelay = '0.2s';
			this.isShow = !this.isShow;
			this.active = true;
		}, {once:true});
		this.burgerRotate();
		this.burgerLinesToggle();
		this.logoToggle();
		this.body.style.overflow = 'hidden';
		this.header.style.background = 'transparent'
		this.filter.style.display = 'block';
		setTimeout(() => {
			this.filter.style.background = 'black';
			this.filter.style.opacity = 0.6;
			this.menu.style.right = 0;
		});
	}

	hide(){
		this.active = false
		this.menu.addEventListener('transitionend', () =>{
			this.filter.style.display = 'none';
			this.filter.style.background = 'none'
			this.header.style.background = ''
			this.body.style.overflow = '';
			this.menu.style.transitionDelay = '0s';
			this.isShow = !this.isShow;
			this.active = true;
		}, {once: true});
		this.menu.style.right = '-320px';
		this.filter.style.opacity = 0;
		this.burgerLinesToggle();
		this.logoToggle();
		this.burgerRotate();
	}

	bindTriggers(){
		this.trigger.addEventListener('click', () => {
			if (this.active){
				if (!this.isShow) this.show();
				else this.hide();
			}
		});
		this.filter.addEventListener('click', () => {
			if(this.active) this.hide();
		})
	}

	init(){
		this.menu.style.cssText = `transition-duration: ${this.dur};`
		this.trigger.style.cssText = `transition-duration: ${this.dur};`
		this.header.style.cssText = `transition-duration: ${this.dur};`
		this.filter.style.cssText = `transition-duration: ${this.dur};`
		this.bindTriggers();
	}
}