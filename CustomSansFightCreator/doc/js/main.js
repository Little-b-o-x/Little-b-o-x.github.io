(function(){

  var app = new Vue({
    el : ".side-bar",
    data : {
      docs: [
        {
          title : "SansText",
          src : "SansText",
          mddocs : [
            {
              title : "文本",
              src : "SansText/text"
            }
          ],
        },
        {
          title : "GasterBlaster",
          src : "GasterBlaster",
          mddocs : [
            {
              title : "强度",
              src : "GasterBlaster/strong"
            }
          ],
        }
      ],
    },
    methods: {
      clickside : function(){
        var target = event.target || event.srcElement;
        var path = target.getAttribute("src");
        document.getElementById("view").innerHTML = marked(getfile("./docs/" + path + "/doc.md"));
      }
    }
  });


})();