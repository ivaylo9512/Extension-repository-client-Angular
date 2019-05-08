document.addEventListener('DOMContentLoaded', function (event) {
    let currentIndex = 0;

    let nav = document.getElementById('backgrounds-nav');
    let navBtns = nav.children;
    let currentBtn = navBtns[currentIndex];

    let backgrounds = document.getElementById('backgrounds').children;

    let currentBackground = backgrounds[currentIndex];
    let nextBackground = backgrounds[currentIndex + 1];

    let selected = false;
    setInterval(() => {
        if(!selected){
            currentBtn = navBtns[currentIndex];
            currentBtn.classList.remove('current');

            currentBackground = backgrounds[currentIndex];
            currentBackground.classList.add('backward');
            currentBackground.classList.remove("current");

            currentIndex++;
            if(currentIndex > backgrounds.length - 1){
                currentIndex = 0;
            }

            currentBtn = navBtns[currentIndex];
            currentBtn.classList.add("current");
         
            nextBackground = backgrounds[currentIndex];
            nextBackground.classList.add('current');

            setTimeout(() => {
                currentBackground.classList.remove('backward');
                currentBackground = nextBackground;
            }, 2000);
        }
        selected = false;
    }, 5000);

    nav.addEventListener("click", function(event){
        if(event.target.tagName === "LI"){
            let index = [...navBtns].indexOf(event.target);
            if(currentIndex != index){
                currentIndex = index;
                selected = true;

                currentBackground.classList.remove("current");
                currentBackground.classList.remove("backward");

                nextBackground.classList.remove("current");
                nextBackground.classList.remove("backwards");

                currentBtn.classList.remove("current");

                currentBtn = navBtns[index];
                currentBtn.classList.add("current");
                 

                currentBackground = backgrounds[index];
                currentBackground.classList.remove('backward');
                currentBackground.classList.add('current');
            }
        }
    })
});