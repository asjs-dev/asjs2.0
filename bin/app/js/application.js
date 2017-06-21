(function(){var Config={};c1(Config,ASJS.AbstractModel);var JSONLoader=c0(ASJS.Loader,null,function(v0){v0.new=function(){v0.responseType="json";}});var DataProxy={};c1(DataProxy,ASJS.BaseClass,null,function(v2){v2.loadJSON=function(v0){var v1=new ASJS.Promise();var v3=new JSONLoader();v3.method=ASJS.RequestMethod.GET;v3.addEventListener(ASJS.LoaderEvent.LOAD,function(e){v1.resolve(v3.content);v3.unload();});v3.addEventListener(ASJS.LoaderEvent.ERROR,function(e){v1.reject(v3.content);v3.unload();});v3.load(v0);return v1;}});var ConfigLoaderCommand=c0(ASJS.AbstractCommand,null,function(v0){var v1=Config.instance();var v4=DataProxy.instance();v0.execute=function(){var v2=v4.loadJSON("json/config.json");v2.done(function(v3){v1.data=v3;});return v2;}});var Language={};c1(Language,ASJS.AbstractModel,null,function(v1,v2){prop(v1,"supportedLanguages",{get:function(){return v2.data.supportedLanguages;}});prop(v1,"selectedLanguage",{get:function(){return v2.data.selectedLanguage;}});v1.getText=function(k){var i=v1.get("elements")[k];return i!=null&&i[v1.selectedLanguage]!=undefined?i[v1.selectedLanguage]:"";};v1.genText=function(v0){for(var k in v1.data)v0=v0.split("{{"+k+"}}").join(v1.getText(k));return v0;}});var LanguageLoaderCommand=c0(ASJS.AbstractCommand,null,function(v0){var v3=Language.instance();var v4=DataProxy.instance();v0.execute=function(){var v1=v4.loadJSON("json/language.json");v1.done(function(v2){v3.data=v2;});return v1;}});var Tools={};roFunc(Tools,"replaceText",function(s,o){var r=/{{.*?}}/g;var rt=s;var m;while((m=r.exec(s))!==null){if(m.index===r.lastIndex)r.lastIndex++;var e=m[0].split("{{").join("").split("}}").join("");var c=Tools.ref(o,e);rt=rt.replace(m[0],c!=null?c:m[0]);};return rt;});roFunc(Tools,"ref",function(o,s){return s.split(".").reduce(function(o,x){return o[x];},o);});roFunc(Tools,"isValidEmailAddress",function(v2){var re=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return re.test(v2);});roFunc(Tools,"getURLParams",function(param){var v0=decodeURIComponent(ASJS.Window.instance().location.href).split("#");if(v0[1]==''||v0[1]==undefined)return[];var v3=v0[1].split('&');var i=-1;var l=v3.length;var v5={};while(++i<l){var v1=v3[i].split('=');v5[v1[0]]=v1[1];};return v5[param];});roFunc(Tools,"createUrlParams",function(v3,reload){var v0="";for(var k in v3){if(v0!="")v0+="&";v0+=k+"="+v3[k];};var v4=ASJS.Window.instance();v4.location.href=v4.location.href.split(v4.location.hash).join("")+"#"+v0;if(reload)Tools.reload();});roFunc(Tools,"reload",function(){ASJS.Window.instance().location.reload(true);});var Cookies={};c1(Cookies,ASJS.BaseClass,null,function(v1){v1.createCookie=function(n,v,d){if(d){var v0=new Date();v0.setTime(v0.getTime()+(d*86400000));var v3="; expires="+v0.toGMTString();}else var v3="";document.cookie=n+"="+v+v3+"; path=/";try{if(typeof(Storage)!=="undefined")localStorage.setItem(n,v);}catch(e){trc(e);}};v1.readCookie=function(n){var v2=n+"=";var ca=document.cookie.split(';');var i=-1;var l=ca.length;while(++i<l){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(v2)==0)return c.substring(v2.length,c.length);};try{if(typeof(Storage)!=="undefined")return localStorage.getItem(n);}catch(e){trc(e);};return null;};v1.eraseCookie=function(n){v1.createCookie(n,"",-1);try{if(typeof(Storage)!=="undefined")localStorage.removeItem(n);}catch(e){trc(e);}}});var EnvironmentCommand=c0(ASJS.AbstractCommand,null,function(v0){var v1=ASJS.Window.instance();var v5=Language.instance();var v4=Cookies.instance();var v2=ASJS.Cycler.instance();var v3=Config.instance();var v11;v0.execute=function(){v9();v8();v7();};function v9(){function v12(sl){return sl==undefined||v5.supportedLanguages.indexOf(sl)==-1;};var v13=Tools.getURLParams('lang');if(v12(v13))v13=v4.readCookie('language');if(v12(v13))v13=v5.selectedLanguage;v5.set("selectedLanguage",v13);v4.createCookie('language',v5.selectedLanguage);stage.title=v5.getText("title");};function v8(){v2.fps=v3.get("fps");v2.start();};function v7(){stage.addEventListener(ASJS.Stage.RESIZE,v10);};function v10(){v11=v1.clearTimeout(v11);v11=v1.setTimeout(v6,v3.get("resizeInterval"));};function v6(){v11=v1.clearTimeout(v11);v0.sendNotification(ASJS.Stage.RESIZE);}});var AbstractResizeMediator=c0(ASJS.AbstractMediator,null,function(v3,v4,v5){v5.handlers=[ASJS.Stage.RESIZE];v5.forceResize=true;v3.reciveNotification=function(v0,v1){switch(v0){case ASJS.Stage.RESIZE:v5.onResize();break;}};v5.showView=function(){if(v5.forceResize)v5.onResize();};v5.onResize=function(){v5.forceResize=true;var v2=v5.view.getChildAt(0);if(v2==null)return;v2.render();v5.forceResize=false;}});var AbstractView=c0(ASJS.Sprite,null,function(v0,v1,v3){var v5={alpha:0};var v2=new ASJS.Easing();v0.new=function(){v0.addEventListener(ASJS.Stage.ADDED_TO_STAGE,v4);};v3.animateTo=function(to,v6){v5={alpha:v0.alpha};v2.stop();v2.play(v5,{alpha:to},1000,"easeInOutExpo",function(){v0.alpha=v5.alpha;},v6);};function v4(){v0.alpha=0;v3.animateTo(1);}});var Box=c0(ASJS.Sprite,null,function(v0){var v3=Language.instance();var v1=new ASJS.Label();var v2=new ASJS.Button();v0.new=function(){v0.addClass("box");v1.text=v3.getText("new_asjs_base_site");v1.addClass("label");v0.addChild(v1);v2.label=v3.getText("show_notification_window");v2.addClass("button");v2.addEventListener(ASJS.MouseEvent.CLICK,v4);v0.addChild(v2);};prop(v0,"label",{get:function(){return v1;}});v0.render=function(){v1.setSize(320,30);v1.move(0,34);v2.setSize(320,40);v2.move(0,v0.height-v2.height);};function v4(){v0.dispatchEvent(ContentMediator.ON_SHOW_NOTIFICATION_WINDOW);}});var ContentView=c0(AbstractView,null,function(v4){var v2={};cnst(v2,"ANIMATION_EXPLODE_ID","animationExplode");cnst(v2,"ANIMATION_FIREWORKS_ID","animationFireworks");var v7=Language.instance();var v5=ASJS.Mouse.instance();var v9=new ASJS.Sprite();var v1=new Box();var v20=new ASJS.Button();var v13=new ASJS.AnimatedSprite();var v3=false;var v10=new ASJS.BlurFilter();v4.new=function(){v4.addClass("content-view");v4.addEventListener(ASJS.Stage.ADDED_TO_STAGE,v11);v4.addEventListener(ASJS.Stage.REMOVED_FROM_STAGE,v14);};v4.render=function(){v9.setSize(stage.stageWidth,stage.stageHeight);v1.x=(stage.stageWidth-v1.width)*0.5;v20.move(v1.x,v1.y+v1.height+20);};v4.init=function(v0){v9.addClass("background");v9.setCSS("position","fixed");v9.alpha=0.5;v4.addChild(v9);v1.setSize(320,130);v1.y=100;v1.render();v4.addChild(v1);v13.addAnimationDescriptorList(v0);v13.move(10,10);v4.addChild(v13);v13.addEventListener(ASJS.MouseEvent.CLICK,v17);v13.addEventListener(ASJS.MouseEvent.MOUSE_DOWN+" "+ASJS.MouseEvent.TOUCH_START,v19);v20.label=v7.getText("show_external_application_button_label");v20.addClass("show-external-application-button");v20.setSize(320,40);v20.addEventListener(ASJS.MouseEvent.CLICK,v21);v4.addChild(v20);v4.render();};function v11(){stage.addEventListener(ASJS.MouseEvent.MOUSE_UP+" "+ASJS.MouseEvent.TOUCH_END,v8);stage.addEventListener(ASJS.MouseEvent.MOUSE_LEAVE,v8);stage.addEventListener(ASJS.MouseEvent.MOUSE_MOVE+" "+ASJS.MouseEvent.TOUCH_MOVE,v15);v4.addEventListener(ASJS.MouseEvent.CLICK,v12);v18();};function v14(){stage.removeEventListener(ASJS.MouseEvent.MOUSE_UP+" "+ASJS.MouseEvent.TOUCH_END,v8);stage.removeEventListener(ASJS.MouseEvent.MOUSE_LEAVE,v8);stage.removeEventListener(ASJS.MouseEvent.MOUSE_MOVE+" "+ASJS.MouseEvent.TOUCH_MOVE,v15);v4.removeEventListener(ASJS.MouseEvent.CLICK,v12);v13.stop();};function v16(){if(!v13)return;v13.setSize(256,128);v13.play(v2.ANIMATION_EXPLODE_ID,ASJS.AnimatedSprite.PLAY_REVERSE);};function v18(){if(!v13)return;v13.setSize(200,200);v13.play(v2.ANIMATION_FIREWORKS_ID);};function v17(){if(v13.selectedAnimation==v2.ANIMATION_FIREWORKS_ID)v16();else v18();};function v19(){v3=true;};function v8(){v3=false;};function v15(){v10.value=(Math.max(0,stage.stageHeight/(stage.stageHeight-v5.mouseY))/10);v4.filters=[v10];if(!v3)return;v13.move(v5.mouseX-v13.width*0.5,v5.mouseY-v13.height*0.5);};function v12(){var v6=v1.hitTest(new ASJS.Point(v5.mouseX,v5.mouseY));v1.label.text=v7.getText(v6?"hit_test_inside":"hit_test_outside");};function v21(){v4.dispatchEvent(ContentMediator.ON_SHOW_EXTERNAL_APPLICATION);}});var NotificationWindowView=c0(AbstractView,null,function(v0,v1,v7){var v13={};var v4=new ASJS.Scale9Grid();var v2=new ASJS.Sprite();var v5=new ASJS.Sprite();var v6=new ASJS.Button();var v9=new ASJS.Button();v0.new=function(){v0.addClass("notification-window-view");v0.setCSS("position","fixed");v4.size=new ASJS.Point(30,80);v4.rect=new ASJS.Rectangle(13,60,4,7);v4.backgroundImage="images/window.png";v0.addChild(v4);v2.height=50;v2.setCSS("line-height",v2.height+"px");v2.addClass("title-label");v0.addChild(v2);v5.addClass("content-label");v0.addChild(v5);v6.addEventListener(ASJS.MouseEvent.CLICK,function(){v0.hideWindow();if(v13['okCallback']!=undefined)v13['okCallback']();});v11(v6);v9.addEventListener(ASJS.MouseEvent.CLICK,function(){v0.hideWindow();if(v13['cancelCallback']!=undefined)v13['cancelCallback']();});v11(v9);};v0.hideWindow=function(){v7.animateTo(0,function(){v0.dispatchEvent(NotificationWindowMediator.HIDE);v2.html="";v5.html="";if(v8())v0.removeChild(v6);v6.label="";if(v10())v0.removeChild(v9);v9.label="";});};v0.showWindow=function(v12){v13=v12;v2.html=v13.title;v5.html=v13.content;if(v13['showOk']){v6.label=v13['okLabel'];if(!v8())v0.addChild(v6);}else if(v8())v0.removeChild(v6);if(v13['showCancel']){v9.label=v13['cancelLabel'];if(!v10())v0.addChild(v9);}else if(v10())v0.removeChild(v9);};v0.render=function(){v0.setSize(stage.stageWidth,stage.stageHeight);v4.setSize(Math.max(150,Math.min(stage.stageWidth,v13.width)),Math.max(150,Math.min(stage.stageHeight,v13.height)));v4.move((stage.stageWidth-v4.width)*0.5,Math.max(0,(stage.stageHeight-v4.height)*0.5));v4.render();v2.move(v4.x+25,v4.y+10);v2.width=v4.width-50;v5.move(v2.x,v2.y+v2.height+25);v5.setSize(v2.width,v4.height-v2.height-55-(v8()||v10()?60:0));if(v5.render)v5.render();v6.width=v4.width*0.5-20;if(v8()){v6.x=v4.x+(v10()?v4.width*0.5-10-v6.width:((v4.width-v6.width)*0.5));v6.y=v4.y+v4.height-v6.height-30;};v9.width=v6.width;if(v10()){v9.x=v4.x+(v8()?v4.width*0.5+10:((v4.width-v9.width)*0.5));v9.y=v4.y+v4.height-v9.height-30;}};function v8(){return v0.contains(v6);};function v10(){return v0.contains(v9);};function v11(v3){v3.addClass("button");v3.height=42;}});var NotificationWindowDataVo=c0(ASJS.BaseClass,null,function(v0){v0.new=function(){v0.title="";v0.content="";v0.showOk=true;v0.showCancel=false;v0.okCallback=null;v0.cancelCallback=null;v0.okLabel=null;v0.cancelLabel=null;v0.width=500;v0.height=200;}});var NotificationWindowMediator=c0(AbstractResizeMediator,null,function(v5,v6,v10){v10.handlers.push(NotificationWindowMediator.SHOW);var v8=Language.instance();var v4=[];var v7=false;var v12="";var v14="";var v15=new NotificationWindowView();v5.new=function(){v15.addEventListener(NotificationWindowMediator.HIDE,v3);v12=v8.getText('notification_ok_button');v14=v8.getText('notification_cancel_button');};v5.reciveNotification=function(v0,v1){v6.reciveNotification(v0,v1);switch(v0){case NotificationWindowMediator.SHOW:v2(v1);break;}};function v2(v1){if(v1==undefined)v1=new NotificationDataVo();if(!v1.okLabel)v1.okLabel=v12;if(!v1.cancelLabel)v1.cancelLabel=v14;v4.push(v1);if(!v7)v11();};function v3(){if(v4.length>0)v11();else v9();};function v9(){v10.view.removeChild(v15);v7=false;};function v11(){var v13=v4[0];v4.shift();v7=true;v15.showWindow(v13);if(!v10.view.contains(v15))v10.view.addChild(v15);v10.showView();}});msg(NotificationWindowMediator,"SHOW","show");msg(NotificationWindowMediator,"HIDE","hide");var ExternalApplicationView=c0(AbstractView,null,function(v1){var v0={};var v4=Language.instance();var v2=ASJS.Mouse.instance();var v5=new ASJS.Sprite();var v3=new ASJS.Label();var v6=new ASJS.Button();var v9;v1.new=function(){v1.addClass("external-application-view");v1.setCSS("position","fixed");v5.addClass("container");v1.addChild(v5);v3.addClass("title-label");v5.addChild(v3);v6.addClass("close-button");v6.addEventListener(ASJS.MouseEvent.CLICK,v7);v5.addChild(v6);};prop(v1,"title",{set:function(v){v3.text=v;}});v1.render=function(){v1.setSize(stage.stageWidth,stage.stageHeight);v5.move(20,20);v5.setSize(v1.width-v5.x*2,v1.height-v5.y*2);v6.setSize(30,30);v6.move(v5.width-v6.width-10,10);v3.move(10,10);v3.setSize(v6.x-v3.x*2,v6.height);if(v9&&v5.contains(v9)){v9.move(10,v6.y*2+v6.height);v9.setSize(v5.width-v9.x*2,v5.height-v9.y-v6.y);}};v1.addExternalApplication=function(v8){v1.removeExternalApplication();v9=v8;v5.addChild(v8);v1.render();};v1.removeExternalApplication=function(){if(!v9)return;v5.removeChild(v9);v9.destruct();v9=null;};function v7(){v1.dispatchEvent(ExternalApplicationMediator.CLOSE);}});var ExternalApplicationMediator=c0(AbstractResizeMediator,null,function(v5,v4,v8){v8.handlers.push(ExternalApplicationMediator.SHOW,ExternalApplicationMediator.HIDE);var v11=new ExternalApplicationView();var v6=new ASJS.ScriptLoader();var v9;v5.new=function(){v11.addEventListener(ExternalApplicationMediator.CLOSE,v7);v6.addEventListener(ASJS.LoaderEvent.LOAD,v13);v6.addEventListener(ASJS.LoaderEvent.PROGRESS,v14);};v5.reciveNotification=function(v1,v0){v4.reciveNotification(v1,v0);switch(v1){case ExternalApplicationMediator.SHOW:v3();break;case ExternalApplicationMediator.HIDE:v2();break;}};function v3(){if(!v8.view.contains(v11))v8.view.addChild(v11);v10();v8.showView();};function v2(){if(v8.view.contains(v11))v8.view.removeChild(v11);v12();};function v7(){v2();};function v10(){v12();v6.load("js/external/application.js");};function v12(){v11.removeExternalApplication();v6.cancel();v6.unload();v9=null;};function v13(e){v9=new v6.content();v9.addEventListener(ASJS.LoaderEvent.LOAD,function(){v11.title=v9.title;});v11.addExternalApplication(v9);v6.unload();};function v14(e){v11.title=((e.detail.loaded/e.detail.total)*100)+"%";}});msg(ExternalApplicationMediator,"SHOW","show");msg(ExternalApplicationMediator,"HIDE","hide");msg(ExternalApplicationMediator,"CLOSE","close");var ContentMediator=c0(AbstractResizeMediator,null,function(v5,v4,v8){v8.handlers.push(ContentMediator.SHOW);var v7=DataProxy.instance();var v6=Language.instance();var v9=new ContentView();v5.new=function(){v9.addEventListener(ContentMediator.ON_SHOW_NOTIFICATION_WINDOW,v12);v9.addEventListener(ContentMediator.ON_SHOW_EXTERNAL_APPLICATION,v14);};v5.reciveNotification=function(v1,v0){v4.reciveNotification(v1,v0);switch(v1){case ContentMediator.SHOW:v3();break;}};function v10(v0){var v11=new ASJS.AnimationParser();var v13=v11.parse(v0);v9.init(v13);if(!v8.view.contains(v9))v8.view.addChild(v9);};function v3(){v7.loadJSON("json/animation/contentAnimation.json").done(v10);v8.showView();};function v2(){if(v8.view.contains(v9))v8.view.removeChild(v9);};function v12(){var v15=new NotificationWindowDataVo();v15.title=v6.getText("notification_title");v15.content=v6.getText("notification_content");v15.height=230;v5.sendNotification(NotificationWindowMediator.SHOW,v15);};function v14(){v5.sendNotification(ExternalApplicationMediator.SHOW);}});msg(ContentMediator,"SHOW","show");msg(ContentMediator,"ON_SHOW_EXTERNAL_APPLICATION","onShowExternalApplication");msg(ContentMediator,"ON_SHOW_NOTIFICATION_WINDOW","onShowNotificationWindow");var ViewPrepCommand=c0(ASJS.AbstractCommand,null,function(v1){v1.execute=function(v0){new ContentMediator(v0.contentView);new ExternalApplicationMediator(v0.externalApplicationView);new NotificationWindowMediator(v0.notificationWindowView);}});var StartupCommand=c0(ASJS.AbstractCommand,null,function(v2){var v1;v2.execute=function(v0){v1=v0;v3();};function v3(){(new ConfigLoaderCommand()).execute().done(v4);};function v4(){(new LanguageLoaderCommand()).execute().done(v5);};function v5(){(new EnvironmentCommand()).execute();(new ViewPrepCommand()).execute(v1);v2.sendNotification(ContentMediator.SHOW);}});var Application=c0(ASJS.BaseClass,null,function(v0){var v1=new ASJS.Sprite();var v3=new ASJS.Sprite();var v2=new ASJS.Sprite();v0.new=function(){trc("<AS/JS> Application 2.17.06.21");stage.addChild(v0.contentView);stage.addChild(v0.externalApplicationView);stage.addChild(v0.notificationWindowView);(new StartupCommand()).execute(v0);};prop(v0,"contentView",{get:function(){return v1;}});prop(v0,"externalApplicationView",{get:function(){return v3;}});prop(v0,"notificationWindowView",{get:function(){return v2;}});});ASJS.start(Application);})();