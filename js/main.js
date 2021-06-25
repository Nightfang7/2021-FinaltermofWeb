let serverURL = 'https://script.google.com/macros/s/AKfycbzjEEE3LGIkl7_b-Ld0x-3tS9WB-77d1EXMRc6sCixDBi-zHGEg5qM-hxLw_mSbeQM7/exec'
let articleNum = 1;
let event_ary = ['input[type=text]', 'textarea'];

$(document).ready(function() {
    initBtnFunc();
    setProgress()
    // backToCenter(0);
});

for(let i=0; i<event_ary.length;i++){
	$(event_ary[i]).focusout(function(event) {
		if($(this).val() == ''){
			setTip($(this));
		}
	});

	$(event_ary[i]).keyup(function(event) {
		if($(this).val() != ''){
			removeTip($(this));
		}
		if(jugeUrl($(this).val()) == true){
			removeTip2($(this));
		}
	});
}

$('#userImageURL').focusout(function(event) {
	setCam($(this));
});

$('#postImageURL').focusout(function(event) {
    setPicture($(this));
	
});

function initBtnFunc(){
	$('.btn-next').click(function(event) {
		checkField();
	});
	$('.btn-prev').click(function(event) {
		switchArticle('prev');
	});
	$('.btn-send').click(function(event) {
		checkField();
		
	});
	$('.btn-prev').hide();
    $('.btn-next').show();
}

function checkField(){
	switch(articleNum){
		case 2:
			if($('input[name=userName]').val() == ''){
				setTip($('input[name=userName]'));
				return false	
			}
			if($('#userImageURL').val() == ''){
				setTip($('#userImageURL'));
				setCam($('#userImageURL'));
				return false	
			}else if(jugeUrl($('#userImageURL').val()) == false){
				return false
			}
			switchArticle('next');
			break;
		case 3:
			if(jugeUrl($('#postImageURL').val()) == false ){
				if($('#postImageURL').val() == ''){
					switchArticle('next');
				}else{
					return false
				}
			}else{
				switchArticle('next');
			}
			break;
		case 4:
			if($('textarea').val() == ''){
				setTip($('textarea'));
				return false;
			}
			sendToSever();
			break;
		default:
			switchArticle('next');
	}
}

function setTip(dom){
	let template = $('#tipTemplate01');
	let node = $('#tipTemplate01').html();
	if(dom.closest('.main-group').find('.tip').length == 0){
		dom.closest('.main-group').append(node);
		dom.closest('.main-group').addClass('bdr');
    }
    
}

function setTip2(dom){
	let template = $('#tipTemplate02');
	let node = $('#tipTemplate02').html();
	if(dom.closest('.main-group').find('.tip2').length == 0){
		dom.closest('.main-group').append(node);
		dom.closest('.main-group').addClass('bdr2');
    }
    
}

function removeTip(dom){
	dom.closest('.main-group').find('.tip').remove();
	dom.closest('.main-group').removeClass('bdr');
}
function removeTip2(dom){
	dom.closest('.main-group').find('.tip2').remove();
    dom.closest('.main-group').removeClass('bdr2');
}

function setCam(dom){
	if(dom.val() == ''){
        removeTip2(dom)
		$('.fa-camera').css('display', 'grid');
		$('.fa-camera').css('color', 'red');
		$('.camera-btn').css('border-color', 'red');
		$('.camera-btn .fa-check-circle').css('display', 'none');
	}else{
        if(jugeUrl(dom.val()) == true ){
            removeTip2(dom)
            $('.fa-camera').css('display', 'none');
            $('.camera-btn').css('border-color', '#2C666E');
            $('.camera-btn .fa-check-circle').css('display', 'grid');
        }else{
            setTip2(dom);
            $('.fa-camera').css('display', 'grid');
            $('.fa-camera').css('color', 'red');
            $('.camera-btn').css('border-color', 'red');
            $('.camera-btn .fa-check-circle').css('display', 'none');
        }
	}
}

function setPicture(dom){
    if(dom.val() == ''){
        removeTip2(dom)
		$('.fa-picture-o').css('display', 'grid');
        $('.fa-picture-o').css('color', '#2C666E');
        $('.picture-btn').css('border-color', '#2C666E');
		$('.picture-btn .fa-check-circle').css('display', 'none');	
	}else{
		if(jugeUrl(dom.val()) == true ){
            removeTip2(dom)
            $('.fa-picture-o').css('display', 'none');
            $('.picture-btn .fa-check-circle').css('display', 'grid');
            $('.picture-btn').css('border-color', '#2C666E');
        }else{
            setTip2(dom);
            $('.fa-picture-o').css('display', 'grid');
            $('.fa-picture-o').css('color', 'red');
            $('.picture-btn').css('border-color', 'red');
            $('.picture-btn .fa-check-circle').css('display', 'none');
        }
	}
}

