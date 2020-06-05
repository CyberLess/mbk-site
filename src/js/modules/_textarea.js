(function() {
const textareas = Array.from(document.querySelectorAll('.textarea__item'));
textareas.forEach((item) => {
  item.addEventListener('input', auto_grow)
});

function auto_grow(event) {
    event.target.style.height = "5px";
    event.target.style.height = (event.target.scrollHeight)+"px";
}


})();
