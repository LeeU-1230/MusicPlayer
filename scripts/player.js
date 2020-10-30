var music_menu = {
    0: { name: 'Four More Weeks', singer: 'Vans in Japan',times:0 },
    1: { name: 'BeeyornandRaysd', singer: 'Noir Et Blanc Vie',times:0 },
    2: { name: 'Higher Octane', singer: 'Vans in Japan',times:0 },
    3: { name: 'Savannah Sunshine', singer: 'Dan Henig',times:0 },
    4: { name: 'Ponte De Abril', singer: 'Steve Adams',times:0 },
    5: { name: 'Hot Hop Rok', singer: 'Steve Adams',times:0 },
    6: { name: 'A Kiss For Amanda', singer: 'DJ Williams',times:0 },
    7: { name: 'No.9 Esther’s Waltz', singer: 'Esther Abrami',times:0 },
    8: { name: 'Catch Up', singer: 'Dan Lebowitz',times:0 }
   };

var player;
var getVideoid = 0;
var VideiIds = ['4BdmhfQ3teo','4XX3iCOGmjo','0HU_CDYBK_s','T7-FPRKxbWs','BffWNLKg5zY','Ppllbxz-Y8Y','6MdrFuMwhMk','_WsWwMRmQyo','vNs2BPeBjXc']

var play = document.getElementById('play');
var pause = document.getElementById('pause');
var next = document.getElementById('next');
var back = document.getElementById('back');
var run = document.getElementById('run');
var song_list = document.getElementById('song_list');
var sound = document.getElementById('sound');

var music = document.getElementById('music');
var music_name = document.getElementById('music_name');
var music_singer = document.getElementById('music_singer');
var music_menu_btn = document.getElementById('music_menu');


function onYouTubeIframeAPIReady() {

   player = new YT.Player('player', {
       height: '0',
       width: '0',
       events: {
       'onReady': onPlayerReady,
       
       }
   });

}

function onPlayerReady(e) {
   e.target.loadVideoById(VideiIds[getVideoid]);
   
                   
}

/*           function onPlayerStateChange(e){
   console.log(e.target);
}
*/




song_list.addEventListener('click',function(e){  
   e.preventDefault();
   var vue = e.target;
   var Id = vue.parentElement.id

   if (vue.nodeName === 'STRONG'){                    //點擊歌曲列播放
       player.loadVideoById(VideiIds[Id]);
       information(Id);

   }

   if (vue.nodeName === 'I'){                         //點擊愛心加入最愛
       music_menu[Id].times += 1;
       var getTimes =  music_menu[Id].times;


       if((getTimes % 2) !== 0){
         vue.setAttribute('class','fas fa-heart');
       }else if((getTimes % 2) === 0){
         vue.setAttribute('class','far fa-heart');
       }else {
          return;
       }
   }
})

function information(num){           // 在播放欄側邊顯示歌曲資訊
   var songName = music_menu[num];
   music_name.textContent = `${songName.name}`;
   music_singer.textContent = `${songName.singer}`;
}

var menu_list = 0;    //播放清單選項計數

music_menu_btn.addEventListener('click',function(e){
    e.preventDefault();
    menu_list += 1;
    var music_menu_list = document.getElementById('music_menu_list');
    
    if((menu_list % 2) !== 0){
        music_menu_list.style.display = "block";
    }else {
        music_menu_list.style.display = "none";
    }
})

/* ------------------------------------------------------------------------------------------------------*/


play.addEventListener('click', function (e) {         //播放鍵
   player.playVideo();
   console.log(player.getVolume());
})

pause.addEventListener('click', function (e) {        //暫停鍵
   player.pauseVideo();
})

next.addEventListener('click', function (e) {         //下一曲鍵

   if(getVideoid < 8){
   getVideoid ++;
   player.loadVideoById(VideiIds[getVideoid]);
   information(getVideoid);
   

   }else if(getVideoid >= 8){
       getVideoid = 0;
       player.loadVideoById(VideiIds[getVideoid]);
       information(getVideoid);
   }
});

back.addEventListener('click', function(e){          //上一曲鍵

   if(getVideoid <= 8 && getVideoid > 0){
   getVideoid --;
   player.loadVideoById(VideiIds[getVideoid]);
   information(getVideoid);

   }else if(getVideoid <= 0){
       getVideoid = 8;
       
       player.loadVideoById(VideiIds[getVideoid]);
       information(getVideoid);
   }
});

run.addEventListener('click',function(e){           //隨機播放鍵
   var num = Math.floor(Math.random() * 10);

   if(num >= 9){
       num = Math.floor(Math.random() * 10);
   }else if (num < 9){
       player.loadVideoById(VideiIds[num]);
       information(num);
   }
})

sound.addEventListener('change',function(e){         //音控控制滑桿
   e.preventDefault();
   voice = e.target.value;
   console.log(voice);
   player.setVolume(voice);
})