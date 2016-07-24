//普通move框架
function getStyle(obj,name){
	return (obj.currentStyle||getComputedStyle(obj,false))[name]	
}
function startMove(obj,json,options){
	options=options||{};
	options.time=options.time||700;
	options.type=options.type||'ease-out';
	var start={};
	var dis={};
	for(var name in json){
		start[name]=parseInt(getStyle(obj,name));
		if(isNaN(start[name])){
			switch (name){
				case 'width':
					start[name]=obj.offsetWidth;
					break;
				case 'height':
					start[name]=obj.offsetHeight;
					break;
				case 'left':
					start[name]=obj.offsetLeft;
					break;
				case 'top':
					start[name]=obj.offsetTop;
					break;
				case 'opacity':
					start[name]=1;
					break;
				case 'borderWidth':
					start[name]=0;
					break;
			}
		}
		dis[name]=json[name]-start[name];	
	}
	var count=Math.floor(options.time/30);
	var n=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		for(var name in json){
			switch (options.type){
				case 'linear':
					var a=n/count;
					var cur=start[name]+dis[name]*a;
					break;
				case 'ease-in':
					var a=n/count;
					var cur=start[name]+dis[name]*Math.pow(a,3);
					break;	
				case 'ease-out':
					var a=1-n/count;
					var cur=start[name]+dis[name]*(1-Math.pow(a,3));
					break;		
			}
			if(name=='opacity'){
				obj.style[name]=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}else{
				obj.style[name]=cur+'px';	
			}
		}
		if(n==count){
			clearInterval(obj.timer);
			options.end&&options.end();
		}	
	},30);
}
//domove 
//t  当前时间  	time*n/count
//b  初始值   	start
//c  总距离	 	dis
//d  总时间	 	time
//var cur=fx(t,b,c,d)
var Tween={Linear:function(t,b,c,d){return c*t/d+b},Quad:{easeIn:function(t,b,c,d){return c*(t/=d)*t+b},easeOut:function(t,b,c,d){return -c*(t/=d)*(t-2)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t+b}return -c/2*((--t)*(t-2)-1)+b}},Cubic:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t+b},easeOut:function(t,b,c,d){return c*((t=t/d-1)*t*t+1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t+b}return c/2*((t-=2)*t*t+2)+b}},Quart:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t*t+b},easeOut:function(t,b,c,d){return -c*((t=t/d-1)*t*t*t-1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t+b}return -c/2*((t-=2)*t*t*t-2)+b}},Quint:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t*t*t+b},easeOut:function(t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t*t+b}return c/2*((t-=2)*t*t*t*t+2)+b}},Sine:{easeIn:function(t,b,c,d){return -c*Math.cos(t/d*(Math.PI/2))+c+b},easeOut:function(t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b},easeInOut:function(t,b,c,d){return -c/2*(Math.cos(Math.PI*t/d)-1)+b}},Expo:{easeIn:function(t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b},easeOut:function(t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b},easeInOut:function(t,b,c,d){if(t==0){return b}if(t==d){return b+c}if((t/=d/2)<1){return c/2*Math.pow(2,10*(t-1))+b}return c/2*(-Math.pow(2,-10*--t)+2)+b}},Circ:{easeIn:function(t,b,c,d){return -c*(Math.sqrt(1-(t/=d)*t)-1)+b},easeOut:function(t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return -c/2*(Math.sqrt(1-t*t)-1)+b}return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b}},Elastic:{easeIn:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d)==1){return b+c}if(!p){p=d*0.3}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b},easeOut:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d)==1){return b+c}if(!p){p=d*0.3}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}return(a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b)},easeInOut:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d/2)==2){return b+c}if(!p){p=d*(0.3*1.5)}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}if(t<1){return -0.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b}return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*0.5+c+b}},Back:{easeIn:function(t,b,c,d,s){if(s==undefined){s=1.70158}return c*(t/=d)*t*((s+1)*t-s)+b},easeOut:function(t,b,c,d,s){if(s==undefined){s=1.70158}return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},easeInOut:function(t,b,c,d,s){if(s==undefined){s=1.70158}if((t/=d/2)<1){return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b}return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b}},Bounce:{easeIn:function(t,b,c,d){return c-Tween.Bounce.easeOut(d-t,0,c,d)+b},easeOut:function(t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b}else{if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+0.75)+b}else{if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+0.9375)+b}else{return c*(7.5625*(t-=(2.625/2.75))*t+0.984375)+b}}}},easeInOut:function(t,b,c,d){if(t<d/2){return Tween.Bounce.easeIn(t*2,0,c,d)*0.5+b}else{return Tween.Bounce.easeOut(t*2-d,0,c,d)*0.5+c*0.5+b}}}};

