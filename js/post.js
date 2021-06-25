let serverURL = 'https://script.google.com/macros/s/AKfycbzjEEE3LGIkl7_b-Ld0x-3tS9WB-77d1EXMRc6sCixDBi-zHGEg5qM-hxLw_mSbeQM7/exec'

$(document).ready(function() {
	readFromServer();
});

function readFromServer(){
	let parameter = {};
	parameter.method = 'readList';
	$.post(serverURL, parameter, function(data){
		setTable(data);
	}).fail(function(data){
        alert('error');
	});
}

function setTable(sData){
	let node = $('#tr01').html();
	for(let i=0; i<sData.length;i++){
		let content = node.replace('ID_HERE', i+1);
        let myDate = new Date(sData[i][6]);
        let TheDate = myDate.toLocaleString();
        content = content.replace('USERIMAGE_HERE', sData[i][2]);
        content = content.replace('NAME_HERE', sData[i][1]);
        content = content.replace('DATE_HERE', TheDate);
        content = content.replace('POSTIMAGEHREF_HERE', sData[i][3]);
        content = content.replace('POSTIMAGE_HERE', sData[i][3]);
        content = content.replace('TITLENAME_HERE', sData[i][1]);
        content = content.replace('TEXT_HERE', sData[i][4]);
        content = content.replace('TAG_HERE', sData[i][5]);
        $('.content').append(content);
	}
}

// var myDate = new Date();  
// myDate.getYear(); //获取当前年份(2位)  
// myDate.getFullYear(); //获取完整的年份(4位,1970-????)  
// myDate.getMonth(); //获取当前月份(0-11,0代表1月) 所以获取当前月份是 myDate.getMonth()+1;   
// myDate.getDate(); //获取当前日(1-31)  
// myDate.getDay(); //获取当前星期X(0-6,0代表星期天)  
// myDate.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)  
// myDate.getHours(); //获取当前小时数(0-23)  
// myDate.getMinutes(); //获取当前分钟数(0-59)  
// myDate.getSeconds(); //获取当前秒数(0-59)  
// myDate.getMilliseconds(); //获取当前毫秒数(0-999)  
// myDate.toLocaleDateString(); //获取当前日期  
// var mytime = myDate.toLocaleTimeString(); //获取当前时间  
// myDate.toLocaleString( ); //获取日期与时间  