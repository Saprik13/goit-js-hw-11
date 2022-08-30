$(document).keydown(function (event) { 
            
  if (event.keyCode == 27) {
    document.body.classList.remove('modal-open');
    document.getElementById('modal-about').classList.add('backdrop--hidden');
    document.getElementById('modal-buy').classList.add('backdrop--hidden');
    document.getElementById('modal-location').classList.add('backdrop--hidden');
    document.getElementById('modal-franchise').classList.add('backdrop--hidden');
    document.querySelector(".video-setup").pause();
  }
});