function getStyle(obj,name){
	return (obj.currentStyle||getComputedStyle(obj,false))[name];
}
function doMove(obj,json,options){
	options=options||{};
	options.time = options.time||700;
	options.type = options.type||Tween.Bounce.easeOut;
	var start={};
	var dis = {};
	for(var  name in json){
		start[name]=parseFloat(getStyle(obj,name));
		if(isNaN(start[name])){
			switch(name){
				case 'width':
					start[name]=obj.offsetWidth;
					break;
				case 'height':
					start[name]=obj.offsetHeight;
					break;
				case 'top':
					start[name]=obj.offsetTop;
					break;
				case 'left':
					start[name]=obj.offsetLeft;
					break;
				case 'opacity':
					start[name]=1;
					break;
				case 'borderWidth':
					start[name]=0;
					break;
			}
		}
		dis[name]=json[name]-start[name];
	}
	var count = Math.floor(options.time/30);
	var n = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		n++;
		for(var name in json){
			var cur=options.type(options.time*n/count,start[name],dis[name],options.time);
			if(name=='opacity'){
				obj.style[name]=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}else{
				obj.style[name]=cur+'px';
			}
		}
		if(n==count){
			clearInterval(obj.timer);
			options.end&&options.end();
		}
	},30);
	
}


//获取绝对距离
function getPos(obj){
	var t = 0;		//初始上距离
	var l = 0;		//初始左距离
	//循环不断的获取定位父级
	while(obj){
		//把左距离相加
		l+=obj.offsetLeft;
		//把上距离相加
		t+=obj.offsetTop;
		//获取定位父级
		obj = obj.offsetParent;
	}
	//返回结果
	return [l,t];
}
//穿墙函数
	//判断方向
function hoverDir(obj,ev){
	var R = obj.offsetWidth/2;
	var scrollT=document.documentElement.scrollTop || document.body.scrollTop;
	console.log(scrollT)
	var x = R+getPos(obj)[0]-ev.clientX;
	var y = R+getPos(obj)[1]-(ev.clientY+scrollT);
	return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4;
}

	//运动函数
function move1(obj){
	var oSpan1 = obj.children[0];
	obj.onmouseover=function(ev){
		var oEvent = ev||event;
		var oFrom = oEvent.fromElement||oEvent.relatedTarget;
		if(this.contains(oFrom))return;
		var n = hoverDir(obj,oEvent);
		switch(n){
			case 0:
				oSpan1.style.top=0;
				oSpan1.style.left='230px';
			break;
			case 1:
				oSpan1.style.top='230px';
				oSpan1.style.left=0;
			break;
			case 2:
				oSpan1.style.left='-230px';
				oSpan1.style.top=0;
			break;
			case 3:
				oSpan1.style.left=0;
				oSpan1.style.top='-230px';
			break;
		}
		startMove(oSpan1,{left:0,top:0});
	};
	obj.onmouseout=function(ev){
		var oEvent = ev||event;
		var oTo = oEvent.toElement||oEvent.relatedTarget;
		if(this.contains(oTo))return;
		var n = hoverDir(obj,oEvent);
		switch(n){
			case 0:
				startMove(oSpan1,{left:230,top:0});
			break;
			case 1:
				startMove(oSpan1,{left:0,top:230});
			break;
			case 2:
				startMove(oSpan1,{left:-230,top:0});
			break;
			case 3:
				startMove(oSpan1,{left:0,top:-230});
			break;
		}
	};
};

