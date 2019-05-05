let firstLoad = true;
let currentSection = 'first'; 
document.addEventListener('DOMContentLoaded', function (event) {
    let secondSection = document.getElementById('profile-container');
    window.addEventListener('wheel', function(e) {
        if(currentSection == 'first'){
            if (e.deltaY > 0) {
                secondSection.classList.add('translate-second-section');
                currentSection = 'second';
            }
        }else{
            if (e.deltaY < 0) {
                secondSection.classList.remove('translate-second-section');
                currentSection = 'first';
            }
        }
    });
});