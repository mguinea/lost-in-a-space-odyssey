c.onmousedown = function(e){
  mouse[3] = e.buttons;
  e.preventDefault();
}

c.onmouseup = function(e){
  mouse[3] = e.buttons;
  e.preventDefault();
}

c.onmousemove = function(e){
    mouse[0] = e.offsetX * W / c.offsetWidth;
    mouse[1] = e.offsetY * H / c.offsetHeight;
     //mouse[0] = e.pageX - c.offsetLeft;
     //mouse[1] = e.pageY - c.offsetLeft;
}
