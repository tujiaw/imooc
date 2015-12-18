/**
 * Created by jiawei.tu on 12/17 0017.
 */

$(function() {
    function escape2Html(str) {
        var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
        return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
    }

    window.onload=function () {
        var content = $('#tempPostContent').html();
        content = escape2Html(content)
        var ele = document.getElementById("postContent");
        ele.innerHTML = content;
    }
});
