module.exports = {
	get: function(data){
		try{
			if(autodj){
				foo.stage.auto(data);
			}
			roomname = data.room.name;
		  	djs = data.room.metadata.djs;
		  	mods = data.room.metadata.moderator_id;	
		  	foo.placeStickers(stickers);
		  	if(debug){
				console.log('change(get) running...');
			}
		}catch(err){
			console.log('error in change(get)...', err);
		}
  	}
}