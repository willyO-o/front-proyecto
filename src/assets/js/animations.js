

function init() {
    document.querySelectorAll('.anim').forEach((el) => observer.observe(el));
}
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('anim-visible');
                observer.unobserve(entry.target); // animate once
            }
        });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

export function iniciarAnimaciones() {
    init();
}