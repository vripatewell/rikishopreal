        document.addEventListener('DOMContentLoaded', () => {
            const loadingOverlay = document.getElementById('loading-overlay');
            const enterButton = document.getElementById('enter-button');
            const video = document.getElementById('video-bg');
            const mainContent = document.getElementById('main-content');
            
            const tabButtons = document.querySelectorAll('.tab-btn');
            const pageContents = document.querySelectorAll('.page-content');

            function playAnimationForPage(pageId) {
                const targetPage = document.getElementById(pageId);
                if (!targetPage) return;
                const linksToAnimate = targetPage.querySelectorAll('.link-list a');

                linksToAnimate.forEach((link, index) => {
link.classList.remove('start-animation');
link.style.animationDelay = `${index * 100}ms`;
link.classList.add('start-animation');
                });
            }

            function enterWebsite() {
                loadingOverlay.style.opacity = '0';
                setTimeout(() => {
loadingOverlay.style.display = 'none';
                }, 500);

                mainContent.style.opacity = '1';
                
                video.play().catch(error => {
console.error("Video tidak bisa diputar:", error);
                });

                const initialActiveTab = document.querySelector('.tab-btn.active');
                if (initialActiveTab) {
playAnimationForPage(initialActiveTab.getAttribute('data-target'));
                }
            }

            if (sessionStorage.getItem('hasEntered')) {
                enterWebsite();
            } else {
                enterButton.addEventListener('click', () => {
sessionStorage.setItem('hasEntered', 'true');
enterWebsite();
                });
            }

            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
tabButtons.forEach(btn => btn.classList.remove('active'));
pageContents.forEach(page => {
    page.classList.remove('active');
    page.querySelectorAll('.link-list a').forEach(link => {
       link.classList.remove('start-animation');
       link.style.opacity = '0'; 
    });
});

button.classList.add('active');
const targetPageId = button.getAttribute('data-target');
const targetPage = document.getElementById(targetPageId);

if (targetPage) {
    targetPage.classList.add('active');
    playAnimationForPage(targetPageId);
}
                });
            });
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'visible' && sessionStorage.getItem('hasEntered')) {
video.play().catch(error => {
    console.error("Gagal melanjutkan video secara otomatis:", error);
});
                }
            });
        });
        
        const snowCanvas = document.getElementById('snow');
  const snowCtx = snowCanvas.getContext('2d');
  snowCanvas.width = window.innerWidth;
  snowCanvas.height = window.innerHeight;

  const snowflakes = Array.from({ length: 100 }, () => ({
    x: Math.random() * snowCanvas.width,
    y: Math.random() * snowCanvas.height,
    radius: Math.random() * 3 + 1,
    speedY: Math.random() * 1 + 0.5
  }));

  function drawSnowflakes() {
    snowCtx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
    snowCtx.fillStyle = 'white';
    snowCtx.beginPath();
    for (const flake of snowflakes) {
      snowCtx.moveTo(flake.x, flake.y);
      snowCtx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    }
    snowCtx.fill();
    updateSnowflakes();
  }

  function updateSnowflakes() {
    for (const flake of snowflakes) {
      flake.y += flake.speedY;
      if (flake.y > snowCanvas.height) {
        flake.y = 0;
        flake.x = Math.random() * snowCanvas.width;
      }
    }
  }

  function animateSnow() {
    drawSnowflakes();
    requestAnimationFrame(animateSnow);
  }

  animateSnow();

  window.addEventListener('resize', () => {
    snowCanvas.width = window.innerWidth;
    snowCanvas.height = window.innerHeight;
  });
  
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const particles = [];
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25,
    });
  }
  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();