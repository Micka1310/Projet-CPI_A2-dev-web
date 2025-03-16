

function toggleFooterLinks() {
    const footerLinks = document.querySelector('.footer-links');
    const footerLinksList = document.getElementById('footer-links-list');

    if (window.innerWidth <= 768) {
        footerLinks.style.display = "none";
        footerLinksList.style.display = "block";
    } else {
        footerLinks.style.display = "flex";
        footerLinksList.style.display = "none";
    }
}

// Exécuter au chargement de la page
window.addEventListener('load', toggleFooterLinks);
// Exécuter lors du redimensionnement de l'écran
window.addEventListener('resize', toggleFooterLinks);