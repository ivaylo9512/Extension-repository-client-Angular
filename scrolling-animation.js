document.addEventListener('DOMContentLoaded', function (event) {
    let currentSection = 'first'; 
    let secondSection = document.getElementById('profile-container');
    let circles = document.querySelectorAll("[class^=circle]");
    
    window.addEventListener('wheel', function(e) {
        if(currentSection == 'first'){
            if (e.deltaY > 0) {
                circles.forEach(circle => circle.classList.add("animate"));
                secondSection.classList.add('translate-second-section');
                currentSection = 'second';
            }
        }else{
            if (e.deltaY < 0) {
                circles.forEach(circle => circle.classList.remove("animate"));
                secondSection.classList.remove('translate-second-section');
                currentSection = 'first';
            }
        }
    });
});