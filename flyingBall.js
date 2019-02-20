//import {anime} from 'lib/anime.es.js' //for some reason, this doesn't work
//const ball = document.getElementById("flyingBall");

anime({
	targets: '#flyingBall',
	translateX: [{value: 540, duration: 500, delay: 0},{value: 1080, duration: 500, delay: 0},{value: 540, duration: 500, delay: 0},{value: 0, duration: 500, delay: 0},{value: 0, duration: 500, delay: 0}],
	translateY: [{value: 0, duration: 500, delay: 0},{value: 540, duration: 500, delay: 0},{value: 270, duration: 500, delay: 0},{value: 270, duration: 500, delay: 0},{value: 0, duration: 500, delay: 0}],
	duration: 1500,
	//easing: 'easeOutElastic(1, .8)',
	easing: 'linear',
	loop: true
});

anime({
	targets: '#flyingBall2',
	translateX: [{value: 540, duration: 500, delay: 0},{value: 0, duration: 500, delay: 0},{value: 540, duration: 500, delay: 0},{value: 1080, duration: 500, delay: 0},{value: 0, duration: 500, delay: 0}],
	translateY: [{value: 0, duration: 500, delay: 0},{value: 540, duration: 500, delay: 0},{value: 270, duration: 500, delay: 0},{value: 270, duration: 500, delay: 0},{value: 0, duration: 500, delay: 0}],
	duration: 1500,
	//easing: 'easeOutElastic(1, .8)',
	easing: 'linear',
	loop: true
});