function jugeUrl(URL) {
    var str = URL;
    //判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
    //下面的代码中应用了转义字符"\"输出一个字符"/"
    var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
    var objExp = new RegExp(Expression);
    if (objExp.test(str) == true) {
        return true;
    } else {
        return false;
    }
}

function switchArticle(situation){
    
	switch(situation){
		case 'next':
            if(articleNum < 5){
            	$('nav').hide();
                gsap.to('#article'+ articleNum , {
                	duration:1, opacity: 0, scale: 1.2, y: -100,
                	ease: "back.inOut(1.4)",
                	onComplete: backToCenter,
                	onCompleteParams: [articleNum, situation]

                });
                gsap.to('#img'+ articleNum, {
                    duration:1, opacity: 0, scale: 0.5, y: $('.container').height(),
                	ease: "back.inOut(1.4)",
                	onComplete: backToCenter,
                	onCompleteParams: [articleNum, situation],
                })
                articleNum++;
                $('#img'+ articleNum).show();
                $('#article'+ articleNum).show();
                gsap.from('#article'+articleNum, {
                    duration:1.5, opacity: 0, scale: 0.8, y: 100,
                    ease: "back.inOut(1.4)"

                });
                gsap.from('#img'+articleNum, {
                    duration:1.5, opacity: 0, x: $('.container').width(),
                    ease: "back.inOut(1.4)",
                });
                setProgress()
            }
            break;
        case 'prev':
            if(articleNum > 1){
            	$('nav').hide();
                gsap.to('#article'+ articleNum , {
                	duration:1, opacity: 0, scale: 0.8, y: 100,
                	ease: "back.inOut(1.4)",
                	onComplete: backToCenter,
                	onCompleteParams: [articleNum, situation]
                });
                gsap.to('#img'+ articleNum, {
                    duration:1.5, opacity: 0, x: $('.container').width(),
                	ease: "back.inOut(1.4)",
                	onComplete: backToCenter,
                	onCompleteParams: [articleNum, situation],
                })
                articleNum--;
                $('#img'+ articleNum).show();
                $('#article'+ articleNum).show();
                gsap.from('#article'+articleNum, {
                    duration:1.5, opacity: 0, scale: 1.2, y: -100,
                    ease: "back.inOut(1.4)"
                });
                gsap.from('#img'+articleNum, {
                    
                    duration:1, opacity: 0, scale: 0.5, y: $('.container').height(),
                    ease: "back.inOut(1.4)",
                });
                setProgress()
            }
            break;
	}
}

function backToCenter(oldNum, situation){
	$('#article'+ oldNum).hide();
	$('#img'+ oldNum).hide();
	gsap.to('#article'+ oldNum , {duration: 0, opacity: 1, scale: 1, y: 0, x: 0});
	gsap.to('#img'+ oldNum , {duration: 0, opacity: 1, scale: 1, y: 0, x: 0});
	$('nav').show();
	switch(situation){
		case 'next':
            // console.log(articleNum);
			$('nav').show();
			$('.btn-next').show();
			$('.btn-prev').show();
			if(articleNum == 4){
				$('.btn-next').hide();
			}else if(articleNum == 5){
				$('nav').hide();
			}
			break;
		case 'prev':
            // console.log(articleNum);
			$('nav').show();
			$('.btn-next').show();
			$('.btn-prev').show();
			if(articleNum == 1){
				$('.btn-prev').hide();
                $('.btn-next').show();
			}
			break;
	}
}

function setProgress(){
	let w = Math.floor((articleNum/5)*100);
	$('.progress-bar').css('width', w+'%');
}

function sendToSever(){
	let parameter = {};
	parameter.userName = $('input[name=userName]').val();
	parameter.userImageURL = $('input[name=userImageURL]').val();
	parameter.postImageURL = $('input[name=postImageURL]').val();
	parameter.userText = $('textarea[name=userText]').val();
	parameter.userTag = $('input[name=userTag]').val();
	parameter.method = "write1";

	console.log(parameter);

	$('.cover').css('display', 'grid');
	$.post(serverURL, parameter, function(data){
		console.log(data);
		if(data.result = 'sus'){
			// alert('送出成功');
			switchArticle('next');
			$('.cover').css('display', 'none');
		}else{
			$('.cover').css('display', 'none');
			alert('Error檢查');
		}
	}).fail(function(data){
		alert('送出失敗');
	});
}