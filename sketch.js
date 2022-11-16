//background
let canvas = {w:1100, h:720}
var cam;

// illumination background
var button1;
var button2;
var button3;
var button4;

//clock vars
let cx, cy;
let secondsRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;
let clockColor = 250;

// news articles vars
let data = {}
let article_Titles = []

// calendar events vars
let event_Data = {}
let events_title = []
let event_time = []

// weight vars
let weight_data = {}
let prev_week = [];
let this_week = [];

function preload() {
    data = loadJSON('assets/news.json');
    event_Data = loadJSON('assets/events.json');
    weight_data = loadJSON('assets/weight.json');
}
// news
function loadData() {
    let articleData = data['results'];
    for (let i=0; i < articleData.length; i++) {
        // get first result
        let article = articleData[i];
        // get result i title
        let article_title = article['title'];
        // push to array of titles
        article_Titles.push(article_title);
    }
}

// calendar events
function loadEventData() {
    let eventsData = event_Data['events'];
    for (let i = 0; i < eventsData.length; i++) {
        // get first event
        let eventsi = eventsData[i];
        // get title and time of i
        let event_title = eventsi['title'];
        let event_times = eventsi['time'];
        // push to respective arr
        events_title.push(event_title);
        event_time.push(event_times);
    }
}

// Weight
function loadWeightData() {
    let nd = new Date();
    let temp = nd.getDate();
    let numDay = nd.getDay(); // ex 2 = tuesday
    let d = nd.getDate().toString(); // actual day ex 15th in string
    let weightData = weight_data['weights'];
    let wd = weightData[0];
    this_week = wd[d];
    let subs = temp - 7;
    if (subs >= 1) {
        prev_week = wd[subs];
    } else {
        subs = 30 - numDay;
        prev_week = wd[subs];
    }
}

function changeColor1() {
    background(color1);
}
function changeColor2() {
    background(color2);
}
function changeColor3() {
    background(color3);
}
function changeColor4() {
    background(color4);
}

function setup() {
    // canvas
    createCanvas(canvas.w+30, canvas.h+30);
    cam = createCapture(VIDEO);
    cam.size(canvas.w,canvas.h);
    cam.hide();

    // weather
    get_temp();

    // news
    loadData();

    // Events Calendar
    loadEventData();

    // Weight
    loadWeightData();

    // illuminate background
    background(0)
    color1 = color(255,235,205);
    color2 = color(195,176,145);
    color3 = color(250,218,94);
    color4 = color(0,255,255);

    button1 = createButton(" ");
    button1.size(20,20);
    button1.style('background-color', color1);
    button1.position(660,698);
    button1.mouseClicked(changeColor1);

    button2 = createButton(" ");
    button2.size(20,20);
    button2.style('background-color', color2);
    button2.position(685,698);
    button2.mouseClicked(changeColor2);

    button3 = createButton(" ");
    button3.size(20,20);
    button3.style('background-color', color3);
    button3.position(710,698);
    button3.mouseClicked(changeColor3);

    button4 = createButton(" ");
    button4.size(20,20);
    button4.style('background-color', color4);
    button4.position(735,698);
    button4.mouseClicked(changeColor4);

    // clock
    stroke(255);
    let radius = min(width, height) / 11;
    secondsRadius = radius * 0.71;
    minutesRadius = radius * 0.6;
    hoursRadius = radius * 0.5;
    clockDiameter = radius * 1.7;
    cx = 1100/2;
    cy = 85;
}

