export default class Popup {
	constructor (popupSelector, triggerSelector, dir, display = 'block') {
		this.popup = document.querySelector(popupSelector);
		this.trigger = document.querySelector(triggerSelector);
		this.burgerLines = this.trigger.querySelectorAll('line');
		this.stroke = this.trigger.querySelector('line').getAttribute('stroke');
		this.dir = dir;
		this.display = display;
		this.size = window.getComputedStyle(this.popup)[`${this.dir}`];
		this.filter = document.querySelector('.filter');
		this.logos = document.querySelectorAll('.logo');
		this.body = document.querySelector('body');
		this.header = document.querySelector('header');
		this.isShow = false;
		this.dur = '0.4s';
	}

	// isShow(){
	// 	return window.getComputedStyle(this.popup).display ==='none' ? false : true;
	// }

	burgerRotate(){
		this.trigger.style.transform = this.isShow ? 'rotate(0deg)' : 'rotate(-90deg)';
	}

	burgerLinesToggle(){
		this.burgerLines.forEach(line => {
			line.setAttribute('stroke', this.isShow ? this.stroke : '#F1CDB3');
		})
	}

	logoToggle(){
		if (this.isShow){
			this.logos[0].style.cssText = `transition: all ${this.dur} cubic-bezier(0.71, 0.78, 0.49, 1.46) ${this.dur}; transform: scale(1); opacity: 1;`;
			this.logos[1].style.cssText = `transition: all cubic-bezier(0.48,-0.46, 0.41, 0.4) ${this.dur}; transform: scale(0); opacity: 0;`;
		}else{
			this.logos[0].style.cssText = `transition: all cubic-bezier(0.48,-0.46, 0.41, 0.4) ${this.dur}; transform: scale(0); opacity: 0;`;
			this.logos[1].style.cssText = `transition: all ${this.dur} cubic-bezier(0.71, 0.78, 0.49, 1.46) ${this.dur}; transform: scale(1); opacity: 1`;
		}

		// this.logos[0].style.transform = this.isShow ? 'scale(1)' : 'scale(0)';
		// this.logos[1].style.transform = this.isShow ? 'scale(0)' : 'scale(1)';

	}

	show(){
		this.popup.addEventListener('transitionend', ()=> {
			this.popup.style.transitionDelay = this.dur;
			this.isShow = !this.isShow;
		}, {once:true});
		this.burgerLinesToggle();
		this.burgerRotate();
		this.body.style.overflow = 'hidden';
		this.header.style.background = 'transparent'
		this.filter.style.display = 'block';
		this.popup.style.display = this.display;
		setTimeout(() => {
			this.filter.style.background = 'black';
			this.filter.style.opacity = 0.6;
			this.popup.style[`${this.dir}`] = 0;
			this.logoToggle();
		});
	}

	hide(){
		this.popup.addEventListener('transitionstart', () => {
			console.log('start');
		}, {once:true});
		this.popup.addEventListener('transitionend', () =>{
			this.burgerRotate();
			this.burgerLinesToggle();
			this.filter.style.display = 'none';
			this.filter.style.background = 'none'
			this.header.style.background = ''
			this.body.style.overflow = '';
			this.popup.style.transitionDelay = '0s';
			this.isShow = !this.isShow;
			console.log('end');
		}, {once: true});
		this.popup.style[`${this.dir}`] = this.size;
		this.filter.style.opacity = 0;
		this.logoToggle();
	}

	bindTriggers(){
		this.trigger.addEventListener('click', () => {
			if (!this.isShow) this.show();
			else this.hide();
		});
	}

	init(){
		this.trigger.style.display = 'block';
		this.bindTriggers();
	}
}