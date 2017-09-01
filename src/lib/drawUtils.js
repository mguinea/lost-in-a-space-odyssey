function _pivot(p){
	if(p){
		return [p[0], p[1]];
	}else{
		return [0, 0];
	}
}

function setContextAtrribute(index, attribute, custom){
	ctx[['strokeStyle','fillStyle','lineWidth'][attribute||0]] = custom||colors[index];
}

// Draw functions
function drawLine(x, y, r, l, w){
	ctx.save();
	ctx.lineWidth = w;
	ctx.translate(x-cam[0], y-cam[1]);
	ctx.beginPath();

	var rpx = Math.cos( (r).toRad() ) * l,
		rpy = Math.sin( (r).toRad() ) * l;

	ctx.moveTo(0, 0);
	ctx.lineTo(rpx, rpy);
	ctx.stroke();
	ctx.closePath();
	ctx.restore();
}

function fillRectangle(x, y, w, h, r, p){ // x, y, width, height, rotation, pivot[x, y]
	ctx.save();
	ctx.translate(x-cam[0], y-cam[1]);
	if(r){ ctx.rotate((r).toRad()); }
	ctx.fillRect(_pivot(p)[0], _pivot(p)[1], w, h);
	ctx.restore();
}

function strokeRectangle(x, y, w, h, r, p){ // x, y, width, height, rotation, pivot[x, y]
	ctx.save();
	ctx.translate(x-cam[0], y-cam[1]);
	if(r){ ctx.rotate((r).toRad()); }
	ctx.strokeRect(_pivot(p)[0], _pivot(p)[1], w, h);
	ctx.restore();
}

function fillCircle(x, y, r){
	ctx.save();
	ctx.beginPath();
	ctx.translate(x-cam[0], y-cam[1]);
	ctx.arc(0, 0, r, 0, Math.PI * 2, true);
	ctx.fill();
	ctx.closePath();
	ctx.restore();
}

function strokeCircle(x, y, r){
	ctx.save();
	ctx.beginPath();
	ctx.translate(x-cam[0], y-cam[1]);
	ctx.arc(0, 0, r, 0, Math.PI * 2, true);
	ctx.stroke();
	ctx.closePath();
	ctx.restore();
}

function strokePath (x, y, r, pts, d) {
	ctx.save();
	ctx.lineJoin = "round";
	ctx.beginPath();
	ctx.translate(x-cam[0], y-cam[1]);
	ctx.rotate((r).toRad());

	var mv = 1;
	for (var i = 0; pts && i<pts.length; ++i) {
		var p = pts[i];
		if (p) {
			if (mv) ctx.moveTo(p[0] * d, p[1] * d);
			else ctx.lineTo(p[0] * d, p[1] * d);
			mv = 0;
		}
		else mv = 1;
	}
	ctx.stroke();
	ctx.closePath();
	ctx.restore();
	return ctx;
}

function scalePath(path, scale){
	if(scale == 1){
		return path;
	}
	var newPath = [];
	for(var i = path.length - 1; i >= 0; --i){
		newPath.push([path[i][0] * scale, path[i][1] * scale]);
	}
	return newPath;
}
