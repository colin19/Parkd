// pictures and description for the food trucks
var data = [
    ['Don Japanese Kitchen', '../static/img/trucks/food-trucks-1.jpg'
        , 'Japanese craft your own donburi spot with hefty portions'
    + ', creative toppings & novelty beverages.<br>'
    + '2716 Guadalupe St <br>' +
    + 'Comfort food · Quick bite · Fast service'],
    ['Song La', '../static/img/trucks/food-trucks-2.jpg'
        , 'Hip food truck offering pork belly buns, bubble tea & other'
    + ' traditional Taiwanese snack foods.<br>'
    + '411 W 23rd St'],
    ['Food Truck 3', '../static/img/trucks/food-trucks-3.jpg', 'This is Food Truck 3<br>Simple trailer with picnic tables for tacos with spit-grilled meats or veggie options, plus migas.<br>' +
    '1704 E Cesar Chavez St'],
    ['Food Truck 4', '../static/img/trucks/food-trucks-4.jpg', 'This is Food Truck 4<br>This food truck outside the Vortex theater dishes up old-school Italian standards & housemade pasta.<br>' +
    '2307 Manor Rd'],
    ['Food Truck 5', '../static/img/trucks/food-trucks-5.jpg', 'This is Food Truck 5<br> Asian Fusion Restaurant<br>' +
    'Casual eatery with retro flair known for banh mi tacos & other Asian-fusion fare & a whiskey menu.<br>' +
    '5520 Burnet Rd #100<br>'],
    ['Food Truck 6', '../static/img/trucks/food-trucks-6.jpg', 'This is Food Truck 6. Unit HP, 2806, 502 W 30th St<br>' +
    'Late-night food · Comfort food · Small plates'],
    ['Food Truck 7', '../static/img/trucks/food-trucks-7.jpg', 'This is Food Truck 7<br>Quirky hot-pink food trailer doling our Southern Louisiana-style street eats amid picnic tables.<br>' +
    '1016 E 6th St'],
    ['Food Truck 8', '../static/img/trucks/food-trucks-8.jpg', 'This is Food Truck 8.<br>Unit HP, 2806, 502 W 30th St'],
    ['Food Truck 9', '../static/img/trucks/food-trucks-9.jpg', 'This is Food Truck 9.<br>Unit HP, 2806, 502 W 30th St']
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
        html += getTruckCard(truckInfo[0], truckInfo[2], truckInfo[1]) + '\n';
    }

    return html;
}


// Get the html of a card
function getTruckCard(truckName, description, img) {
    var html = '';
    html += '<div class=\"shadowCard card\">';
    html += '<img class=\"shadowImg card-img-top img-fluid\" src=\"' + img + '\" alt=\"' + truckName + '\">';
    html += '<div class=\"card-body\">';
    html += '<h4 class=\"truckCardTitle card-title\">' + truckName + '</h4>';
    html += '<p class=\"truckCardText card-text\">'+ description + '</p>';
    html += '<div class=\"truckCardBtnContainer text-center\">';
    html += '<a href=\"truckDetail.html\" class=\"btn btn-info truckCardBtn\">More Info</a>';
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