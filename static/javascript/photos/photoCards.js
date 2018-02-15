// pictures and description for the food photos
var data = [
    [
        '#themightycone'
        , '../static/img/food/themightycone1.png'
        , 'Yumm! #austin #themightycone <br><br>Likes: 8'
        , 'photos/themightycone1.html'
    ],
    [
        '#themightycone'
        , '../static/img/food/themightycone2.png'
        , 'These mighty cones are lookin\' mighty fine 😏🔥 <br><br>Likes: 64'
        , 'photos/themightycone2.html'
    ],
    [
        '#themightycone'
        , '../static/img/food/themightycone3.png'
        , 'The Might Cone was calling our name this afternoon and what better way to eat but besides on Barton Springs on a cool day. <br><br>Likes: 30'
        , 'photos/themightycone3.html'
    ],
    [
        '#808grinds'
        , '../static/img/food/grinds1.png'
        , 'I don\'t just eat cookies all day! This heap of meat is the kalua pig from @808grinds and it\'s delicious! their habanero teriyaki sauce is delicious too! <br><br>Likes: 35'
        , 'photos/grinds1.html'
    ],
    [
        '#808grinds'
        , '../static/img/food/grinds2.png'
        , 'Today\'s Special: Shrimp Scampi, served with garlic bread and Caesar salad! All for $12.95!  <br><br>Likes: 652'
        , 'photos/grinds2.html'
    ],
    [
        '#808grinds'
        , '../static/img/food/grinds3.png'
        , 'Mahi Mahi now on our new #Spring menu here at da café! 🐠🐠  <br><br>Likes: 140'
        , 'photos/grinds3.html'
    ],
    [
        '#pinch'
        , '../static/img/food/pinch1.png'
        , 'Today is the day! Opening at 5p tonight w/ exciting new items for you to try! Come say hi! <br><br>Likes: 5'
        , 'photos/pinch1.html'
    ]
];


// add several cards
function addCards() {
    var html = '';

    var i;
    for(i = 0; i < data.length; i++){
        var photoInfo = data[i];
        html += getPhotoCard(photoInfo[0], photoInfo[2], photoInfo[1], photoInfo[3]) + '\n';
    }

    return html;
}


// Get the html of a card
function getPhotoCard(photoName, description, img, href) {
    var html = '';
    html += '<div class=\"shadowCard card\">';
    html += '<img class=\"shadowImg card-img-top img-fluid\" src=\"' + img + '\" alt=\"' + photoName + '\">';
    html += '<div class=\"card-body\">';
    html += '<h4 class=\"photoCardTitle card-title\">' + photoName + '</h4>';
    html += '<p class=\"photoCardText card-text\">'+ description + '</p>';
    html += '<div class=\"photoCardBtnContainer text-center\">';
    html += '<a href=\"' + href + '" class=\"btn btn-info photoCardBtn\">More Info</a>';
    html += '</div>';
    html += '</div>\n' + '</div>';

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
function loadCardView() {
    var html = addCards();
    insertHTML('photoCardsContainer', html);
}

// Run everything when the document loads.
window.onload = loadCardView;
