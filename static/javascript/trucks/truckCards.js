// pictures and description for the food trucks
var data = [
    [
        '808 Grinds', '../static/img/trucks/grinds1.png'
        , 'Awesome place to eat in Downtown Portland! <br>815 SW Park Ave, Portland, OR 97205, USA'
        , 'trucks/grinds.html'
    ],
    [
        'The Mighty Cone', '../static/img/trucks/themightycone1.png'
        , 'THIS PLACE IS DELICIOUS!!! Recommend the chicken cone and the cheese sticks. Mmm! <br>2100 Barton Springs Rd, Austin, TX 78704'
        , 'trucks/mightyCone.html'
    ],
    [
        'Pinch', '../static/img/trucks/pinch1.png'
        , 'an urban food lab established in winter 2016 by Yuzhuo Liu <br>518 W 24th St, Austin, TX 78703'
        , 'trucks/pinch.html'
    ]
];

// number of cards
var nCard = 20;

// add several cards
function addCards() {
    var html = '';

    var i;
    for(i = 0; i < nCard; i++){
        var randomTruck = Math.floor(Math.random() * data.length);
        var truckInfo = data[randomTruck];
        html += getTruckCard(truckInfo[0], truckInfo[2], truckInfo[1], truckInfo[3]) + '\n';
    }

    return html;
}


// Get the html of a card
function getTruckCard(truckName, description, img, link) {
    var html = '';
    html += '<div class=\"shadowCard card\">';
    html += '<img class=\"shadowImg card-img-top img-fluid\" src=\"' + img + '\" alt=\"' + truckName + '\">';
    html += '<div class=\"card-body\">';
    html += '<h4 class=\"truckCardTitle card-title\">' + truckName + '</h4>';
    html += '<p class=\"truckCardText card-text\">'+ description + '</p>';
    html += '<div class=\"truckCardBtnContainer text-center\">';
    html += '<a href=\"' + link + '\" class=\"btn btn-info truckCardBtn\">More Info</a>';
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
    insertHTML('truckCardsContainer', html);
}

// Run everything when the document loads.
window.onload = loadCardView;
