window.onload = function () {	
	//轮播图
	var oShow_img=document.getElementById('first_img')
	var oUl=document.getElementById('show_img');
	var aChangeLi_img=oUl.getElementsByTagName('li');
	var oOl=document.getElementById('first_list');
	var aChangeLi=oOl.getElementsByTagName('li');
	var aSpan=oOl.getElementsByTagName('span');
	var oPrev=document.getElementById('first_prev');
	var oNext=document.getElementById('first_next');
	oUl.innerHTML+=oUl.innerHTML;
	oUl.style.width=aChangeLi_img.length*aChangeLi_img[0].offsetWidth+'px';
	var w = oUl.offsetWidth/2;
	
	//上一个、下一个按钮显示隐藏
	oPrev.onmouseover=oNext.onmouseover=oShow_img.onmouseover=function(){
		oPrev.style.display='block';
		oNext.style.display='block';
		clearInterval(timer);	
	};
	oPrev.onmouseout=oNext.onmouseout=oShow_img.onmouseout=function(){
		oPrev.style.display='none';
		oNext.style.display='none';	
		clearInterval(timer);
		timer=setInterval(function(){
			next();	
		},3000);
	};
	//自定义运动框架
	var left = 0;
	function startMove2(obj,iTarget,fnend){
		var count = Math.floor(1000/30);
		var start = left;
		var dis = iTarget-start;
		var n = 0;
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			n++;
			var a = 1-n/count;
			left=start+dis*(1-Math.pow(a,3));
			if(left<0){
				obj.style.left=left%w+'px';
			}else{
				obj.style.left=(left%w-w)%w+'px';
			}
			if(n==count){
				clearInterval(obj.timer);
				fnend&&fnend();
			}
		},30);
	}
	//轮播图加事件
	var iNow=0;
	function tab(clk){	
		for(var i=0;i<aChangeLi.length;i++){
			aSpan[i].className='';
		}
		if(iNow<0){
			var count=(iNow%aChangeLi.length+aChangeLi.length)%aChangeLi.length
			aSpan[count].className='jdt';
		}else{
			var count=iNow%aChangeLi.length
			aSpan[count].className='jdt';
		}
		//判断是否是点击事件
			//点击事件：下标直接铺满，不需要再有运动；
			//非点击事件：下标采用运动形式铺满；
		switch (clk){
			case 'clk':
				aSpan[count].style.width='100%';
				startMove2(oUl,-iNow*aChangeLi_img[0].offsetWidth);
				break;
			case 'no_clk':
				span_next(count);
				break;
		}
			
			
	}
	//下标运动循环
	function span_next(count){
		for(var i=0;i<aSpan.length;i++){
			aSpan[i].style.width=0;
		}
		startMove(aSpan[count],{width:aChangeLi[0].offsetWidth},{type:'linear',time:2000,end:function(){
			count++;
			if(count==aChangeLi.length)count=0;
			startMove2(oUl,-iNow*aChangeLi_img[0].offsetWidth);
		}});
	}
	//下标点击事件
	for (var i=0;i<aChangeLi.length;i++){
		(function(index){
			aChangeLi[index].onclick=function(){
				if((iNow%aChangeLi.length==aChangeLi.length-1||iNow%aChangeLi.length==-1)&&index==0)iNow++;
				if(iNow%aChangeLi.length==0&&index==aChangeLi.length-1)iNow--;
				iNow = Math.floor(iNow/aChangeLi.length)*aChangeLi.length+index;
				tab('clk');
			};	
		})(i);	
	}
	//next切换
	oNext.onclick=next;
	function next(clk){
		iNow++;
		//判断是否传参，没传参代表用非点击形式，传参代表用点击形式(下标直接铺满)
		if(clk){
			tab('clk');
		}else{
			tab('no_clk');	
		}
		
	};
	//oPrev切换
	oPrev.onclick=function(){
		iNow--;
		//点击使用点击形式下标直接铺满，不再使用运动形式；
		tab('clk');
	};
	//定时器切换
	var timer=null;
	clearInterval(timer);
	//页面加载 第一个下标默认铺满
	aSpan[0].style.width='100%';
	timer=setInterval(function(){
		//定时器中不传参，用运动形式铺满下标；
		next();	
	},3000);
//轮播图结束	

//主菜单开始
	var oM_ul=document.getElementById('main_list');
	var aM_Li=oM_ul.getElementsByTagName('li');
	var oBox=document.getElementById('box');
	var oMainTop=document.getElementById('main_top');
	var aBox=oBox.children;
	var arr=[];
	for(var i=0;i<aBox.length;i++){
		arr.push(aBox[i].offsetTop);
	}
	var oBrower=document.documentElement||document.body;
	var oBox0=document.getElementById('box0');
	oBox0.style.height=document.documentElement.clientHeight-oMainTop.offsetHeight+'px';
	for(var i=0;i<aM_Li.length;i++){
		(function(index){
			aM_Li[index].onclick=function(){
				for(var i=0;i<aM_Li.length;i++){
					aM_Li[i].className='';
				}
				this.className='main_list_on';
				scrollMove(document.body,arr[index])
				scrollMove(document.documentElement,arr[index])
			};
		})(i);
	}
	function scrollMove(obj,iTarget){
		var count=Math.floor(500/30);
		var start=document.documentElement.scrollTop||document.body.scrollTop;
		var dis=iTarget-start;
		var n=0;

		var timer=null;
		clearInterval(timer);
		timer=setInterval(function(){
			n++;
			var cur=start+n*dis/count;
			obj.scrollTop=cur;
			if(n==count){
				clearInterval(timer);
			}
				
		},30);
	}

//主菜单结束
//展示切换开始
	var oShowBox=document.getElementById('show_box');
	var aShowBox=oShowBox.children;
	var oShowTop=document.getElementById('show_top')
	var oSlist=document.getElementById('show_list');
	var aSlist=oSlist.children;
	oShowBox.style.height=aShowBox.length*aShowBox[0].offsetHeight+'px';
	for(var i=0;i<aSlist.length;i++){
		(function(index){
			aSlist[index].onclick=function(){
				for(var i=0;i<aSlist.length;i++){
					aSlist[i].className='';	
				}
				aSlist[index].className='show_on';	
				doMove(oShowBox,{top:-index*aShowBox[0].offsetHeight})
			};	
		})(i);
	}
//展示切换结束

//展示一开始
	var oShow1=document.getElementById('show_content');
	var aDiv = oShow1.children;
	for(var i=0;i<aDiv.length;i++){
		move1(aDiv[i]);
	}
//展示一结束
//展示二开始
	circle('circle');
//展示二结束

//展示三开始
	showLi('change');
//展示三结束
//webQQ开始
	webQq();
//webQQ结束
//ball 开始
	ball('ball');
//ball结束

//时钟开始
	var oTick=document.getElementById('chick');
	var aImg=oTick.getElementsByTagName('img');
	function tick(){
		var oDate = new Date();
		var h = oDate.getHours();
		var m = oDate.getMinutes();
		var s = oDate.getSeconds();
		var str = toDou(h)+toDou(m)+toDou(s);
		for(var i=0;i<aImg.length;i++){
			startMove(aImg[i],{top:-35*str.charAt(i)});	
		}
	}
	tick();
	setInterval(tick,1000);
//时钟结束
};


