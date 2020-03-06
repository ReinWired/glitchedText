{
	// Base code by Isaac Doud (https://codepen.io/cipherbeta/pen/YLdVjw?editors=1100) enhanced by ReinWired

	let styleSheet = document.styleSheets[0];
	let glitchSkewRand = 4; // Value divided by two is the maximum positive & negative skew for base text
	let glitchSkewSteps = 5; // How many steps in animation for base text
	let glitchAnimRand = 100; // Value divided by 100 is the maximum value for skew for ::before & ::after text
	let glitchAnimSteps = 10; // How many steps in animation for ::before & ::after text

	function insertGlitchKeyframes() {
		let glitchBaseClass = `.glitchedText {
			position: relative;
			color: white;
			animation: glitch-skew 1s infinite linear alternate-reverse;
		}`;
		
		let glitchBeforeClass = `.glitchedText::before {
			content: attr(data-text);
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			left: 2px;
			text-shadow: -2px 0 #ff00c1;
			clip: rect(44px, 450px, 56px, 0);
			animation: glitch-anim1 5s infinite linear alternate-reverse;
		}`;
		
		let glitchAfterClass = `.glitchedText::after {
			content: attr(data-text);
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			left: -2px;
			text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
			animation: glitch-anim2 1s infinite linear alternate-reverse;
		}`;

		let glitchSkew = `@keyframes glitch-skew {`;
		for (let i = 0; i <= 100; i += (100 / glitchSkewSteps)) {
			let random = Math.floor(Math.random() * (glitchSkewRand + 1));
			glitchSkew += `${i}% {transform: skew(${random - (glitchSkewRand / 2)}deg);}`;
		}
		glitchSkew += `}`;
		
		let glitchAnim1 = `@keyframes glitch-anim1 {`;
		for (let i = 0; i <= 100; i += (100 / glitchAnimSteps)) {
			let random1 = Math.floor(Math.random() * (glitchAnimRand + 1));
			let random2 = Math.floor(Math.random() * (glitchAnimRand + 1));
			let random3 = Math.floor(Math.random() * (glitchAnimRand + 1));
			glitchAnim1 += `${i}% {clip: rect(${random1}px, 9999px, ${random2}px, 0);transform: skew(${random3 / 100});}`;
		}
		glitchAnim1 += `}`;
		
		let glitchAnim2 = `@keyframes glitch-anim2 {`;
		for (let i = 0; i <= 100; i += (100 / glitchAnimSteps)) {
			let random1 = Math.floor(Math.random() * (glitchAnimRand + 1));
			let random2 = Math.floor(Math.random() * (glitchAnimRand + 1));
			let random3 = Math.floor(Math.random() * (glitchAnimRand + 1));
			glitchAnim2 += `${i}% {clip: rect(${random1}px, 9999px, ${random2}px, 0);transform: skew(${random3 / 100});}`;
		}
		glitchAnim2 += `}`;
		
		styleSheet.insertRule(glitchBaseClass);
		styleSheet.insertRule(glitchBeforeClass);
		styleSheet.insertRule(glitchAfterClass);
		styleSheet.insertRule(glitchSkew);
		styleSheet.insertRule(glitchAnim1);
		styleSheet.insertRule(glitchAnim2);
	}

	function updateGlitchKeyFrames(animationName, randomMax, newEffect) {
		for (let i = 0; i < styleSheet.rules.length ; i++) {
			if (styleSheet.rules[i].name === animationName) {
				for (let j = 0; j < styleSheet.rules[i].cssRules.length; j++) {
					let random = () => Math.floor(Math.random() * (randomMax + 1));
					styleSheet.rules[i].cssRules[j].style.cssText = newEffect.replace(/random/g, random);
				}
			}
		}
	}

	document.body.addEventListener('load', insertGlitchKeyframes());
	document.querySelector('.glitchedText').addEventListener('animationiteration', e => {
		let randomMax = e.animationName === 'glitch-skew' ? glitchSkewRand : glitchAnimRand;
		let newEffect = e.animationName === 'glitch-skew' ? 'transform: skew(calc(randomdeg - 2.5deg));' : 'clip: rect(randompx, 9999px, randompx, 0);transform: skew(calc(random / 100));';
		updateGlitchKeyFrames(e.animationName, randomMax, newEffect);
	});
}