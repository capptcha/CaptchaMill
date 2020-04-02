const svgCaptcha = require('svg-captcha');
const fs = require('fs');
const sharp = require('sharp');

(async () => {
	for (let i = 3; i <= 7; i++) {
		let sDir = `svg-${i}`;
		if (!fs.existsSync(sDir)) {
			fs.mkdirSync(sDir);
		}

		let pDir = `png-${i}`;
		if (!fs.existsSync(pDir)) {
			fs.mkdirSync(pDir);
		}

		let size = i;

		for (let j = 1; j <= 100000; j++) {
			let captcha = await svgCaptcha.create(size);
			fs.writeFile(
				`svg-${i}/${j}_${captcha.text}.svg`,
				captcha.data,
				function(err) {
					if (err) {
						// console.log(err);
					} else {
						// console.log('The file was saved!');
					}
				}
			);
			await sharp(`svg-${i}/${j}_${captcha.text}.svg`)
				.png()
				.toFile(`png-${i}/${j}_${captcha.text}.png`)
				.then(function(info) {
					// console.log(info);
				})
				.catch(function(err) {
					// console.log(err);
				});
			// console.log('generated png');
		}
	}
})();