//圆的运动
function circle(id){
	var oBox = document.getElementById(id);
	var R = oBox.offsetWidth/2;
	var N=10;
	for(var i=0;i<N;i++){
		var oSpan = document.createElement('span');
		oBox.appendChild(oSpan);
	}
	var aSpan = oBox.children;
	var bSign=true;
	oBox.parentNode.onclick=function(){
		if(bSign){
			for(var i=0;i<aSpan.length;i++){
				startMove(aSpan[i],i*360/N);
			}
		}else{
			for(var i=0;i<aSpan.length;i++){
				startMove(aSpan[i],0);
			}	
		}
		bSign=!bSign;
	};
	
	function startMove(obj,iTarget){
		obj.a=obj.a||0;
		var count = Math.floor(1000/30);
		var start = obj.a;
		var dis = iTarget-start;
		var n = 0;
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			n++;
			
			var b = 1-n/count;
			obj.a = start+dis*(1-Math.pow(b,3));
			
			var x=R+Math.sin(obj.a*Math.PI/180)*R;
			var y=R-Math.cos(obj.a*Math.PI/180)*R;
			
			obj.style.top=y+'px';
			obj.style.left=x+'px';
			
			if(n==count){
				clearInterval(obj.timer);	
			}
		},30);
	}
}
//第二模块 换一换 开始
(function(window){
	window.showLi=function (id){	
		var oChange=document.getElementById(id);
		var oChangeUl=oChange.parentNode.getElementsByTagName('ul')[0];
		var aOther=oChangeUl.children;
	
		//布局转换  	把浮动-》定位
		var aPos = [];
		for(var i=0;i<aOther.length;i++){
			aPos.push({left:aOther[i].offsetLeft,top:aOther[i].offsetTop});
		}
		
		for(var i=0;i<aOther.length;i++){
			aOther[i].style.left=aPos[i].left+'px';
			aOther[i].style.top=aPos[i].top+'px';
			aOther[i].style.position='absolute';
			aOther[i].style.margin=0;
		}
		
		
		var timer = null;
		oChange.onclick=function(){
			var i = 0;
			var t=oChange.offsetTop+oChange.offsetHeight/2;
			var l=oChange.offsetLeft+oChange.offsetWidth/2;
			timer = setInterval(function(){
				(function(index){
					startMove(aOther[i],{width:0,height:0,top:t,left:l,opacity:0},{time:500,end:function(){
						if(index==aOther.length-1){
							
							for(var i =0;i<aOther.length;i++){
								aOther[i].style.background='rgb('+parseInt(Math.random()*256)+','+parseInt(Math.random()*256)+','+parseInt(Math.random()*256)+')';
							}
							
							i=aOther.length-1;
							timer = setInterval(function(){
								startMove(aOther[i],{width:100,height:100,left:aPos[i].left,top:aPos[i].top,opacity:1},{time:500});
								i--;
								if(i==-1){
									clearInterval(timer);
								}
							},100);
						}
					}});
				})(i);
				i++;
				if(i==aOther.length){
					clearInterval(timer);
				}
			},100);
		};
	};
})(window);
//第二模块 换一换 结束

//第二模块  weibQQ开始
//jsonp
function jsonp(json){
	json=json || {};
	if(!json.url)return;
	json.data=json.data || {};
	json.cbName=json.cbName || 'cb';
	
	
	var fnName='show'+Math.random();
	fnName=fnName.replace('.','');
	window[fnName]=function(data){
		json.success && json.success(data);
		
		//删除
		oHead.removeChild(oS);

	}
	
	json.data[json.cbName]=fnName;
	
	var arr=[];
	for(var name in json.data){
		arr.push(name+'='+json.data[name]);
	}
	
	
	var oS=document.createElement('script');
	oS.src=json.url+'?'+arr.join('&');
	var oHead=document.getElementsByTagName('head')[0];
	oHead.appendChild(oS);
	
}

