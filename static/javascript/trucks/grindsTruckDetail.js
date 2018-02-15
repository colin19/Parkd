var trucksInfo = [
    [
        '808 Grinds is...'
        , '<br>...Awesome place to eat in Downtown Portland! I got a cheesus (think colossus but with cheese) which is a hamburger with grilled cheese sandwiches replacing the buns. It\'s a lot but it\'s super delicious. Highly recommend for the times you do go to Portland\'s downtown.'
        , '(512) - 820 - 6611'
        , '518 W 24th St, Austin, TX 78703'
        , 'M - F<br>11:30 am - 2:00 pm<br>5:00 pm - 9:00 pm<br>SA - SU<br>5:00 pm - 9:00 pm'
        , ['../../static/img/food/food1.png', '../../static/img/food/food2.png', '../../static/img/food/food3.png']
        , [['Spam Musubi', 'Seared marinated spam over rice, wrapped in nori (seaweed).' , '$3']
            , ['Spam Musubi', 'Seared marinated spam over rice, wrapped in nori (seaweed).' , '$3']
            , ['Spam Musubi', 'Seared marinated spam over rice, wrapped in nori (seaweed).' , '$3']
            , ['Spam Musubi', 'Seared marinated spam over rice, wrapped in nori (seaweed).' , '$3']
            , ['Kalua Pig', 'Hawaiian-Style pulled pork served naked.' , '$9']
            , ['Kalua Pig', 'Hawaiian-Style pulled pork served naked.' , '$9']
            , ['Kalua Pig', 'Hawaiian-Style pulled pork served naked.' , '$9']
            , ['Kalua Pig', 'Hawaiian-Style pulled pork served naked.' , '$9']
        ]
        , ['video_link 1', 'video_link 2']
        , 'external_link'
        , [45.5186898, -122.6814688]
        , 'https://www.facebook.com/808GrindsPdx/?ref=br_rs'
        , ['Director Park', '../parks/director.html']
    ]
];

function getTruckDescription(){
    var html = '';
    html += '<h1>' + trucksInfo[0][0] + '</h1>';
    html += '<p>' + trucksInfo[0][1] + '</p>';
    return html;
}

function getTruckPhoneInfo(){
    var html = '';
    html += '<h1>Phone</h1>';
    html += '<p>' + trucksInfo[0][2] + '</p>';
    return html;
}

function getTruckLocationInfo(){
    var html = '';
    html += '<h3>Location</h3>';
    html += '<p>' + trucksInfo[0][3] + '</p>';
    return html;
}

function getTruckHourInfo(){
    var html = '';
    html += '<h1>Hours</h1>';
    html += '<p>' + trucksInfo[0][4] + '</p>';
    return html;
}

function getTruckImages(){
    var html = '';
    var pictureList = trucksInfo[0][5];

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

function getTruckFacebookFeeds(){
    var html = '';
    var facebookLink = trucksInfo[0][10];

    html += '<h3>Media Feeds</h3>';
    html += '<br>';
    html += '<div class="fb-page" data-href="' + facebookLink + '" data-tabs="timeline" data-width="300" data-height="280" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false">';
    html += '<blockquote cite="' + facebookLink + '" class="fb-xfbml-parse-ignore">';
    html += '<a href="' + facebookLink + '">Pinch</a>';
    html += '</blockquote></div>';

    return html;
}

function getParkInfo(){
    var html = '';
    var parkName = trucksInfo[0][11][0];
    var parkLink = trucksInfo[0][11][1];

    html += '<h1>Park</h1>';
    html += '<a href="' + parkLink + '">' + parkName + '</a>';
    return html;
}

// Get the html of the menu item
function getMenuItem(name, subtitle, price) {
    var html = '';
    html += '<div class="menu-card card">';
    html += '<div class="container-fluid">';
    html += '<div class="row">';
    html += '<div class="col-6">';
    html += '<div class="food-name">';
    html += '<h5 class="card-title">' + name +'</h5>';
    html += '<h6 class="card-subtitle mb-2 text-muted">' + subtitle + '<br><br></h6>';
    html += '</div></div>';
    html += '<div class="col-6">';
    html += '<h5 class="food-price">' + price + '</h5>';
    html += '</div></div></div></div>';
    return html;
}

// Get html of the menu
function getMenu(){
    var menuList = trucksInfo[0][6];

    var html = '';
    html += '<div class="card-group">';
    var i;
    for(i = 0; i < menuList.length; i++){
        html += getMenuItem(menuList[i][0], menuList[i][1], menuList[i][2]);
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
    var uluru = {lat: trucksInfo[0][9][0], lng: trucksInfo[0][9][1]};
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
function loadTruckInfo() {
    var htmlDescription = getTruckDescription();
    insertHTML('basicDescription', htmlDescription);
    var htmlPhone = getTruckPhoneInfo();
    insertHTML('phoneInfo', htmlPhone);
    var htmlLocation = getTruckLocationInfo();
    insertHTML('locationInfo', htmlLocation);
    var htmlHours = getTruckHourInfo();
    insertHTML('hourInfo', htmlHours);
    var truckImage = getTruckImages();
    insertHTML('carousel-list', truckImage);
    var truckMenu = getMenu();
    insertHTML('menuGrid', truckMenu);
    var truckFacebookFeed = getTruckFacebookFeeds();
    insertHTML('mediaFeeds', truckFacebookFeed);
    var truckParkInfo = getParkInfo();
    insertHTML('parkInfo', truckParkInfo);
}

// Run everything when the document loads.
window.onload = loadTruckInfo;