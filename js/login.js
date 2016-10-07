$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

function login(){
   var u = document.getElementById('user').value;
   localStorage.setItem('user',u);
   if(u.toLowerCase()=="em") {
      window.location.href = 'em.html';
   }else{
      window.location.href = 'ho.html'
   }

}