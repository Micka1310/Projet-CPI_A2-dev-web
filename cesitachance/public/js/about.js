
function toggleContent(section) {
    let content = section.querySelector('.content');
    let isVisible = content.style.display === "block";
    document.querySelectorAll('.content').forEach(c => c.style.display = "none");
    content.style.display = isVisible ? "none" : "block";
}
