// Intersection Observer para animaciones reveal
const io = new IntersectionObserver((entries)=>{
	entries.forEach(e=>{
		if(e.isIntersecting){
			e.target.classList.add('show');
			e.target.querySelectorAll('[data-counter]').forEach(startCounter);
			io.unobserve(e.target);
		}
	});
},{ threshold: .12, rootMargin: "0px 0px -10% 0px" });

document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Contadores animados
function startCounter(el){
	const target = parseFloat(el.getAttribute('data-counter') || '0');
	const dur = 1200;
	const start = performance.now();
	function step(t){
		const p = Math.min(1, (t - start) / dur);
		const val = Math.floor(target * (0.2 + 0.8 * easeOutCubic(p)));
		el.textContent = val.toString();
		if(p < 1) requestAnimationFrame(step);
	}
	requestAnimationFrame(step);
}
function easeOutCubic(x){ return 1 - Math.pow(1 - x, 3); }

// Parallax sutil en tarjetas
const cards = document.querySelectorAll('.card');
document.addEventListener('mousemove', (e)=>{
	const cx = window.innerWidth/2, cy = window.innerHeight/2;
	const dx = (e.clientX - cx) / cx, dy = (e.clientY - cy) / cy;
	cards.forEach(c=>{
		c.style.setProperty('transform', `rotateX(${dy*-2}deg) rotateY(${dx*2}deg) translateY(-2px)`);
	});
});
document.addEventListener('mouseleave', ()=>{
	cards.forEach(c=> c.style.removeProperty('transform'));
});