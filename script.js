

window.onload = function () {

    jQuery(document).ready(function(){
        $('h1').mousemove(function(e){
        var rXP = (e.pageX - this.offsetLeft-$(this).width()/2);
        var rYP = (e.pageY - this.offsetTop-$(this).height()/2);
        $('h1').css('text-shadow', +rYP/10+'px '+rXP/80+'px #69e81a, '+rYP/8+'px '+rXP/60+'px red, '+rXP/70+'px '+rYP/12+'px black');
    });
    });

    
}




