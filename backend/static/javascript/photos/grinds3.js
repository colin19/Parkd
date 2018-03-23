var photosInfo = [
    [
        '# 808 grinds'
        , 'I don\'t just eat cookies all day! This heap of meat is the kalua pig from @808grinds and it\'s delicious! their habanero teriyaki sauce is delicious too! '
        , '../../static/img/food/grinds3.png'
        , '815 SW Park Ave, Portland, OR 97205, USA'
        , [45.5186898, -122.6814688]
        , 'https://www.facebook.com/808GrindsPdx/?ref=br_rs'
        , 'M - F<br>11:30 am - 2:00 pm<br>5:00 pm - 9:00 pm<br>SA - SU<br>5:00 pm - 9:00 pm'
        , ['808 Grinds', '../trucks/grinds.html']
        , ['Director Park', '../parks/director.html']
    ]
];

function getPhotoDescription(){
    var html = '';
    html += '<h1>' + photosInfo[0][0] + '</h1>';
    html += '<p>' + photosInfo[0][1] + '</p>';
    return html;
}

function getHeaderImage(){
    var html = '';
    html += '<img class="headerPhoto d-block img-fluid" src="' + photosInfo[0][2] + '">';
    return html;
}

function getPhotoLocationInfo(){
    var html = '';
    html += '<h3>Location</h3>';
    html += '<p>' + photosInfo[0][3] + '</p>';
    return html;
}

function getTruckHourInfo(){
    var html = '';
    html += '<h1>Hours</h1>';
    html += '<p>' + photosInfo[0][6] + '</p>';
    return html;
}

function getPhotoTruckInfo(){
    var html = '';
    html += '<h1>Photo Truck</h1>';
    html += '<p><a href="' + photosInfo[0][7][1] + '">' + photosInfo[0][7][0] + '</a></p>';
    return html;
}

function getPhotoParkInfo(){
    var html = '';
    html += '<h1>Nearby Park</h1>';
    html += '<p><a href="' + photosInfo[0][8][1] + '">' + photosInfo[0][8][0] + '</a></p>';
    return html;
}


function initMap() {
    var uluru = {lat: photosInfo[0][4][0], lng: photosInfo[0][4][1]};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}



function getPhotoFacebookFeeds(){
    var html = '';
    var facebookLink = photosInfo[0][5];

    html += '<h3>Media Feeds</h3>';
    html += '<br>';
    html += '<div class="fb-page" data-href="' + facebookLink + '" data-tabs="timeline" data-width="300" data-height="280" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false">';
    html += '<blockquote cite="' + facebookLink + '" class="fb-xfbml-parse-ignore">';
    html += '<a href="' + facebookLink + '">Pinch</a>';
    html += '</blockquote></div>';

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



// This function loads the card view
function loadPhotoInfo() {
    var htmlDescription = getPhotoDescription();
    insertHTML('basicDescription', htmlDescription);
    var htmlLocation = getPhotoLocationInfo();
    insertHTML('locationInfo', htmlLocation);
    var photoFacebookFeed = getPhotoFacebookFeeds();
    insertHTML('mediaFeeds', photoFacebookFeed);
    var headerImage = getHeaderImage();
    insertHTML('photoImg', headerImage);
    var truckInfo= getPhotoTruckInfo();
    insertHTML('truckInfo', truckInfo);
    var parkInfo= getPhotoParkInfo();
    insertHTML('parkInfo', parkInfo);
    var parkHourInfo= getTruckHourInfo();
    insertHTML('hourInfo', parkHourInfo);
}

// Run everything when the document loads.
window.onload = loadPhotoInfo;