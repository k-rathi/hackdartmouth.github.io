PINE_SCHEDULE = {
  OPTIONALS: {
    "borders": true,
    "background_color": "#FFFFFF",
    "header_alignment": "center"
  },
  DAY_0_START: 18,
  DAY_1_START: 8,
  HOURS_TO_SHOW: 14,

};

PineSchedule.load(".day-0", {
  "optionals": PINE_SCHEDULE.OPTIONALS,
  "day_of_week": "FRIDAY",
  "month": "OCTOBER",
  "day": 5,
  "range": {
    "start": PINE_SCHEDULE.DAY_0_START,
    "end": PINE_SCHEDULE.DAY_0_START + 1.5
  },
  "events": [
    {
      "time_range": "~6pm",
      "name": "Alexa Workshop",
      "location": "DEN",
      "color": "#CADD74",
      "start": 18,
      "end": 19.5
    }
  ]
});

PineSchedule.load(".day-1", {
  "optionals": PINE_SCHEDULE.OPTIONALS,
  "day_of_week": "SATURDAY",
  "month": "OCTOBER",
  "day": 6,
  "range": {
    "start": PINE_SCHEDULE.DAY_1_START,
    "end": PINE_SCHEDULE.DAY_1_START + PINE_SCHEDULE.HOURS_TO_SHOW
  },
  "events": [
    {
      "time_range": "8am",
      "name": "Registration",
      "location": "",
      "color": "#CADD74",
      "start": 8,
      "end": 8.5
    },
    {
      "time_range": "8:30am-3:50pm",
      "name": "HackDay",
      "location": "",
      "color": "#689540",
      "start": 8.5,
      "end": 15.8
    },
    {
      "time_range": "3:50-4:15pm",
      "name": "Pitch Workshop by Jonathan Baer of Threshold Ventures",
      "location": "",
      "color": "#CADD74",
      "start": 16,
      "end": 16.5
    },
    {
      "time_range": "4:15-5pm",
      "name": "HackDay",
      "location": "",
      "color": "#689540",
      "start": 16.5,
      "end": 17,
    },
    {
      "time_range": "5-6pm",
      "name": "WebDev Workshop",
      "location": "",
      "color": "#CADD74",
      "start": 17,
      "end": 18
    },
    {
      "time_range": "6-8pm",
      "name": "HackDay",
      "location": "",
      "color": "#689540",
      "start": 18,
      "end": 20,
    },
    {
      "time_range": "8pm-9pm",
      "name": "Pitches and Judging",
      "location": "",
      "color": "#74A39B",
      "start": 20,
      "end": 21
    },
    {
      "time_range": "9pm-10pm",
      "name": "Prizes",
      "location": "",
      "color": "#CADD74",
      "start": 21,
      "end": 22
    }
  ]
});


var playing = false;
var nyanCat = new Audio("misc/nyancat.mp3");

function hehehe(){
  if(!playing){
    $("#lol").css("display","block");
    nyanCat.play();
    playing = true;
    var nyanFly = setInterval(function(){
      var timer = $("#lol").stop().animate({"margin-left" : "+=60%"}, 5000);
      if ($("#lol").offset().left > $(window).width()) {
        clearInterval(nyanFly);
      }
    }, 5000);
  } else {
    $("#lol").css("display","none");
    nyanCat.pause();
    playing = false;
  }
}

function jumpToSection(event, targetSection){
  event.preventDefault();
  var navbarHeight = $("#myNav").height();
  var controlString = null;
  switch(targetSection){
    case "s1":
      controlString = "#about";
      break;
    case "s2":
      controlString = "#schedule";
      break;
    case "s3":
      controlString = "#faq";
      break;
    case "s4":
      controlString = "#tracks";
      break;
    case "s5":
      controlString = "#sponsors";
      break;
    case "s6":
      controlString = "#apply";
      break;
    default:
      controlString = "#";
  }
  var sectionOffset = $(controlString).offset().top;
  $("html, body").animate({
    scrollTop : sectionOffset - navbarHeight + 1
  }, 1000);
}

$(document).ready(function(){

  //$('#schedule').hide();
  //$('#apply').hide();

  var faqHeight = $('#faq').height();
  var faqWidth = $('#faq').width();
  var lineHeight = $('#linecount-start').height();
  var lineCount = faqHeight/lineHeight;
  var scrolledDown = false;
  var placeholderNavBar = $('#placeholderNav')
  var navBar = $('#myNav')
  var active_nav_button = undefined

  setCollapsibility()
  refreshNavBar()

  for(i = 1; i < lineCount; i++){
    var newNode = document.createElement('li');
    var innerContent = document.createTextNode(i);
    newNode.appendChild(innerContent);
    document.getElementById('sidebar').appendChild(newNode);
  }

  function refreshNavBar() {
  	//console.log("refreshed Navbar");
    scrollPosition = $(window).scrollTop()
    if(scrollPosition >= $('#welcome').height()) {
      placeholderNavBar.css('display', 'block');
      navBar.addClass('fixed-nav-bar');
    } else {
      placeholderNavBar.css('display', 'none');
      navBar.removeClass('fixed-nav-bar');
    }

    scrollPosition = scrollPosition + $(window).height() / 10 + 80

    $(".active").removeClass('active')
    if (scrollPosition >= $("#apply").offset().top) {
      $(".apply.nav-button").addClass('active')
    } else if (scrollPosition >= $("#sponsors").offset().top) {
      $(".sponsors.nav-button").addClass('active')
    }  else if (scrollPosition >= $('#faq').offset().top) {
    	//console.log("made faq active");
      $(".faq.nav-button").addClass('active')
    } else if (scrollPosition >= $('#about').offset().top) {
      $(".about.nav-button").addClass('active')
    }
  }

  function slideIn() {
    scrollPosition = $(window).scrollTop();
    scrollPosition = scrollPosition + $(window).height() / 10 + 80;
    if (scrollPosition >= $('#about').offset().top && !scrolledDown) {
      $("#background-left").animate({
        "margin-left" : "+=20vw"
      });
      $("#background-right").animate({
        "margin-left" : "-=20vw"
      });
      scrolledDown = true;
    }
  }

  $(window).scroll(function (event) {
    refreshNavBar();
    slideIn();
  });

  function setCollapsibility() {
    if ($(window).width() > 850) {
      $("#can-collapse").removeClass('navbar-collapsible-menu');
    } else {
      $("#can-collapse").addClass('navbar-collapsible-menu');
    }
  }

  // dynamically update line numbers
  $(window).resize(function(){

    setCollapsibility()

    // clear out line counts on resize
    var topNode = document.getElementById('sidebar');
    while(topNode.firstChild){
      topNode.removeChild(topNode.firstChild);
    }

    var firstNode = document.createElement('li');
    firstNode.id = 'linecount-start';
    firstNode.innerHTML = '&nbsp;';
    document.getElementById('sidebar').appendChild(firstNode);

    var faqHeight = $('#faq').height();
    var faqWidth = $('#faq').width();
    var lineHeight = $('#linecount-start').height();
    var lineCount = faqHeight/lineHeight;

    for(i = 1; i < lineCount; i++){
      var newNode = document.createElement('li');
      var innerContent = document.createTextNode(i);
      newNode.appendChild(innerContent);
      document.getElementById('sidebar').appendChild(newNode);
    }
  });
});
