/* 
* @Author: bellchet58
* @Date:   2016-07-31 19:45:38
* @Last Modified by:   anchen
* @Last Modified time: 2016-08-01 22:08:20
*/
//将tweet添加到列表中
function get(url){
    return new Promise((resolve, reject)=>{
        $.ajax({
            url: url,
            type: 'GET'
        })
        .done(data => resolve(data))
        .fail(data => reject(data));
    });
}
function post(url, data){
    return new Promise((resolve, reject)=>{
        $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json',//necessary!!
            data: JSON.stringify({tweet: data}),// JSON.stringify necessary!!
        })
        .done(data => resolve(data))
        .fail(data => reject(data));
    });
}
let img = url => {
    return get(url);
}

var appendToTweetGroups = (tweet)=>{
    var content = tweet.text;
    var time = tweet.time;
    var newTweetGroup = "<div class='tweet-group'>"
    + "<time datetime='"+new Date(time).toLocaleString()+"'>"+new Date(time).toLocaleString() + "</time>"
    + "<p class='tweet-content'>"+ content +"</p></div>";
    $('#tweets').prepend(newTweetGroup);
            
}
var displayMeow = ({file} = data) =>{
    console.log(file);
    var newImage = "<img src='"+file+"' alt='meow' />";
    $('#header').prepend(newImage);
}
$(document).ready(function(){
    //初始化评论列表
    img("http://random.cat/meow").then(data =>{
        displayMeow(data);
    },
    data=> console.log('there is something wrong during load images'));

    get("/ajax").then((data)=>{
        for(var tweet of data.tweets)
        {
            appendToTweetGroups(tweet);
        }
    },
    data=> console.log("some error occurs during loading tweets"));
    
    $('.tweet-btn').click(()=>{
        var tweet = $('.tweet-input').val();
        post('/ajax', tweet).then(data => {
            console.log(data);
            var tweet = {text:data.text, time: data.time};
            appendToTweetGroups(tweet);
            $('.tweet-input').val('');
        }
        ,data => console.log('There is something wrong during post.'));
        
        
    });
});