document.addEventListener('DOMContentLoaded', function (event) {
    let currentIndex = 0;

    let nav = document.getElementById('backgrounds-nav');
    let navBtns = nav.children;
    let currentBtn = navBtns[currentIndex];

    let backgrounds = document.getElementById('backgrounds').children;

    let currentBackground = backgrounds[currentIndex];
    let nextBackground;
    setInterval(function(){ 
        currentIndex++;

        if(currentIndex > backgrounds.length - 1){
            currentIndex = 0;
        }

        currentBtn.classList.remove("active");
        currentBackground.classList.add('backward');

        currentBtn = navBtns[currentIndex];
        currentBtn.classList.add("active");
         
        nextBackground = backgrounds[currentIndex];
        nextBackground.classList.add('current');

        setTimeout(() => {
            currentBackground.classList.remove('backward');
            currentBackground = nextBackground;
        }, 2000);
    }, 5000);

    nav.addEventListener("click", function(event){
        if(event.target.tagName === "LI"){
            console.log(event.target.indexOf);
        }

    })
});