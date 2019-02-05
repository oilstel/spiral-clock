const path = require('path');
const Store = require('./store.js');


function newDate() {
    date = new Date;
    day = date.getDate();
    month = date.getMonth()+1;
    year = date.getFullYear();
    seconds = date.getSeconds();
    minutes = date.getMinutes();
    hours = date.getHours();

    // Get current day out of year (365)
    start = new Date(date.getFullYear(), 0, 0);
    diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
    oneDay = 1000 * 60 * 60 * 24;
    dayInYear = Math.floor(diff / oneDay);
    // console.log('Day of year: ' + dayInYear);
  
    hands = [
      {
        hand: 'day',
        position: Math.floor(((hours * 49) + minutes) / 6)
      },
      {
        hand: 'year',
        position: dayInYear / 2
      }
    ];
  }
  
  

  // Set up spiral canvas and resize for screen dpi
  function canvas_obj(ele) {
    let returnable = {
      canvas: ele,
      ctx: ele.getContext("2d"),
      dpi: window.devicePixelRatio
    };
    returnable.get = {
      style: {
        height() {
          return +getComputedStyle(ele).getPropertyValue("height").slice(0, -2);
        },
        width() {
          return +getComputedStyle(ele).getPropertyValue("width").slice(0, -2);
        }
      },
      attr: {
        height() {
          return returnable.ele.getAttribute("height");
        },
        width() {
          return returnable.ele.getAttribute("height");
        }
      }
    };
    returnable.set = {
      style: {
        height(ht) {
          ele.style.height = ht + "px";
        },
        width(wth) {
          ele.style.width = wth + "px";
        }
      },
      attr: {
        height(ht) {
          ele.setAttribute("height", ht);
        },
        width(wth) {
          ele.setAttribute("width", wth);
        }
      }
    };
    return returnable;
  }

  let canvas = canvas_obj(document.getElementById("spiral"));
  let { ctx, dpi, set, get } = canvas;

  function dpi_adjust() {
    set.attr.height(get.style.height() * dpi);
    set.attr.width(get.style.width() * dpi);
  }
  
  console.log('H:', get.style.height());
  console.log('W:', get.style.width());
  
  var c = document.getElementById('spiral');
  var context = c.getContext("2d");
  var centerx = get.style.width();
  var centery = get.style.height();



  

  


// Get color of spiral from palettes
function colorFromCSSClass(className) {
  var tmp = document.createElement("div"), color;
  tmp.style.cssText = "position:fixed;left:-100px;top:-100px;width:1px;height:1px";
  tmp.className = className;
  document.body.appendChild(tmp);  // required in some browsers
  color = getComputedStyle(tmp).getPropertyValue("color");
  document.body.removeChild(tmp);
  return color
}
  
var i = 0;

function animate(position) {
  dpi_adjust(); 
    
  a = 4;
  b = 10;


  // context.clearRect(0, 0, 200, 200);


  // Draw Spiral
  context.moveTo(centerx, centery);
  context.beginPath();
  for (i = -5; i < position; i++) {
      angle = 0.1 * i;
      x = centerx + (a + b * angle) * Math.cos(angle);
      y = centery + (a + b * angle) * Math.sin(angle);

      context.lineTo(x, y);
  }
  context.strokeStyle = colorFromCSSClass("spiral_color");
  context.lineWidth = 1;
  context.stroke();
}


  // Fade in spiral

  $('#spiral').delay(800).fadeIn('slow');





// Text time and date

updateTime()

