function ImageExist(url) {
	let img = new Image();
	img.src = url;
	return img.height != 0;
}

async function imgImport() {
	for (let i = 1; ImageExist(`../assets/img/box/${i}.jpg`); i++){
		await import(`../assets/img/box/${i}.jpg`)
			.catch(err => {
				console.error('import ERROR: ', err);
			})
	}
}
