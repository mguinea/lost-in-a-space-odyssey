function poolSpawnItem(pool, item, activeIndex){
	var poolAvailableItemIndex = poolAvailableItem(pool, activeIndex);
	if(pool.length == 0 || poolAvailableItemIndex == false){
		pool.push(item);
	}else{
		pool[poolAvailableItemIndex] 	= item;
		pool[poolAvailableItemIndex][activeIndex] = 1;
	}
}

function poolKillItem(pool, index, activeIndex){
	pool[index][activeIndex] = 0;
}

function poolAvailableItem(pool, activeIndex){
	for(var i = pool.length - 1; i >= 0; --i){
		if(pool[i][activeIndex] == 0){
			return i;
		}
	}
	return false;
}
