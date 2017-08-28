document.addEventListener('keydown',function(e){
    var kc          = e.keyCode;
    lastPress       = kc;
    pressing[kc]    = true;
},false)
document.addEventListener('keyup',function(e){
    var kc          = e.keyCode;
    pressing[kc]   = false;
},false)
