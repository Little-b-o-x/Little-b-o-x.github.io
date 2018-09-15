;(function () {

  var app = new Vue({
    el : "#app",
    data : {
      editing : -1,
      attackid : [
        {
          name : "设置Sans的汗水",
          id : "SansTired",
          selecting : true,
        },
        {
          name : "设置Sans的身体",
          id : "SansBody"
        },
        {
          name : "设置Sans动态",
          id : "SansAnimation"
        },
        {
          name : "设置Sans的头",
          id : "SansHead"
        },
        {
          name : "龙骨炮",
          id : "GasterBlaster"
        },
        {
          name : "Sans文字",
          id : "SansText"
        },
        {
          name : "设置战斗框",
          id : "CombatZoneResizeInstant"
        },
        {
          name : "传送灵魂",
          id : "HeartTeleport"
        },
        {
          name : "设置决心模式",
          id : "HeartMode"
        },
        {
          name : "播放声音",
          id : "Sound"
        },
        {
          name : "获取决心位置",
          id : "GetHeartPos"
        },
        {
          name : "切换黑屏",
          id : "BlackScreen"
        },
        {
          name : "Sans摔决心",
          id : "SansSlam"
        },
        {
          name : "骨刺",
          id : "BoneStab"
        },
        {
          name : "骨头 - 竖",
          id : "BoneVRepeat"
        },
        {
          name : "设置摔决心的决心掉落速度",
          id : "HeartMaxFallSpeed"
        },
        {
          name : "蓝色骨头 - 竖",
          id : "BoneV"
        },
        {
          name : "平台",
          id : "Platform"
        },
        {
          name : "[不知道怎么翻译]",
          id : "SineBones"
        },
        {
          name : "结束攻击",
          id : "EndAttack"
        }
      ],
      attacks : [
        {
          name : "初始化 - 设置战斗框",
          attack : "设置战斗框 // CombatZoneResizeInstant",
          attackid : "CombatZoneResizeInstant",
          sleep : "0.1",
          args : "239,226,404,391",
        },
        {
          name : "初始化 - 传送灵魂",
          attack : "传送灵魂 // HeartTeleport",
          attackid : "HeartTeleport",
          sleep : "0.1",
          args : "320,304",
        },
        {
          name : "初始化 - 设置模式",
          attack : "设置决心模式 // HeartMode",
          attackid : "HeartMode",
          sleep : "0.1",
          args : "0",
        },
        {
          name : "初始化",
          attack : "Sans文字 // SansText",
          attackid : "SansText",
          sleep : "0.1",
          args : "heya. you've been busy . huh?,,,,,,,",
        },
        {
          name : "龙骨",
          attack : "龙骨炮 // GasterBlaster",
          attackid : "GasterBlaster",
          sleep : "0.1",
          args : "2,0,10,189,246,0,2,3",
        },
        {
          name : "初始化",
          attack : "Sans文字 // SansText",
          attackid : "SansText",
          sleep : "0.1",
          args : "heya. you've been busy . huh?,,,,,,,",
        },
      ],
    },
    methods: {
      del : function(){
        if (event.path[0].tagName == "IMG"){
          var rows = event.path[4].children;
          var it = event.path[3];
        }else {
          var rows = event.path[3].children;
          var it = event.path[2];
        }
        
        var ready;
        for (var i = 0;i < rows.length;i++){
          if (rows[i] == it){
            ready = i;
            break;
          }
        };
        console.log(ready);
        this.attacks.splice(ready,1);
      },
      add : function () {
        if (event.path[0].tagName == "IMG"){
          var rows = event.path[4].children;
          var it = event.path[3];
        }else {
          var rows = event.path[3].children;
          var it = event.path[2];
        }
        
        var ready;
        for (var i = 0;i < rows.length;i++){
          if (rows[i] == it){
            ready = i;
            break;
          }
        };
        var name = document.getElementById("name").value;
        var sleep = document.getElementById("sleep").value;
        var args = document.getElementById("args").value;
        var attack;
        var attackid;
        var options = document.getElementById("attack").getElementsByTagName("OPTION");
        for (var i = 0;i < options.length;i++){
          if (options[i].selected == true){
            attack = options[i].textContent;
            attackid = options[i].value;
            for (var x = 0;x < this.attackid.length;x++){
              Vue.set(this.attackid,x,{
                name : this.attackid[x].name,
                id : this.attackid[x].id,
                selecting : false,
              });
            }
            Vue.set(this.attackid,i,{
              name : this.attackid[i].name,
              id : this.attackid[i].id,
              selecting : true,
            });
            break;
          }
        }
        var obj = {
          name : name,
          sleep : sleep,
          attack : attack,
          attackid : attackid,
          args : args
        };
        this.attacks.splice(ready + 1,0,obj);
      },
      output : function() {
        var blob = new Blob([JSON.stringify(app.attacks)], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "CustomSansFight.csfcf");
      },
      create : function() {
        var line = '';
        for (var i = 0;i < this.attacks.length;i++){
          if (i != 0){
            line += "\n";
          }
          var attack = this.attacks[i];
          var line;
          line += attack.sleep;
          line += ",";
          line += attack.attackid;
          line += ",";
          line += attack.args;
        }
        var blob = new Blob([line], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "CustomSansFight.csv");
      },
      edit : function(){ //TODO::Fix It
        
        var target = event.target || event.srcElement;
        if (target.tagName == "IMG"){
          target = target.parentNode;
        };
        var attackname = target.parentNode.parentNode.children[2].innerText;
        
        var finded = 0;
        for (var i = 0;i < this.attackid.length;i++){
          var item = this.attackid[i];
          if ((item.name + " // " + item.id) == attackname){
            finded = i;
          }
        }
        this.editing = $(".result tbody tr").index(target.parentNode.parentNode);
        
        for (var i = 0;i < this.attackid.length;i++){
          Vue.set(this.attackid,i,{
            name : this.attackid[i].name,
            id : this.attackid[i].id,
            selecting : false,
          });
        }
        Vue.set(this.attackid,finded,{
          name : this.attackid[finded].name,
          id : this.attackid[finded].id,
          selecting : true,
        });
        var row = target.parentNode.parentNode;
        document.getElementById("name").value = row.children[0].textContent;
        document.getElementById("sleep").value = row.children[1].textContent;
        document.getElementById("args").value = row.children[3].textContent;
      },
      complete : function(){
        if (this.editing >= 0){
          var att = document.getElementById("attack");
          
          // this.attacks[this.editing] = {
          //   name : document.getElementById("name").value,
          //   attack :att.options[att.options.selectedIndex].text,
          //   attackid : att.options[att.options.selectedIndex].value,
          //   sleep : document.getElementById("sleep").value,
          //   args : JSON.parse(document.getElementById("args").value),
          // };
          this.$set(this.attacks,this.editing,{
            name : document.getElementById("name").value,
            attack :att.options[att.options.selectedIndex].text,
            attackid : att.options[att.options.selectedIndex].value,
            sleep : document.getElementById("sleep").value,
            args : document.getElementById("args").value,
          });
          this.editing = -1;
        }
      },
      file : function(){
        var objFile = document.getElementById("inputfile");
        if(objFile.value == "") {
            alert("请选择文件");
            return;
        }
        var files = $("#inputfile")[0].files;
        if (files.length == 0){
          alert("请选择文件")
        }else {
          var reader = new FileReader();
          reader.readAsText(files[0], "UTF-8");
          reader.onload = function(e){
            var str = e.target.result;
            if (str == ""){
              alert("不要上传空文件");
              return;
            }
            app.attacks = JSON.parse(str);
            // var rows = str.split("\n");
            // console.log(rows);
            // for (var i = 0;i < rows.length;i++){
            //   var arg = rows[i].split(",");
            //   var name;

            //   for (var x = 0;x < arg.length;x++){

            //   }
            //   app.attacks.push({
                
            //   });
            // }
          }
        }
      }
    }
  });

  //::Debug
  //app.create();
  
})();