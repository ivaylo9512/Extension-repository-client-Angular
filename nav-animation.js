document.addEventListener("DOMContentLoaded", function (event) {
    let header = document.getElementsByTagName('header')[0];
    let scrolling = false,
        previousTop = 0,
        currentTop = 0,
        scrollDelta = 5,
        scrollOffset = 50;

    window.addEventListener('scroll', function () {
        if (!scrolling) {
            scrolling = true;
            (!window.requestAnimationFrame) 
                    ? setTimeout(autoHideHeader, 250)
                    : requestAnimationFrame(autoHideHeader);
        }
    });
    function autoHideHeader() {
        currentTop = this.scrollY;
        if(previousTop > 0){
	        checkSimpleNavigation(currentTop);
        }
	   	previousTop = currentTop;
		scrolling = false;
	}

    function checkSimpleNavigation(currentTop) {
        if (previousTop - currentTop > scrollDelta || currentTop < scrollDelta) {
            header.classList.remove('hidden');
        } else if (currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
            header.classList.add('hidden');
        }
    }
});