function draw(){
    // background
    push();
    image(cam, 15, 15, canvas.w, canvas.h);
    pop();

    // illuminate background (advanced)
    textSize(22)
    fill(220)
    textFont("Rockwell")
    text("Illumination Color: ", 250, 700)

    // WEATHER DISPLAY
    let sHeight = 180
    textSize(24)
    fill(220)
    textAlign(LEFT, CENTER)
    text("Weather", 50, sHeight)
    text("_______________", 48, sHeight+2)
    // location
    textSize(20)
    fill(220)
    textAlign(LEFT, CENTER)
    text("Lubbock TX", 50, sHeight+30)
    // current temp
    textSize(32)
    fill(220)
    textAlign(LEFT, CENTER)
    text(curr_temp, 50, sHeight+63)
    textSize(14)
    text("°F",83,sHeight+57)
    // forcast
    textSize(21)
    fill(220)
    textAlign(LEFT, CENTER)
    text(curr_short_forecast, 104, sHeight+67)

    // NEWS DISPLAY
    textSize(24)
    fill(220)
    text("News", 50, 500)
    text("_________________", 48, 502)
    let nHeight = 530
    for (let i = 0; i < 5; i++) {
        textSize(12)
        fill(220)
        text(article_Titles[i], 50, nHeight)
        nHeight = nHeight+20
    }

    // CALENDAR EVENTS
    textSize(24)
    fill(220)
    text("Today's Events", 850, 180)
    text("___________________", 848, 182)
    let eHeight = 210
    for (let i = 0; i < 5; i++) {
        textSize(12)
        fill(220)
        text(events_title[i], 850, eHeight)
        text(event_time[i], 1015, eHeight)
        eHeight = eHeight+20
    }

    // WEIGHT
    textSize(24)
    fill(220)
    text("Weight", 850, 580)
    text("___________________", 848, 582)
    let wHeight = 625
    text(this_week, 850, 620)
    text("lbs", 895, 620)
    textSize(16)
    let change = this_week - prev_week
    if (change >= 0) {
        text("(", 850, 651)
        text("+", 857, 653)
        text(change, 867, 653)
        text("from last week", 890, 653)
        text(")", 1001, 651)
    } else {
        text("(", 850, 651)
        // text("+", 857, 653)
        text(change, 867, 653)
        text("from last week", 890, 653)
        text(")", 1001, 651)
    }

    // ILLUMINATE BACKGROUND


    // CLOCK DISPLAY
    // Draw the clock background
    noStroke();
    fill(clockColor);
    ellipse(cx, cy, clockDiameter + 15, clockDiameter + 15);
    fill(0);
    ellipse(cx, cy, clockDiameter, clockDiameter);

    // Angles for sin() and cos() start at 3 o'clock;
    // subtract HALF_PI to make them start at the top
    let s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
    let m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
    let h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;

    // Draw the hands of the clock
    stroke(255);
    strokeWeight(1);
    line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
    strokeWeight(2);
    line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
    strokeWeight(4);
    line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);

    // Draw the minute ticks
    strokeWeight(2);
    beginShape(POINTS);
    for (let a = 0; a < 360; a += 6) {
        let angle = radians(a);
        let x = cx + cos(angle) * secondsRadius;
        let y = cy + sin(angle) * secondsRadius;
        vertex(x, y);
    }
    endShape();
    strokeWeight(0);
}

// WEATHER API
async function get_weather(){
    const response = await fetch('https://api.weather.gov/points/33.5779,-101.8552');
    const json = await response.json()
    console.log(json)
}


async function get_hourly_forecast(){
    const response = await fetch('https://api.weather.gov/gridpoints/LUB/48,32/forecast/hourly');
    const json = await response.json()
    console.log(json)
}


async function get_forecast(){
    const response = await fetch('https://api.weather.gov/gridpoints/LUB/48,32/forecast');
    const json = await response.json()
    console.log(json)
}

// //DISPLAY API
let curr_temp
let curr_short_forecast
let curr_location

async function get_temp(){
    const response = await fetch('https://api.weather.gov/gridpoints/LUB/48,32/forecast/hourly');
    const json = await response.json()
    console.log(json)
    curr_temp = json.properties.periods[0].temperature
    curr_short_forecast = json.properties.periods[0].shortForecast
    curr_location = json.properties.periods[0].forcastZone
}

let news_title

async function get_news() {
    const response = await fetch('https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=wIs4oGzLPLjx1xmoREpOpwh6QK1jAU08');
    const json = await response.json();
    console.log(json)
    news_title = json.results[0].title
}
