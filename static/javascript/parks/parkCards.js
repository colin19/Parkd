// pictures and description for the food parks
var data = [
    [
        'Zilker Metropolitan Park'
        , '../static/img/parks/zilker-1.png'
        , 'Rating: 4.7<br>2100 Barton Springs Rd, Austin, TX 78704, USA'
        , 'parks/zilker.html'
    ],
    [
        'Alberta Park'
        , '../static/img/parks/albert-1.png'
        , 'Rating: 4.4<br>1905 NE Killingsworth St, Portland, OR 97211, USA'
        , 'parks/alberta.html'
    ],
    [
        'Director Park'
        , '../static/img/parks/director-1.png'
        , 'Rating: 4.3<br>815 SW Park Ave, Portland, OR 97205, USA'
        , 'parks/director.html'
    ]
];

// number of cards
var nCard = 10;

// add several cards
function addCards() {
    var html = '';

    var i;
    for(i = 0; i < nCard; i++){
        var randomPark = Math.floor(Math.random() * data.length);
        var parkInfo = data[randomPark];
        html += getParkCard(parkInfo[0], parkInfo[2], parkInfo[1], parkInfo[3]) + '\n';
    }

    return html;
}


// Get the html of a card
function getParkCard(parkName, description, img, href) {
    var html = '';
    html += '<div class=\"shadowCard card\">';
    html += '<img class=\"shadowImg card-img-top img-fluid\" src=\"' + img + '\" alt=\"' + parkName + '\">';
    html += '<div class=\"card-body\">';
    html += '<h4 class=\"parkCardTitle card-title\">' + parkName + '</h4>';
    html += '<p class=\"parkCardText card-text\">'+ description + '</p>';
    html += '<div class=\"parkCardBtnContainer text-center\">';
    html += '<a href=\"' + href + '" class=\"btn btn-info parkCardBtn\">More Info</a>';
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
    insertHTML('parkCardsContainer', html);
}

// Run everything when the document loads.
window.onload = loadCardView;
