const el = document.querySelector('.glitch-suffix');
const real = el.dataset.real;   // "ING"
const fake = el.dataset.fake;   // "BLING"

function runGlitch() {
  // 1. Start glitch effect
  el.setAttribute('data-current', fake);
  el.textContent = fake;
  el.classList.add('is-glitching');

  // 2. Hold on "BLING" for 2.5 seconds
  setTimeout(() => {
    // 3. Revert
    el.setAttribute('data-current', real);
    el.textContent = real;
    el.classList.remove('is-glitching');
  }, 2500);
}

// Fire immediately, then every 7 seconds
runGlitch();
setInterval(runGlitch, 7000);