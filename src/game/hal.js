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
        setContextAtrribute(26, 1);
        if((~~(t * 12) % 12) > 7){
        	fillCircle(chx, chy + 14, 32, 0.9, 0.1);
        }else{
        	fillCircle(chx, chy + 18, 26, 0.9, 0.1);
        }
        setContextAtrribute(16, 1);
        fillCircle(chx + 8, chy + 37, 6);
        fillCircle(chx + 4, chy + 37, 6);

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
