const path = require('path');
const Store = require('./store.js');
const canvasInit = require('./canvas.js');

// Get settings
const store = new Store({
  // Data file is called 'user-preferences' and is stored in Libray/Application Support
  configName: 'user-preferences'
});

// Set settings init
hideTimeDateText = store.get('hideTimeDateText').field;
spiralTime = store.get('spiralTime').field;
palette = store.get('palette').field;

// Change CSS palette to what is specifed in the settings panel
var palettesPath = './assets/css/palettes/';
$("head link#palette").attr("href", palettesPath + palette + '.css');

// Init quote onload
loadQuote();

// Update time on load
textClock();

// Update time every second
setInterval(textClock, 1000);

// Set time increment (day or year) every second
setInterval(function() {setTimeIncrement(currentPosition)}, 1000);

// Set Sprial Time Increment
if (spiralTime === 'day') {
  console.log('DAY',TimeIncrements[0].position);
  var currentPosition = 0;
} else if (spiralTime === 'year') {
  console.log('YEAR', TimeIncrements[1].position);
  var currentPosition = 1;
}

// Show hide date and time text
if (hideTimeDateText == true) {
  $("#time, #date").addClass("hide_time_date_text");
} else {
  $("#time, #date").removeClass("hide_time_date_text");
}

// App transitions
var isOnDiv = false;

// On hover load new quote and fade in
$('body').mouseenter(function(){
  isOnDiv=true;
  loadQuote()
  $("#main_view").stop().fadeOut('slow');
  $("#quote, #title_bar").stop().fadeIn('slow');
});

// On mouseleave fade out quote
$('body').mouseleave(function(){
  isOnDiv=false;
  $("#main_view").stop().fadeIn();
  $("#quote, #title_bar").stop().fadeOut();
});

// Fade in spiral
$('#spiral').delay(800).fadeIn('slow');

// Set up Spiral Canvas DPI (included from './canvas.js')
let canvas = canvasInit.canvas_obj(document.getElementById("spiral"));
let { ctx, dpi, set, get } = canvas;

function dpi_adjust() {
    set.attr.height(get.style.height() * dpi);
    set.attr.width(get.style.width() * dpi);
}

var c = document.getElementById('spiral');
var context = c.getContext("2d");
var centerx = get.style.width();
var centery = get.style.height();


// FUNCTIONS //

// Get date
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

  TimeIncrements = [
    {
      type: 'day',
      position: Math.floor(((hours * 49) + minutes) / 6)
    },
    {
      type: 'year',
      position: dayInYear / 2
    }
  ];
}

// Get color of spiral from CSS palette
function colorFromCSSClass(className) {
  var tmp = document.createElement("div"), color;
  tmp.style.cssText = "position:fixed;left:-100px;top:-100px;width:1px;height:1px";
  tmp.className = className;
  document.body.appendChild(tmp);  // required in some browsers
  color = getComputedStyle(tmp).getPropertyValue("color");
  document.body.removeChild(tmp);
  return color
}

// Animate Spiral
var i = 0;
function animate(position) {
  dpi_adjust(); 
    
  a = 4;
  b = 10;

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

// Update text clock
function textClock() {
  newDate();

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const d = new Date();

  month = monthNames[d.getMonth()]
  var date = document.getElementById('date');
  var time = document.getElementById('time');

  // AM PM Time
  ampmtime = new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")

  // Append time
  date.innerHTML = `${month} ${day}, ${year}`;
  time.innerHTML = ampmtime;

  console.log(new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3"))
}

// Get quotes from json
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

      document.getElementById('quote_text').innerHTML = '&ldquo;'.concat(text, '&rdquo;');
      document.getElementById('quote_caption').innerHTML = quote.quotee;
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

// Set time increment to either day or year
function setTimeIncrement(currentPosition) {
  newDate();
  var time = TimeIncrements[currentPosition].position
  animate(time);
}