function updateTime() {

  newDate();

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

  const d = new Date();

  month = monthNames[d.getMonth()]

  var date = document.getElementById('date');
  var time = document.getElementById('time');

  date.innerHTML = `${month} ${day}, ${year}`;

  ampmtime = new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")

  time.innerHTML = ampmtime;

  console.log(new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3"))

}
setInterval(updateTime, 1000);





loadQuote();


// $(document).ready(function () {
//   //your code here
//   $( "body" ).click(function() {
//     $( "#spiral" ).fadeOut( "slow", function() {
//       // Animation complete.
//     });
//   });
// });



function getData() {
  
  var spiralDiv = document.getElementById("spiral"); 
  var quoteDiv = document.getElementById("quote");
  var timeDiv = document.getElementById("time");
  var dateDiv = document.getElementById("date");

  // $("#main_view").fadeToggle('slow').delay(800);
  // $("#quote").fadeToggle('slow').delay(800);

  // $("#main_view").hover(function(){
  //   loadQuote()
  // });


  // spiralDiv.style.display = (spiralDiv.style.display == "none" ? "block" : "none"); 
  // quoteDiv.style.display = (quoteDiv.style.display == "none" ? "block" : "none"); 

  // timeDiv.style.display = (timeDiv.style.display == "none" ? "block" : "none");
  // dateDiv.style.display = (dateDiv.style.display == "none" ? "block" : "none"); 
}


// document.querySelector('body').addEventListener('click', () => {
//   getData();
//   console.log('hit');
// });

// $("body").hover(
//   function() {
//     loadQuote()
//     getData()
//   }, function() {
//     getData()
//   }
// );




function loadQuote() {

  var randomizedNumber = function (length) {
    return Math.floor(Math.random() * length);
  }

  var Quote = {
    htmlEncode: function (str) {
      return str.replace(/&(r|l)dquo;/g, '&$1squo;')
                .replace(/\u201D/g, '&rsquo;')
                .replace(/\u201C/g, '&lsquo;');
    },

    random: function (data) {
      return data[randomizedNumber(data.length)];
    },

    injector: function (data) {
      var quote = this.random(data);
      var text = this.htmlEncode(quote.text);

      console.log(quote.post.title);

      document.getElementById('quote_text').innerHTML = '&ldquo;'.concat(text, '&rdquo;');
      document.getElementById('quote_caption').innerHTML = quote.quotee;
      // document.getElementsByClassName('quote__article-url')[0].href = quote.post.url;
      // document.getElementsByClassName('quote__article-url')[0].innerHTML = quote.post.url;
    }
  }

  fetch('https://thecreativeindependent.com/api/v1/quotes.json').then(function (response) {
    if (response.status !== 200) {
      Quote.injector(window.fallbackData);
    }
    response.json().then(function (data) {
      Quote.injector(data);
    });
    // document.getElementsByClassName('quote')[0].classList.add('quote--loaded');
  })
  .catch(function (err) {
    Quote.injector(window.fallbackData);
  });
}



// Set settings

const store = new Store({
  // We'll call our data file 'user-preferences'
  configName: 'user-preferences'
});

hideTimeDateText = store.get('hideTimeDateText').field;
spiralTime = store.get('spiralTime').field;
palette = store.get('palette').field;

console.log('this:',hideTimeDateText);

if (hideTimeDateText == true) {
  console.log('yeahhhh')
  $("#time, #date").addClass("hide_time_date_text");
  
} else {
  $("#time, #date").removeClass("hide_time_date_text");

}

var isOnDiv = false;

$('body').mouseenter(function(){
  isOnDiv=true;
  console.log('over');
    loadQuote()
    $("#main_view").stop().fadeOut('slow');
    $("#quote, #title_bar").stop().fadeIn('slow');
});

$('body').mouseleave(function(){
  isOnDiv=false;
  console.log('nope');
  $("#main_view").stop().fadeIn();
  $("#quote, #title_bar").stop().fadeOut();
});

var palettesPath = './assets/css/palettes/';

$("head link#palette").attr("href", palettesPath + palette + '.css');



// Set Sprial Time

if (spiralTime === 'day') {
  console.log('DAY',hands[0].position);
  var currentPosition = 0;
} else if (spiralTime === '3_days') {
  console.log(spiralTime);
} else if (spiralTime === 'week') {
  console.log(spiralTime);
} else if (spiralTime === 'month') {
  console.log(spiralTime);
} else if (spiralTime === 'year') {
  console.log('YEAR', hands[1].position);
  var currentPosition = 1;
}

console.log(currentPosition);

// newDate();
// animate(currentPosition);
  
setInterval(function() {waiting(currentPosition)}, 1000);

function waiting(currentPosition) {

  newDate();

  var time = hands[currentPosition].position

  console.log('Current:',hands[currentPosition].position);

  animate(time);
    
}