(function(window){
	window.webQq=function(){
		var oLoginBox=document.getElementById('login');
		var oLogin=document.getElementById('loginList');
		var oUserName=oLogin.getElementsByTagName('input')[0];
		var oPassWord=oLogin.getElementsByTagName('input')[1];
		var oBtn1=oLogin.getElementsByTagName('input')[2];
		var oBtn2=oLogin.getElementsByTagName('input')[3];
		var oBox=document.getElementById('chatBox');
		var oNext=document.getElementById('next');
		var oPrev=document.getElementById('prev');
		var oImg=document.getElementById('img');
		var oImgBox=document.getElementById('iMgBox');
		var oChatHead=document.getElementById('chatHead');
		var oRightS=document.getElementById('rightScroll');
		var oUl=document.getElementById('list');
		var oSpan=document.getElementById('rightScrollSpan');
		var oLeft=document.getElementById('chatLeft');
		var oRight=document.getElementById('chatRight');
		var oChatList=document.getElementById('chatList');
		var oChatH=document.getElementById('chatHistory');
		var oLeftS=document.getElementById('chatScroll');
		var oSpan2=oLeftS.children[0];
		var oTxt=document.getElementById('inputTxt');
		var oBtn=document.getElementById('send');
		var oClose=document.getElementById('close');
		var oOnline=document.getElementById('online');
		var URL='http://zhinengshe.com/exercise/im/api.php';
		var iNow=1;
		var maxId=0;
		var timer=null;
		oUserName.onfocus=function(){
			oUserName.value='';	
		};
		oPassWord.onfocus=function(){
			oPassWord.value='';	
		};
		oNext.onclick=function(){
			iNow++;
			if(iNow==4){
				iNow=1;
			}
			oImg.src='imges/face/'+iNow+'.jpg';
		};
		oPrev.onclick=function(){
			iNow--;
			if(iNow==0){
				iNow=3;
			}
			oImg.src='imges/face/'+iNow+'.jpg';
		};
		oImgBox.onmouseover=function(ev){
			var oEvent=ev||event;
			var oFrom=oEvent.fromElement||oEvent.relatedTarget;
			oNext.style.display='block';
			oPrev.style.display='block';
			if(oImgBox.contains(oFrom))return;	
		}
		oImgBox.onmouseout=function(ev){
			var oEvent=ev||event;
			var oTo=oEvent.toElement||oEvent.relatedTarget;
			oNext.style.display='none';
			oPrev.style.display='none';	
			if(oImgBox.contains(oTo))return;		
		};
		drag(oImgBox);
		//注册
		oBtn1.onclick=function(){
			jsonp({
				url:URL,
				data:{
					a:'reg',
					user:oUserName.value,
					pass:oPassWord.value,
					face:iNow
				},
				success:function(data){
					if(data.err){
						alert(data.msg);
					}else{
						alert('注册成功');;	
					}
				}
			})	
		};
		//登录
		oBtn2.onclick=function(){
			jsonp({
				url:URL,
				data:{
					a:'lgn',
					user:oUserName.value,
					pass:oPassWord.value,
				},
				success:function(data){
					if(data.err){
						alert('登录失败');
					}else{	
						alert(data.msg);
						oLoginBox.style.display='none';
						oBox.style.display='block';	
						document.body.style.background='url()';
						drag(oChatHead);
						getList(data.token);
						objMove(oSpan,oUl);
						getMsg(data.token);
						objMove(oSpan2,oChatList);
						oBtn.onclick=function(){
							sendMsg(data.token);
						};
						oTxt.onkeydown=function(ev){
							var oEvent=ev||event;
							if(oEvent.keyCode==13){
								sendMsg(data.token);
							}	
						}
						
						timer=setInterval(function(){
							getNewMsg(data.token)	
						},1000);
						getout(data.token);
							//用户列表隐藏显示
							var bOk=true;
							var oWidth=	oRight.offsetWidth;
							oOnline.onclick=function(){
								if(bOk){
									oRight.style.width=0;
									oLeft.style.width=oLeft.offsetWidth+oWidth+'px';			
								}else{
									oRight.style.width=oWidth+'px';
									oLeft.style.width=oLeft.offsetWidth-oWidth+'px';	
								}
								bOk=!bOk;
							};
					}		
				}
			})	
		};
		//聊天窗口/登录框拖动
		function drag(obj){
			obj.onmousedown=function(ev){
				var oEvent=ev||event;
				var disX=oEvent.clientX-obj.parentNode.offsetLeft-obj.parentNode.offsetWidth/2;
				var disY=oEvent.clientY-obj.parentNode.offsetTop-obj.parentNode.offsetHeight/2;
				document.onmousemove=function(ev){
					var oEvent=ev||event;
					var l=oEvent.clientX-disX;
					var t=oEvent.clientY-disY;
					if(l<obj.parentNode.offsetWidth/2){
						l=obj.parentNode.offsetWidth/2;
					}
					if(l>obj.parentNode.parentNode.offsetWidth-obj.parentNode.offsetWidth/2-8){
						l=obj.parentNode.parentNode.offsetWidth-obj.parentNode.offsetWidth/2-8;
						
					}
					if(t<obj.parentNode.offsetHeight/2){
						t=obj.parentNode.offsetHeight/2;
					}
					if(t>obj.parentNode.parentNode.offsetHeight-obj.parentNode.offsetHeight/2-8){
						t=obj.parentNode.parentNode.offsetHeight-obj.parentNode.offsetHeight/2-8;
						
					}
					obj.parentNode.style.left=l+'px';
					obj.parentNode.style.top=t+'px';
				};
				document.onmouseup=function(){
					document.onmousemove=null;
					document.onmouseup=null;
					obj.releaseCapture&&obj.releaseCapture();	
				};
				obj.setCapture&&obj.setCapture();
				return false;
			};		
		}
	
		//获取用户列表
		function getList(token){
			jsonp({
				url:URL,
				data:{
					a:'get_user_list',
					token:token	
				},	
				success:function(json){
					if(json.err){
						alert('获取用户列表失败');
					}else{
						var arr=json.data;
						for(var i=0;i<arr.length;i++){
							var oLi=document.createElement('li');
							var face=arr[i].face;
							if(face==0){
								face=1;	
							}
							oLi.innerHTML='<img src="imges/face/'+face+'.jpg"><span>'+arr[i].username+'</span>';
							oUl.appendChild(oLi);
							if(arr[i].ID>maxId){
								maxId=arr[i].ID;
							}
						}	
						oRight.style.overflow='hidden';
					}
				}
			});
		}
		//用户列表拖动
		function objMove(obj,oUl){
			obj.onmousedown=function(ev){
				var oEvent=ev||event;
				var disY=oEvent.clientY-obj.offsetTop;
				document.onmousemove=function(ev){
					var oEvent=ev||event;
					var t=oEvent.clientY-disY;
					if(t<0){
						t=0;
					}else if(t>obj.parentNode.offsetHeight-obj.offsetHeight){
						t=obj.parentNode.offsetHeight-obj.offsetHeight;
					}
					obj.style.top=t+'px';
					var scale=t/(obj.parentNode.offsetHeight-obj.offsetHeight);
					oUl.style.top=-(oUl.offsetHeight-oUl.parentNode.offsetHeight)*scale+'px';
				};
				document.onmouseup=function(){
					document.onmousemove=null;
					document.onmouseup=null;
					obj.releaseCapture&&obj.releaseCapture();	
				};
				obj.setCapture&&obj.setCapture();
				return false;
			};		
		}
		//获取聊天记录
		function getMsg(token){
			jsonp({
				url:URL,
				data:{
					a:'get_msg',
					token:token	
				},
				success:function(json){
					if(json.err){
						alert('获取消息失败')
					}else{
						var arr=json.data;
						for(var i=0;i<arr.length;i++){
							var oLi=createMsg(arr[i].post_time,arr[i].username,arr[i].content);
							oChatList.appendChild(oLi);
							if(arr[i].ID>maxId){
								maxId=arr[i].ID;
							}
						}
						oChatH.style.overflow='hidden';	
						oChatList.style.top=-(oChatList.offsetHeight-oChatH.offsetHeight)+'px';
						oSpan2.style.top=oSpan2.parentNode.offsetHeight-oSpan2.offsetHeight+'px';
						
					}
				}
			});	
		}
		function toDou(num){
			return 	num<10?'0'+num:''+num;
		}
		function createMsg(time,username,content){
			var oDate=new Date();
			oDate.setTime(time*1000)
			var sDate=oDate.getFullYear()+'-'+toDou((oDate.getMonth()+1))+'-'+toDou(oDate.getDate())+' '+toDou(oDate.getHours())+':'+toDou(oDate.getMinutes())+':'+toDou(oDate.getSeconds());
			var oLi=document.createElement('li');
			oLi.innerHTML='<span class="username" style="font-weight:bolder;">'+username+'</span>\
							<span class="time">'+sDate+'</span><br/>\
							<span class="content">'+content+'</span>'
			return oLi;
		}
		//发送消息
		//oBtn.onclick
		function sendMsg(token){
			jsonp({
				url:URL,
				data:{
					a:'snd_msg',
					content:oTxt.value,
					token:token,	
				},
				success:function(json){
					if(json.err){
						alert('发言失败');	
					}else{
						var oLi=createMsg(json.time,oUserName.value,oTxt.value);
						oChatList.appendChild(oLi);
						oTxt.value='';		
						oChatList.style.top=-(oChatList.offsetHeight-oChatH.offsetHeight)+'px';
						oSpan2.style.top=oSpan2.parentNode.offsetHeight-oSpan2.offsetHeight+'px';
						if(json.ID>maxId){
							maxId=json.ID
						}
					}
				}
			});					
		}
		//更新消息
		function getNewMsg(token){
			jsonp({
				url:URL,
				data:{
					a:'get_msg_n',
					n:maxId,
					token:token	
				},
				success:function(json){
					if(json.err){
						alert('获取更新信息失败')	
					}else{
						var arr=json.data;
						for(var i=0;i<arr.length;i++){
							var oLi=createMsg(arr[i].post_time,arr[i].username,arr[i].content);
							oChatList.appendChild(oLi);	
							oChatList.style.top=-(oChatList.offsetHeight-oChatH.offsetHeight)+'px';
							oSpan2.style.top=oSpan2.parentNode.offsetHeight-oSpan2.offsetHeight+'px';
							if(arr[i].ID>maxId){
								maxId=arr[i].ID
							}							
						}
	
					}
				}
				
			});	
		}
		//退出登录
		function getout(token){
			oClose.onclick=function(){
				jsonp({
					url:URL,
					data:{
						a:'logout',
						token:token	
					},
					success:function(json){
						if(json.err){
							alert('退出失败');	
						}else{
							alert(json.msg);
						oLoginBox.style.display='block';
						oBox.style.display='none';	
						document.body.style.background='url(imges/bg3.jpg) no-repeat';
						clearInterval(timer);
						oUserName.value='';
						oPassWord.value='';
						}
					}
				});	
			};
		}
	
	}
})(window);
// webQQ结束
//碰撞运动
function ball(id){
	var oDiv=document.getElementById(id);
	oDiv.zIndex=100;
	var iSpeedX=0;
	var iSpeedY=0;
	
	var lastX=0;
	var lastY=0;
	
	var timer=null;
	
	oDiv.onmousedown=function(ev){
		var oEvent=ev || event;
		
		var disX=oEvent.clientX-oDiv.offsetLeft;
		var disY=oEvent.clientY-oDiv.offsetTop;
		
		document.onmousemove=function(ev){
			var oEvent=ev || event;
			
			oDiv.style.left=oEvent.clientX-disX+'px';
			oDiv.style.top=oEvent.clientY-disY+'px';
			
			iSpeedX=oEvent.clientX-lastX;
			iSpeedY=oEvent.clientY-lastY;
			
			lastX=oEvent.clientX;
			lastY=oEvent.clientY;
			
		}
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;	
			oDiv.releaseCapture && oDiv.releaseCapture();
			
			duangMove();
		}
		oDiv.setCapture && oDiv.setCapture();
		return false;	
	}
	
	function duangMove(){
		clearInterval(timer);
		timer=setInterval(function(){
			iSpeedY+=3;
			var i=0.8;
			var l=oDiv.offsetLeft+iSpeedX;
			var t=oDiv.offsetTop+iSpeedY;
			if(t>=oDiv.parentNode.offsetHeight-oDiv.offsetHeight){
				t=oDiv.parentNode.offsetHeight-oDiv.offsetHeight;
				iSpeedY*=-i;
				iSpeedX*=i;
			}
			if(t<=0){
				t=0;
				iSpeedY*=-i;
				iSpeedX*=i;	
			}
			if(l>=oDiv.parentNode.offsetWidth-oDiv.offsetWidth){
				l=oDiv.parentNode.offsetWidth-oDiv.offsetWidth;
				iSpeedX*=-i;
				iSpeedY*=-i;
			}
			
			if(l<=0){
				l=0;
				iSpeedX*=-0.95;
				iSpeedY*=-0.95;
			}
			
			oDiv.style.left=l+'px';
			oDiv.style.top=t+'px';
			
			if(Math.abs(iSpeedX)<1){
				iSpeedX=0;	
			}
			if(Math.abs(iSpeedY)<1){
				iSpeedY=0;
			}
			
			if(iSpeedX==0 && iSpeedY==0 && t==oDiv.parentNode.offsetHeight-oDiv.offsetHeight){
				clearInterval(timer);
			}
		},30);	
	}
}
//补零函数
	function toDou(iNum){
		return iNum<10?'0'+iNum:''+iNum;	
	}
//时钟函数
