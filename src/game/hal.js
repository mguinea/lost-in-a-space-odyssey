function drawHALDialog(){
    if(showDialog == true && hyperSpace == false){
        // Calculate margins
        var mx = W/2 + cam[0] - 256,
            my = H + cam[1] - 128 - 64;
        // Container
        setContextAtrribute(6, 1);
        strokeRectangle(mx, my, 512, 128);
        ctx.save();
        ctx.globalAlpha = 0.1;
        setContextAtrribute(5, 1);
        fillRectangle(mx, my, 512, 128);
        ctx.restore();
        // HAL Face
        var chx = mx + 64,
    		chy = my + 64;
    	// Head
    	setContextAtrribute(8, 1);
    	fillCircle(chx, chy, 48);
    	// Eyes (white)
    	setContextAtrribute(17, 1);
    	fillCircle(chx - 6, chy - 8, 21);
    	fillCircle(chx + 6, chy - 8, 21);
    	// Eyes (black)
    	setContextAtrribute(26, 1);
    	if((~~(t * 24) % 24) == 1){
    		fillRectangle(chx - 9, chy, 6, 2);
    		fillRectangle(chx + 3, chy, 6, 2);
    	}else{
    		fillCircle(chx - 6, chy, 3);
    		fillCircle(chx + 6, chy, 3);
    	}
        // Mouth
        if((~~(t * 12) % 12) > 7){
            setContextAtrribute(26, 1);
        	fillCircle(chx, chy + 14, 32, 0.9, 0.1);
        }else{
            setContextAtrribute(26, 1);
        	fillCircle(chx, chy + 18, 26, 0.9, 0.1);
        }
        setContextAtrribute(16, 1);
        fillCircle(chx + 8, chy + 37, 6);
        fillCircle(chx + 4, chy + 37, 6);

        /*var b = (~~(t * 20) % 20);

        setContextAtrribute(19, 1);
        fillRectangle(mx + 30, my + 14, 68, 104);

        setContextAtrribute(26, 1);
        fillRectangle(mx + 32, my + 16, 64, 100);

        setContextAtrribute(19, 1);
        fillCircle(mx + 64, my + 64 + 16, 30);

        // setContextAtrribute(16, 1);
        // Create gradient
        var grd = ctx.createRadialGradient(0,0, 12*(b/10), 0,0,26);
        grd.addColorStop(0, '#f00');
        grd.addColorStop(1, '#000');
        // Fill with gradient
        ctx.fillStyle = grd;
        fillCircle(mx + 64, my + 64 + 16, 26);

        setContextAtrribute(11, 1);
        fillCircle(mx + 64, my + 64 + 16, 3)*/

        // Text
        ctx.save();
        ctx.strokeStyle = '#ecf0f1';
        ctx.globalAlpha = 0.3;
        ctx.globalAlpha = 1;
        ctx.translate(W / 2 - 256 + 128, H - 128 - 32);
        var indexPhrase = dialogs[dialog][1];
        font(dialogs[dialog][2][indexPhrase], 1, 1);
        ctx.restore();
    }
}
