/* 
* @Author: bellchet58
* @Date:   2016-07-31 19:45:38
* @Last Modified by:   anchen
* @Last Modified time: 2016-08-01 22:08:20
*/
//将tweet添加到列表中
var appendToTweetGroups = (tweet)=>{
            var content = tweet.text;
            var time = tweet.time;
            var newTweetGroup = "<div class='tweet-group'>"
            + "<time datetime='"+new Date(time).toLocaleString()+"'>"+new Date(time).toLocaleString() + "</time>"
            + "<p class='tweet-content'>"+ content +"</p></div>";
            $('#tweets').prepend(newTweetGroup);
}

$(document).ready(function(){
    //初始化评论列表
    $.ajax({
        url: '/ajax',
        type: 'GET'
    })
    .done((msg)=>{
        for(var tweet of msg.tweets)
        {
            appendToTweetGroups(tweet);
        }
    });
    
    $('.tweet-btn').click(()=>{
        var tweet = $('.tweet-input').val();
        $.ajax({
            url: '/ajax',
            type: 'POST',
            contentType: 'application/json',//necessary!!
            data: JSON.stringify({tweet: tweet}),// JSON.stringify necessary!!
        })
        .done((msg)=>{
            console.log(msg);
            var tweet = {text:msg.text, time: msg.time};
            appendToTweetGroups(tweet);
            $('.tweet-input').val('');
        });
        
    });
});