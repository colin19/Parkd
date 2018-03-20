import React, {Component} from 'react';
import axios from 'axios';

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
    ['Gijs Landwehr', iconGijs, 'Class of 2019', 'Drinks on average 2 gallons of milk a week.', 'Wrote the content on this page, tries and sometimes succeeds in being entertaining.', 'Unit Tests: 0']
    , ['Austen Castberg', iconAusten, 'Class of 2020', 'Drinks on average 4 gallons of milk a week.', 'Worked on backend.', 'Unit Tests: 0']
    , ['Colin Hall', iconColin, 'Class of 2019', 'Drinks on average 4 gallons of milk a week.', 'Also worked on backend.', 'Unit Tests: 0']
    , ['Javier Banda', iconJavier, 'Class of 2019', 'Milk deficient.', 'The third member of the backend team. The frontend people making this page don\'t quite know what that means.', 'Unit Tests: 0']
    , ['Diego Alcoz', iconDiego, 'Class of 2019', 'Occasional milk drinker.', 'Helped on frontend to put pages together, like this one.', 'Unit Tests: 0']
    , ['Lin Guan', iconLin, 'Class of 2020', 'Milk deficient. Drink tea everyday', 'Responsible for the overall look and feel of the website. If it looks good, it was Lin. If it looks bad, not Lin.', 'Unit Tests: 0']
];

const GithubId2MemberId = {'aecast': 1, 'dalcoz': 4, 'GuanSuns': 5, 'XS2929': 4};

export default class About extends Component{
    constructor(props) {
        super(props);
        this.state = {
            commits: Array(6).fill(0),
            issues: Array(6).fill(0),
            totalCommit: 0,
            totalIssues: 0,
            nHttpRequest: 0,
        };
    }

    componentDidMount() {
        this.state.nHttpRequest = 0;
        this.fetchGithubStat();
    }

    fetchGithubStat(){
        // return if exceed the maximum number of requests
        if(this.state.nHttpRequest > 5){
            return;
        }

        const githubRepo = 'https://api.github.com/repos/colin19/Parkd';
        try{
            axios.get(githubRepo + '/issues?state=all')
                .then(res => {
                    this.updateGithubIssues(res.data);
                }).catch((error) => {
                console.log(error)
            });
            axios.get(githubRepo + '/stats/contributors')
                .then(res => {
                    this.updateGithubCommit(res.data);
                }).catch((error) => {
                console.log(error)
            });

            this.state.nHttpRequest += 1;
        } catch (error){
            console.log("Error during sending request to Github");
        }
    }

    updateGithubIssues(resultIssue){
        try {
            const issues = new Array(6);
            issues.fill(0);
            let nTotalIssues = resultIssue.length;

            let i;
            for(i=0; i<nTotalIssues; i++){
                let person = resultIssue[i];
                let strGit = person.user.login;
                let personId = GithubId2MemberId[strGit];
                let nIssues = issues[personId];
                nIssues = nIssues + 1;
                issues[personId] = nIssues;
            }

            if(nTotalIssues === 0){
                this.fetchGithubStat();
                return;
            }

            this.setState({issues: issues, totalIssues: nTotalIssues});
        } catch (error) {
            console.log("Error during updating Github issues");
        }

    }

    updateGithubCommit(resultCommit) {
        try{
            const commits = this.state.commits.slice();
            let nTotalCommit = 0;

            let i;
            for(i=0; i<resultCommit.length; i++){
                let person = resultCommit[i];
                let nCommit = person.total;
                let strGit = person.author.login;
                let personId = GithubId2MemberId[strGit];

                commits[personId] = nCommit;
                nTotalCommit = nTotalCommit + nCommit;
            }

            if(nTotalCommit === 0){
                this.fetchGithubStat();
                return;
            }

            this.setState({commits: commits, totalCommit: nTotalCommit});
        } catch (error) {
            console.log("Error during updating Github commits");
        }

    }

    getPersonInfo(person, id){
        return (
                <div className='text-center'>
                    <img className='team-photo rounded-circle img-fluid' src={person[1]} alt='img'/>
                    <div>
                        <h5>{person[0]}</h5>
                        <p>{person[2]}</p>
                        <p>{person[3]}</p>
                        <p>{person[4]}</p>
                        <p>{person[5]}</p>
                        <p>Commits: {this.state.commits[id]}</p>
                        <p>Issues: {this.state.issues[id]}</p>
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
                members1.push(<div key={i} className='col-sm-4'>{this.getPersonInfo(person, i)}</div>);
            }else{
                members2.push(<div key={i} className='col-sm-4'>{this.getPersonInfo(person, i)}</div>);
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
                <IntroHeader bgUrl={bgImg}
                             description={'The team behind Parkd.US'}
                             title={'About us'}/>

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
                        <li>total no. of commits: {this.state.totalCommit}</li>
                        <li>total no. of issues: {this.state.totalIssues}</li>
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

