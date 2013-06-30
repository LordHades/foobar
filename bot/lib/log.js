module.exports = {
	listen: function(data){
		try{
			ts = new Date(),
			year = ts.getFullYear(),
			month = ts.getMonth(),
			day = ts.getDate(),
			hour = ts.getHours(),
			minutes = ts.getMinutes(),
			seconds = ts.getSeconds(),
			time = month + '/' + day + '/' + year + ' ' + hour + ':' + minutes + ':' + seconds + ' ... '
			console.log(time + ' ' + name + ': ' + data.text);
			if(debug){
				console.log('log(listen) running...');
			}
		}catch(err){
			console.log('error in log(listen)...');
		}
	}
}