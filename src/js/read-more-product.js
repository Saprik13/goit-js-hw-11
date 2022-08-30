const allButtons = document.querySelectorAll('.myBtn');

    allButtons.forEach(function(btn){
        btn.addEventListener('click', myFunction);
    });
    
    function myFunction(){
        const allBtns = document.querySelectorAll(".myBtn");
        const allDots = document.querySelectorAll(".dots");
        const allMore = document.querySelectorAll(".more");

        const btnText = allBtns[[...allBtns].indexOf(this)];
        const dots = allDots[[...allBtns].indexOf(this)];
        const moreText = allMore[[...allBtns].indexOf(this)];

        if(dots.style.display === "none"){
            dots.style.display = "inline";
            moreText.style.display = "none";
        } else{
            dots.style.display = "none";
            moreText.style.display = "inline";
        }  
    }