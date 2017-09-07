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
        var b = (~~(t * 20) % 20);

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
        fillCircle(mx + 64, my + 64 + 16, 3)

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
