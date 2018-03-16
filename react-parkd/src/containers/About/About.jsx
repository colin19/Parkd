import React, {Component} from 'react';

import IntroHeader from '../../components/intro-header/IntroHeader';
import Footer from '../../components/Footer/Footer';

import './About.css';

import bgImg from '../../images/about/bg.jpg';
import iconLin from '../../images/about/lin.png';
import iconAusten from '../../images/about/austen.png';
import iconColin from '../../images/about/colin.png';
import iconJavier from '../../images/about/javier.png';
import iconDiego from '../../images/about/diego.png';
import iconGijs from '../../images/about/gijs.png';


const aboutPageContent = {
    siteIntroTitle: 'About our site',
    siteIntro: 'We chose to focus on cities that are notoriously food-truck friendly and walkable. We envision a typical user experience to begin with one of two points of entry, either by scrolling through our parks or scrolling through our food trucks. Then, because of the proximity most trucks have to parks in major cities, consumers are likely to visit a food truck, and then enjoy their food at a park. It is in this assumption that we find our niche. Our users will be able to plan their days out before they leave for lunch or even adjust their plans on the fly as they get hungry. Another advantage our website has is the incorporation of pictures as a third model. In today\'s society, one of the best ways to get someone\'s attention is to mention or incorporate social media into a product. Our trucks and parks will be what brings a user to our site, but it is the aesthetic of the site- the google maps, the images scraped from instagram, and the connection between our models will turn new users into repeat users. Our website provides a service that fills a void in the consumer experience in the era of the food truck.',
    dataSourceTitle: 'Data Source and Interesting Result of Integrating Disparate data',
    dataSourceExplanation: 'Our site incorporated data from multiple API. Sometimes in order to fulfill the data requirements for a single truck or park, we\'d have to combine data from multiple API\'s like Google Places, Zomato, Yelp Fusion, and Streetfood. We also used Google Places API to generate a .JSON file of all of the parks in a city, and then we parsed through the list in order to isolate the data we needed. One such data, was the latitude and longitude coordinates which we would compare with those of the food trucks in order to find parks and trucks that are close to each other. This distance calculation was done via the Google Maps Distance API. Finally, we scraped Instagrams RESTful API for the pictures displayed on the pictures tab of our site.',
    toolsDescription: 'Multiple tools were incorporated into the development of our site. On the backend, we used tools like Postman and python code in order to scrape and organize our data. For this phase of the project, we organized the data into .csv files that the front end team could enter into the website statically. Other tools that were key to our project were GitHub and slack, we used both to maximize our collaboration as a team.',
};

const teamInfo = [
    ['Gijs Landwehr', iconGijs, 'Class of 2019', 'Drinks on average 2 gallons of milk a week.', 'Wrote the content on this page, tries and sometimes succeeds in being entertaining.', '0 commits 0 issue 0 unit tests']
    , ['Austen Castberg', iconAusten, 'Class of 2020', 'Drinks on average 4 gallons of milk a week.', 'Worked on backend.', '0 commits 2 issue 0 unit tests']
    , ['Colin Hall', iconColin, 'Class of 2019', 'Drinks on average 4 gallons of milk a week.', 'Also worked on backend.', '7 commits 0 issues 0 unit tests']
    , ['Javier Banda', iconJavier, 'Class of 2019', 'Milk deficient.', 'The third member of the backend team. The frontend people making this page don\'t quite know what that means.', '0 commits 1 issue 0 unit tests']
    , ['Diego Alcoz', iconDiego, 'Class of 2019', 'Occasional milk drinker.', 'Helped on frontend to put pages together, like this one.', '1 commit 1 issue 0 unit tests']
    , ['Lin Guan', iconLin, 'Class of 2020', 'Milk deficient. Drink tea everyday', 'Responsible for the overall look and feel of the website. If it looks good, it was Lin. If it looks bad, not Lin.', '21 commits 6 issues 0 unit tests']
];


export default class About extends Component{

    getPersonInfo(person){
        return (
                <div className='text-center'>
                    <img className='team-photo img-circle img-fluid' src={person[1]} alt='img'/>
                    <div>
                        <h4>{person[0]}</h4>
                        <p>{person[2]}</p>
                        <p>{person[3]}</p>
                        <p>{person[4]}</p>
                        <p>{person[5]}</p>
                    </div>
                </div>
        );
    }

    getTeamMemberInfo() {
        let members1 = [];
        let members2 = [];
        let i;
        for(i=0; i<teamInfo.length; i++){
            let person = teamInfo[i];
            if(i < 3){
                members1.push(<div key={i} className='col-sm-4'>{this.getPersonInfo(person)}</div>);
            }else{
                members2.push(<div key={i} className='col-sm-4'>{this.getPersonInfo(person)}</div>);
            }

        }
        return (
            <div className="info-grid container-fluid">
                <div id="team-info" className="row team-info">
                    {members1}
                </div>
                <div id="team-info" className="row team-info">
                    {members2}
                </div>
            </div>
        );
    }

    render(){
        return (
            <div>
                <IntroHeader bgUrl={bgImg}/>

                <div className="sectionDivider">
                    <br/>
                </div>

                <div className="websiteDescription">
                    <h1>{aboutPageContent.siteIntroTitle}</h1>
                    <br/>
                    <p>{aboutPageContent.siteIntro}</p>

                    <br/>
                    <br/>

                    <h1>{aboutPageContent.dataSourceTitle}</h1>
                    <br/>
                    <p>Some data sources:</p>
                    <ul>
                        <li>Zomato: https://developers.zomato.com/api</li>
                        <li>Streetfood: http://data.streetfoodapp.com/1.1/schedule/seattle</li>
                        <li>Google Places: https://maps.googleapis.com/maps/api/place/textsearch/json?query=parks+in+Austin&key=YOUR_API_KEY</li>
                        <li>Google Maps Distance API: https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=30.2670,-97.7729&destinations=30.2650472,-97.7315725&key=</li>
                    </ul>
                    <br/>
                    <p>{aboutPageContent.dataSourceExplanation}</p>
                    <br/>

                    <h1>Stat</h1>
                    <ul>
                        <li>total no. of commits: 54</li>
                        <li>total no. of issues: 8</li>
                        <li>total no. of unit tests: 0</li>
                    </ul>
                    <br/>
                    <h1>Tools</h1>
                    <ul>
                        <li>Postman</li>
                        <li>GitHub and Slack</li>
                        <li>Webstorm</li>
                        <li>Bootstrap</li>
                        <li>Flask</li>
                    </ul>
                    <p>{aboutPageContent.toolsDescription}</p>
                    <br/>
                    <h1>Links</h1>
                    <ul>
                        <li>Parkd Technical Report: <a href="https://www.gitbook.com/book/aecast/parkd-technical-report/details">https://www.gitbook.com/book/aecast/parkd-technical-report/details</a></li>
                        <li>Github Repository: <a href="https://github.com/colin19/Parkd">https://github.com/colin19/Parkd</a></li>
                    </ul>

                    <div className="sectionDivider">
                        <br/>
                    </div>
                </div>

                <div className="sectionDivider">
                    <br/>
                </div>
                <h1 className="team-photo-header">Group Members</h1>
                <br/>
                <br/>

                {/* Load team members info */}
                {this.getTeamMemberInfo()}

                <Footer/>
            </div>
        );
    }
}

