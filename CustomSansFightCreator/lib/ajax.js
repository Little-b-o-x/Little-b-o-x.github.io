function ajax(){
  var d = arguments[0];
  var data = {
    url : d.url || "",
    method : d.method || "get",
    async : d.async || false,
    success : d.success || function(){},
    error : d.error || function(){},
  }
  var req = new XMLHttpRequest();
  req.onreadystatechange = function(){
    if (req.readyState == 4){
      if (req.status == 200){
        data.success(req.responseText);
      }else {
        data.error(req.status)
      }
    }
  }
  req.open(data.method,data.url,data.async);
  req.send();
}
function getfile(src){
  var data = "";
  ajax({
    "url":src,
    "success":function(text){
      data = text;
    }
  })
  return data;
}