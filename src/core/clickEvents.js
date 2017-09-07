c.onmousedown = function(e){
  //coords[2] = e.which==3?0:1;
  //coords[3] = e.which==3?1:0;
  mouse[3] = 1;
  e.preventDefault();
}

c.onmouseup = function(e){
  //coords[2] = 0;
  //coords[3] = 0;
  mouse[3] = 0;
  e.preventDefault();
}

c.onmousemove = function(e){
    mouse[0] = e.offsetX * W / c.offsetWidth;
    mouse[1] = e.offsetY * H / c.offsetHeight;
     //mouse[0] = e.pageX - c.offsetLeft;
     //mouse[1] = e.pageY - c.offsetLeft;
}
