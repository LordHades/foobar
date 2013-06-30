module.exports = {
	cannon: function(data){
		try{
			if(userid == 'xxx'){
				foo.roomInfo(true, function(data) {
					var currentDjName = data.room.metadata.current_song.djname;
					var spuds = [
						"http://goo.gl/oU332"
					];
					var random = Math.floor(Math.random() * spuds.length);
					foo.speak(data.name + ' loads potato gun');
	                setTimeOut(function(){
	                    foo.speak(data.name + ' sets sights');
	                },500);    
	                setTimeOut(function(){
	                    foo.speak(data.name + ' shoots @' + currentDjName + "with a spud" + spuds[random]);
	                },1000);
				});
			}
			if(debug){
				console.log('spud(cannon) running...');
			}
		}catch(err){
			console.log('error in spud(cannon)...');
		}
	}
}