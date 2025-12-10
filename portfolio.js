// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursor2 = document.querySelector('.cursor2');

document.addEventListener('mousemove', function(e){
    cursor.style.cssText = cursor2.style.cssText = "left: " + e.clientX + "px; top: " + e.clientY + "px;";
});

const links = document.querySelectorAll('a, .card, .menu-icon, .social-btn');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor2.classList.add('hover');
    });
    link.addEventListener('mouseleave', () => {
        cursor2.classList.remove('hover');
    });
});

// Tilt Effect
document.querySelectorAll('.card').forEach(card => {
    
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none'; 
    });

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s ease'; 
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

const menuIcon = document.querySelector('.menu-icon');
const menu = document.querySelector('.menu');

menuIcon.addEventListener('click', () => {
    menu.classList.toggle('active');
    
    if(menu.classList.contains('active')){
        menuIcon.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        menuIcon.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
        menuIcon.innerHTML = '<i class="fas fa-bars"></i>';
    });
});
// Scroll to Top Logic
const scrollBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        scrollBtn.style.display = "flex";
    } else {
        scrollBtn.style.display = "none";
    }
});

scrollBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
// ScrollReveal Animation
const sr = ScrollReveal({
    distance: '60px',
    duration: 2500,
    delay: 400,
    reset: true // عشان الحركة تتكرر كل ما تطلع وتنزل
});

sr.reveal('.hero-content', {delay: 200, origin: 'top'});
sr.reveal('.section-title', {delay: 200, origin: 'left'});
sr.reveal('.skill-box', {interval: 200, origin: 'bottom'}); 
sr.reveal('.card', {interval: 200, origin: 'bottom'}); 
sr.reveal('.contact-container', {delay: 200, origin: 'top'});