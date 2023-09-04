// MOBILE MENU

// Get mobile menu element and navbar
const menuMobileBtn = document.querySelector('.menu-mobile');
const navMenu = document.querySelector('.nav-primary');

// Add an eventListener to the menu
menuMobileBtn.addEventListener('click', e => {
	mobileMenuToggleOpen(e);
	toggleAriaLabel();
});

// Add an EventListener to each LI element of the navbar
const nodeList = navMenu.childNodes[1].childNodes;

for (let i = 0; i < nodeList.length; i++) {
	if (nodeList[i].nodeName === 'LI') {
		nodeList[i].addEventListener('click', e => mobileMenuClose(e));
	}
}

// Function to close menu
function mobileMenuClose(e) {
	e.preventDefault();
	// Toggle open/close classes
	menuMobileBtn.classList.remove('open');
	navMenu.classList.remove('open');
	// Block mouse scroll on menu open.
	document.body.classList.remove('stop-scrolling');
	toggleAriaLabel();
}

// Function to toggle menu open
function mobileMenuToggleOpen(e) {
	e.preventDefault();
	// Toggle open/close classes
	menuMobileBtn.classList.toggle('open');
	navMenu.classList.toggle('open');
	// Block mouse scroll on menu open.
	document.body.classList.toggle('stop-scrolling');
}

// Function to toggle menuBtn aria-label
function toggleAriaLabel() {
	// Check if the menu is open and set the aria-label accordingly
	if (menuMobileBtn.classList.contains('open')) {
		menuMobileBtn.setAttribute('aria-label', 'Close menu');
	} else {
		menuMobileBtn.setAttribute('aria-label', 'Open menu');
	}
}

// Close Mobile menu if its open when window width is > than 920px and hide menuMobileBtn
window.addEventListener('resize', () => {
	if (window.innerWidth >= 910 && menuMobileBtn.classList.contains('open')) {
		menuMobileBtn.classList.remove('open');
		navMenu.classList.remove('open');
		document.body.classList.remove('stop-scrolling');
		toggleAriaLabel();
	} else if (window.innerWidth >= 910) {
		menuMobileBtn.classList.add('hidden');
	} else if (window.innerWidth < 910) {
		menuMobileBtn.classList.remove('hidden');
	}
});

// SMOOTH SCROLL TO ELEMENT
// Get links with href="#home"
const goToHomeLinks = document.querySelectorAll('a[href="#home"]');

// Add an event listener to each link
for (let i = 0; i < goToHomeLinks.length; i++) {
	goToHomeLinks[i].addEventListener('click', e => smoothScroll('#home', 500));
}

// Smooth scroll function
function smoothScroll(target, duration) {
	const targetElement = document.querySelector(target);
	const targetPosition = targetElement.getBoundingClientRect().top;
	const startPosition = window.pageYOffset;
	const startTime = performance.now();

	function scrollAnimation(currentTime) {
		const elapsedTime = currentTime - startTime;
		const progress = Math.min(elapsedTime / duration, 1);
		const ease = easeOutQuad(progress);
		window.scrollTo(0, startPosition + targetPosition * ease);

		if (elapsedTime < duration) {
			requestAnimationFrame(scrollAnimation);
		}
	}

	function easeOutQuad(t) {
		return t * (2 - t);
	}

	requestAnimationFrame(scrollAnimation);
}
