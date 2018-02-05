var num, arr, interval, quiz;
var playtime = 0;
var counter = 0;
var score = 0;
var width = 100;
var maxWidth = 100;
var sec = 10;
var intervalRate = 10 * sec; //rate-per-quiz = fixed * second
$(document).ready(function(){
    $(".overlay-content a").on('click',function (e) {
        $(".screen,.choice ,.quiz").fadeIn();
        $("#menu").height("0%");
        //console.log('num :',this.id);
        num = parseInt(this.id);

        $.ajax({
            url: 'data.json',
            method: 'GET',
            success: function(response) {
                arr = response;
                setQuiz();
                interval = setInterval(intervalControl, intervalRate);
            }
        });
    });
    $(".choice").on('click', function (e) {
        //console.log('CLICK :',this.id);
        if (this.id == quiz.answer) {
            //console.log('CHECK :',this.id);
            score++;
        }
        width = 0;
    });

    $("#backward").on('click', function () {
        $("#ending").height("0%");
        $("#menu").height("100%");
    });

    //debugger
    /*
    $(".quiz").on('click', function () {
        //console.log('FORCE END');
        reset();
    });
    */

});

function intervalControl() {
    if (width == 0) {
        setQuiz();
    } else {
        width--;
        playtime += intervalRate;
        $("#timer").width(width + "%");

    }
}
function setQuiz(){
    if (counter < num) {
        width = maxWidth;
        counter++;
        //console.log('c',counter);
        let rValue = Math.floor((Math.random() * arr.length));
        quiz = arr.splice(rValue, 1)[0];
        //console.log('Quiz#', rValue);
        //console.log('quiz left:',arr.length);
        //console.log(quiz);
        var mobs = ["Hydra.png", "Wyvern.png", "Leviathan.png", "Bahamut.png"];
        var mob = mobs[Math.floor(Math.random() * mobs.length)];
        $(".mob").css("content", "url(asset/" + mob + ")");
        $(".quest").html(quiz.question);
        try {
            $(".image").css("content", "url(" + quiz.img + ")");
        } catch(er) {
            //usually error cause normal-Quiz not have image
        }

        $("#c1").html(quiz.choice1);
        $("#c2").html(quiz.choice2);
        $("#c3").html(quiz.choice3);
        $("#c4").html(quiz.choice4);
    } else {
        reset();
    }
}
function reset() {
    var tab = "&nbsp&nbsp&nbsp&nbsp";
    clearInterval(interval);
    $(".screen,.choice ,.quiz").fadeOut();
    $("#playtime").html("Play Time " + tab + (playtime/1000) + " sec");
    $("#result").html("SCORE "+ tab + score +" / " + num);
    $("#ending").height("100%");
    //console.log('end');
    //clean up
    $(".quiz").html();
    $("#c1").html();
    $("#c2").html();
    $("#c3").html();
    $("#c4").html();
    playtime = 0;
    counter = 0;
    score = 0;
    width = maxWidth;
}
