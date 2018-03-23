var teamInfo = [
    ['Gijs Landwehr', '../static/img/about/gijs.png', 'Class of 2019', 'Drinks on average 2 gallons of milk a week.', 'Wrote the content on this page, tries and sometimes succeeds in being entertaining.', '0 commits 0 issue 0 unit tests']
    , ['Austen Castberg', '../static/img/about/austen.png', 'Class of 2020', 'Drinks on average 4 gallons of milk a week.', 'Worked on backend.', '0 commits 2 issue 0 unit tests']
    , ['Colin Hall', '../static/img/about/colin.png', 'Class of 2019', 'Drinks on average 4 gallons of milk a week.', 'Also worked on backend.', '7 commits 0 issues 0 unit tests']
    , ['Javier Banda', '../static/img/about/javier.png', 'Class of 2019', 'Milk deficient.', 'The third member of the backend team. The frontend people making this page don\'t quite know what that means.', '0 commits 1 issue 0 unit tests']
    , ['Diego Alcoz', '../static/img/about/diego.png', 'Class of 2019', 'Occasional milk drinker.', 'Helped on frontend to put pages together, like this one.', '1 commit 1 issue 0 unit tests']
    , ['Lin Guan', '../static/img/about/lin.png', 'Class of 2020', 'Milk deficient. Drink tea everyday', 'Responsible for the overall look and feel of the website. If it looks good, it was Lin. If it looks bad, not Lin.', '21 commits 6 issues 0 unit tests']
];

function getTeamInfo(){
    var html = '';
    var i;
    for(i=0; i<teamInfo.length; i++){
        var person = teamInfo[i];
        html += '<div class="col-sm-4">';
        html += '<div class="text-center">';
        html += '<img class="team-photo rounded-circle img-fluid" src="' + person[1] + '" alt="John Nordboe">';
        html += '<div>';
        html += '<h5>' + person[0] + '</h5>';
        html += '<p>' + person[2] + '</p>';
        html += '<p>' + person[3] + '</p>';
        html += '<p>' + person[4] + '</p>';
        html += '<p>' + person[5] + '</p>';
        html += '</div></div></div>';
    }
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
function loadTeamInfo() {
    var info = getTeamInfo();
    insertHTML('team-info', info);
}

// Run everything when the document loads.
window.onload = loadTeamInfo;