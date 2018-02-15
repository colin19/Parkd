var parksInfo = [
    [
        'Zilker Metropolitan Park is...'
        , '<br>Zilker Metropolitan Park is considered "Austin\'s most-loved park." ' +
    'This 351-acre metropolitan park is home to a variety of recreation opportunities, ' +
    'facilities and special events for individuals and families.'
        , 'missing phone #'
        , '2100 Barton Springs Rd, Austin, TX 78704, USA'
        , 'Open Now'
        , ['../../static/img/parks/zilker-1.png', '../../static/img/parks/zilker-2.png', '../../static/img/parks/zilker-3.png']
        , [['The Mighty Cone', 'American & tacos' , '$', '../trucks/mightyCone.html']
        , ['Pinch', 'Fried Chicken Bento' , '$$', '../trucks/pinch.html']
        , ['The Mighty Cone', 'American & tacos' , '$', '../trucks/mightyCone.html']
        , ['Pinch', 'Fried Chicken Bento' , '$$', '../trucks/pinch.html']
        , ['The Mighty Cone', 'American & tacos' , '$', '../trucks/mightyCone.html']
    ]
        , ['video_link 1', 'video_link 2']
        , 'external_link'
        , [30.2669624, -97.77285930000001]
        , 'https://www.facebook.com/zilkerparkaustin360/'
    ]
];

function getParkDescription(){
    var html = '';
    html += '<h1>' + parksInfo[0][0] + '</h1>';
    html += '<p>' + parksInfo[0][1] + '</p>';
    return html;
}

function getParkPhoneInfo(){
    var html = '';
    html += '<h1>Phone</h1>';
    html += '<p>' + parksInfo[0][2] + '</p>';
    return html;
}

function getParkLocationInfo(){
    var html = '';
    html += '<h3>Location</h3>';
    html += '<p>' + parksInfo[0][3] + '</p>';
    return html;
}

function getParkHourInfo(){
    var html = '';
    html += '<h1>Hours</h1>';
    html += '<p>' + parksInfo[0][4] + '</p>';
    return html;
}

function getParkImages(){
    var html = '';
    var pictureList = parksInfo[0][5];

    var i;
    for(i=0; i<pictureList.length; i++){
        if(i === 0){
            html += '<div class=\"carousel-item active\">';
        }else{
            html += '<div class=\"carousel-item\">';
        }
        html += '<img class=\"d-block img-fluid\" src=\"' + pictureList[i] + '\" alt=\"image\"></div>';
    }

    return html;
}

function getParkFacebookFeeds(){
    var html = '';
    var facebookLink = parksInfo[0][10];

    html += '<h3>Media Feeds</h3>';
    html += '<br>';
    html += '<div class="fb-page" data-href="' + facebookLink + '" data-tabs="timeline" data-width="300" data-height="280" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false">';
    html += '<blockquote cite="' + facebookLink + '" class="fb-xfbml-parse-ignore">';
    html += '<a href="' + facebookLink + '">Pinch</a>';
    html += '</blockquote></div>';

    return html;
}

// Get the html of the menu item
function getMenuItem(name, subtitle, price, link) {
    var html = '';
    html += '<div class="menu-card card">';
    html += '<div class="container-fluid">';
    html += '<div class="row">';
    html += '<div class="col-6">';
    html += '<div class="food-name">';
    html += '<h5 class="card-title">' + '<a href="' + link + '">' + name + '</a>' +'</h5>';
    html += '<h6 class="card-subtitle mb-2 text-muted">' + subtitle + '<br><br></h6>';
    html += '</div></div>';
    html += '<div class="col-6">';
    html += '<h5 class="food-price">' + price + '</h5>';
    html += '</div></div></div></div>';
    return html;
}

// Get html of the menu
function getMenu(){
    var menuList = parksInfo[0][6];

    var html = '';
    html += '<div class="card-group">';
    var i;
    for(i = 0; i < menuList.length; i++){
        html += getMenuItem(menuList[i][0], menuList[i][1], menuList[i][2], menuList[i][3]);
        if(i%3 === 2){
            html += '</div><div class="card-group">';
        }
    }
    while(i%3 !== 0){
        html += getMenuItem('', '', '');
        i = i+1;
    }
    html += '</div>';
    return html;
}

// Insert formatted html into element with the specified id
function insertHTML(id, html) {
    var el = document.getElementById(id);

    if(!el) {
        alert('Element with id ' + id + ' not found.');
    }

    el.innerHTML = html;
}

function initMap() {
    var uluru = {lat: parksInfo[0][9][0], lng: parksInfo[0][9][1]};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}

// This function loads the card view
function loadParkInfo() {
    var htmlDescription = getParkDescription();
    insertHTML('basicDescription', htmlDescription);

    var htmlLocation = getParkLocationInfo();
    insertHTML('locationInfo', htmlLocation);
    var htmlHours = getParkHourInfo();
    insertHTML('hourInfo', htmlHours);
    var parkImage = getParkImages();
    insertHTML('carousel-list', parkImage);
    var parkMenu = getMenu();
    insertHTML('menuGrid', parkMenu);
    var parkFacebookFeed = getParkFacebookFeeds();
    insertHTML('mediaFeeds', parkFacebookFeed);
}

// Run everything when the document loads.
window.onload = loadParkInfo;