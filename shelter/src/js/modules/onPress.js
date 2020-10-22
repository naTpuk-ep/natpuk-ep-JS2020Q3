export default class onPress{
	constructor(){
		this.btns = document.querySelectorAll('.btn');
		this.pets = document.querySelectorAll('.friends__looking-for-house__pets');
	}

	bind(){
		this.btns.forEach(btn => {
			btn.addEventListener('touchstart', () => {
				if (btn.id){
					btn.style.cssText = `
						background: #FDDCC4;
						border-color: #FDDCC4;
						transform: scale(1.2);
					`
				} else {
					btn.classList.add('btn-onpress');
				}
			})
		})

		this.btns.forEach(btn => {
			btn.addEventListener('touchend', () => {
				if (btn.id){
					btn.style.cssText = `
						background: none;
						border-color: #F1CDB3;
						transform: scale(1);
						`
				} else {
					btn.classList.remove('btn-onpress');
				}
			})
		})

		this.pets.forEach(pet => {
			pet.addEventListener('touchstart', () => {
				pet.classList.add('friends__looking-for-house__pets-onpress')
			})

			pet.addEventListener('touchend', () => {
				pet.classList.remove('friends__looking-for-house__pets-onpress');
			})
		})

	}
}

// btn.style.cssText = `
// background: none;
// border-color: #F1CDB3;
// transform: scale(1);
// `
// btn.style.cssText = `
// background: #FDDCC4;
// border-color: #FDDCC4;
// transform: scale(1.05);
// `