var questUrl = "https://script.google.com/macros/s/AKfycbzzJyZ-G6NZpTol-8eHlzdCJPHejzfBlaJLkYzIK7oJKOjkmCiazWW3AE5sWtKSiSE/exec?action=read&table=Quiz1";
var quizUrl = "https://script.google.com/macros/s/AKfycbzzJyZ-G6NZpTol-8eHlzdCJPHejzfBlaJLkYzIK7oJKOjkmCiazWW3AE5sWtKSiSE/exec?action=read&table=Quiz";
var objQuest,level,description,duration;
var objResult = {};
objResult.description = [];
var isFinished = false;
var levels = {"low":1000,"medium":800,"high":500}

function submitForm(){
  var name = document.getElementById("name");
  localStorage.setItem("name", name.value);
  var email= document.getElementById("email");
  localStorage.setItem("email", email.value);

  $.ajax({
    url: questUrl, // Replace with your API URL
    method: 'GET',
    dataType: 'json',
    success: function(response) {
      objQuest = response;
      $("#signup").hide();
      $("#container").load("counter.html",function (){
        startCounter(3,500,function (){
          startQuiz(1);
          startTimer(duration);
        });
      });
    },
    error: function(xhr, status, error) {
      console.log('Error:', error);
    }
  });
}

function startQuiz(qNo){
  $("#container").load("question.html",function (){
    loadQuestion(qNo);
  })
}


function startTimer(minutes) {
  var timerElement = $('#timer');
  var endTime = new Date(); // Set the end time here
  endTime.setMinutes(endTime.getMinutes() + minutes); // Example: countdown for 10 minutes

  var timerTick = setInterval(updateTimer, 1000); // Update the timer every second

  function updateTimer() {
    var currentTime = new Date().getTime();
    var timeDifference = endTime - currentTime;
    var hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    var minutes = Math.floor((timeDifference / 1000 / 60) % 60);
    var seconds = Math.floor((timeDifference / 1000) % 60);
    var formattedTime = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
    timerElement.text(formattedTime);

    if (timeDifference < 0 || isFinished) {
      clearInterval(timerTick);
      if(!isFinished) {
        timerElement.text("00:00:00");
      }
      isFinished = true;
    }
  }

  function formatTime(time) {
    return time < 10 ? '0' + time : time; // Add leading zero if necessary
  }
}

$(document).ready(function(){
  $.ajax({
    url: quizUrl, // Replace with your API URL
    method: 'GET',
    dataType: 'json',
    success: function(response) {
      let activeQuiz = response.data.rows.filter(x => x.IsActive);
      if(activeQuiz.length===1) {
        level =activeQuiz[0].Level;
        description = activeQuiz[0].Description;
        duration = activeQuiz[0].Duration;
        $('#container').load("login.html")
      }else{
        $('#container').load("noQuiz.html")
      }
    },
    error: function(xhr, status, error) {
      console.log('Error:', error);
    }
  });
})