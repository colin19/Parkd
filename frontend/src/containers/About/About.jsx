import React, {Component} from 'react';
import { Card, CardBody, Container, ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios';

import IntroHeader from '../../components/intro-header/IntroHeader.jsx';
import Footer from '../../components/Footer/Footer.jsx';

import './About.css';

import bgImg from '../../images/about/bg.jpg';
import iconLin from '../../images/about/lin.png';
import iconAusten from '../../images/about/austen.png';
import iconColin from '../../images/about/colin.png';
import iconJavier from '../../images/about/javier.png';
import iconDiego from '../../images/about/diego.png';
import iconGijs from '../../images/about/gijs.png';

// some description of our website used in the About page
const aboutPageContent = {
    siteIntroTitle: 'About Parkd',
    siteIntro: 'We chose to focus on cities that are notoriously food-truck friendly and walkable. We envision a typical user experience to begin with one of two points of entry, scrolling through either our parks or food trucks. Because of the proximity most trucks in major cities have to parks, consumers are likely to want to visit a food truck then enjoy their food at a nearby park. This is the niche we fill. With our site, our users are able to plan their days out before they leave for lunch or even adjust their plans on the fly as they change their minds. One advantage our website has is the incorporation of pictures from social media as a third model. In today\'s society, one of the best ways to get someone\'s attention is to mention or incorporate social media into a product. Our major offering of connecting trucks and parks will bring new users to our site, but the aesthetic of the site - the fully-featured maps, the gorgeous images, and the connection between our models - will keep them coming back. Our website provides a service that fills a void in the consumer experience in the era of the domination of food trucks.',
    dataSourceTitle: 'Data Sources & Integration of Disparate Data',
    dataSourceExplanation: 'Our site incorporated data from multiple APIs. In order to fulfill the data requirements for a single truck or park, we had to combine data from APIs like Google Places, Zomato, Yelp Fusion, and Streetfood. We used the Google Places API to generate a .JSON file of all of the parks in a city and parsed through the list in order to isolate the data we needed. Some important data were the latitude and longitude coordinates which we would compare with those of the food trucks in order to find parks and trucks that are close to each other; this calculation was done via the Google Maps Distance API. Finally, we scraped Instagram\'s RESTful API for the pictures displayed on the Pictures tab.',
    statsTitle: 'Stats',
    toolsTitle: 'Tools',
    toolsDescription: 'Multiple tools were incorporated into the development of our site. On the backend, we used tools like Postman and Python in order to scrape and organize our data. Other tools that were key to our project were GitHub and Slack; we used both to maximize our collaboration efforts as a team.',
    linksTitle: 'Links',
};

// team member information
const teamInfo = [
    ['Gijs Landwehr', iconGijs, 'Class of 2019', '', 'Another 3rd year CS student from UT Austin. Spends most of his free time teaching and travelling across the state for robotics competition.', 8]
    , ['Austen Castberg', iconAusten, 'Class of 2020', '', 'Worked on backend.', 0]
    , ['Colin Hall', iconColin, 'Class of 2019', '', 'A 3rd year computer science major at UT. Has no hobbies. Worked on the backend. Developed UML Diagram.', 22]
    , ['Javier Banda', iconJavier, 'Class of 2019', '', 'A 3rd year computer science major from the University of Texas. Hobbies include playing basketball and eating lots of food. Worked on the backend of this project. Among other duties, responsible for populating backend database.', 22]
    , ['Diego Alcoz', iconDiego, 'Class of 2019', '', 'Likes to program in his spare time. What a weirdo. Worked mostly on frontend, but helped with backend stuff when necessary.', 22]
    , ['Lin Guan', iconLin, 'Class of 2020', '', 'Responsible for the overall look and feel of the website. If it looks good, it was Lin. If it looks bad, it wasn\'t.', 18]
];

const GithubId2MemberId = {'gijsland': 0, 'aecast': 1, 'colin19': 2, 'jbanda11': 3,'dalcoz': 4, 'GuanSuns': 5};

/**
 * The About page
 * It gets the github statistics by GitHub API
 */
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
        let {nHttpRequest} = this.state;
        nHttpRequest = 0;
        this.setState({nHttpRequest});

        this.fetchGithubStat();
    }

    /* Send asynchronous request to Github*/
    fetchGithubStat(){
        // return if exceed the maximum number of requests
        if(this.state.nHttpRequest > 5){
            return;
        }

        const githubRepo = 'https://api.github.com/repos/colin19/Parkd';
        try{
            // The request for count of issues
            axios.get(githubRepo + '/issues?state=all')
                .then(res => {
                    this.updateGithubIssues(res.data);
                }).catch((error) => {
                console.log(error)
            });
            // The request for count of contribution
            axios.get(githubRepo + '/stats/contributors')
                .then(res => {
                    this.updateGithubCommit(res.data);
                }).catch((error) => {
                console.log(error)
            });

            //this.state.nHttpRequest += 1;
            let {nHttpRequest} = this.state;
            nHttpRequest += 1;
            this.setState({nHttpRequest});
        } catch (error){
            console.log("Error during sending request to Github");
        }
    }

    /* The handler of the issue count response*/
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

            // if it's a failing request, re-send the request again
            if(nTotalIssues === 0){
                this.fetchGithubStat();
                return;
            }

            this.setState({issues: issues, totalIssues: nTotalIssues});
        } catch (error) {
            console.log("Error during updating Github issues");
        }

    }

    /* The handler of the commit count response*/
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

            // if it's a failing request, re-send the request again
            if(nTotalCommit === 0){
                this.fetchGithubStat();
                return;
            }

            this.setState({commits: commits, totalCommit: nTotalCommit});
        } catch (error) {
            console.log("Error during updating Github commits");
        }

    }

    /* Generate the personal info on the About page*/
    getPersonInfo(person, id){
        return (
            <Card className='h-100'>
                <div className='text-center'>
                    <img className='team-photo rounded-circle img-fluid' src={person[1]} alt='img'/>
                </div>
                <CardBody>
                    <div>
                        <h3>{person[0]}</h3>
                        <h5>{person[2]}</h5>
                        <p>{person[4]}</p>
                        <p><strong>Unit tests:</strong> {person[5]}</p>
                        <p><strong>Commits:</strong> {this.state.commits[id]}</p>
                        <p><strong>Issues:</strong> {this.state.issues[id]}</p>
                    </div>
                </CardBody>
            </Card>
        );
    }

    /* Generate the member info (group of personal info) on the About page*/
    getTeamMemberInfo() {
        let members = [];
        let i;
        for(i=0; i<teamInfo.length; i++){
            let person = teamInfo[i];
            members.push(<div key={i} className='col-sm-6 col-md-4 py-sm-3'>{this.getPersonInfo(person, i)}</div>);
        }
        return (
            <div id="team-info" className="row team-info justify-content-center">
                {members}
            </div>
        );
    }

    render(){
        return (
            <div>
                <IntroHeader bgUrl={bgImg}
                             description={'The team behind Parkd.US'}
                             title={'About us'}/>

                <Container>
                    <h2 className="mt-4 mb-3 text-center">The Team</h2>

                    {/* Load team members info */}
                    {this.getTeamMemberInfo()}

                    {/* website introduction */}
                    <h2 className="mt-4 mb-3">{aboutPageContent.siteIntroTitle}</h2>
                    <p>{aboutPageContent.siteIntro}</p>

                    {/* data source introduction */}
                    <h2 className="mt-4 mb-3">{aboutPageContent.dataSourceTitle}</h2>
                    <p>Some of our data sources:</p>
                    <ListGroup>
                        <ListGroupItem tag="a" href="https://developers.zomato.com/api">Zomato</ListGroupItem>
                        <ListGroupItem tag="a" href="http://data.streetfoodapp.com">Streetfood</ListGroupItem>
                        <ListGroupItem tag="a" href="https://developers.google.com/maps/">Google Places</ListGroupItem>
                        <ListGroupItem tag="a" href="https://developers.google.com/maps/web-services/">Google Maps Distance API</ListGroupItem>
                    </ListGroup>
                    <p/>
                    <p>{aboutPageContent.dataSourceExplanation}</p>

                    {/* Github stat */}
                    <h2 className="mt-4 mb-3">{aboutPageContent.statsTitle}</h2>
                    <ListGroup>
                        <ListGroupItem>total no. of commits: {this.state.totalCommit}</ListGroupItem>
                        <ListGroupItem>total no. of issues: {this.state.totalIssues}</ListGroupItem>
                        <ListGroupItem>total no. of unit tests: 92</ListGroupItem>
                    </ListGroup>

                    {/* tools introduction */}
                    <h2 className="mt-4 mb-3">{aboutPageContent.toolsTitle}</h2>
                    <ListGroup>
                        <ListGroupItem tag="a" href="https://www.getpostman.com/">Postman</ListGroupItem>
                        <ListGroupItem tag="a" href="https://github.com/">GitHub</ListGroupItem>
                        <ListGroupItem tag="a" href="https://slack.com/">Slack</ListGroupItem>
                        <ListGroupItem tag="a" href="https://www.jetbrains.com/webstorm/">Webstorm</ListGroupItem>
                        <ListGroupItem tag="a" href="https://getbootstrap.com/">Bootstrap</ListGroupItem>
                        <ListGroupItem tag="a" href="https://reactstrap.github.io/">Reactstrap</ListGroupItem>
                        <ListGroupItem tag="a" href="http://flask.pocoo.org/">Flask</ListGroupItem>
                        <ListGroupItem tag="a" href="https://aws.amazon.com/ec2/">Amazon EC2</ListGroupItem>
                        <ListGroupItem tag="a" href="https://aws.amazon.com/route53/">Route 53</ListGroupItem>
                        <ListGroupItem tag="a" href="https://dev.mysql.com/doc/workbench/en/">MySQL Workbook</ListGroupItem>
                        <ListGroupItem tag="a" href="https://www.sqlalchemy.org/">SQLAlchemy</ListGroupItem>
                        <ListGroupItem tag="a" href="https://www.npmjs.com/package/axios">Axios</ListGroupItem>
                        <ListGroupItem tag="a" href="https://bvaughn.github.io/react-highlight-words/">React-Highlight-Words</ListGroupItem>
                    </ListGroup>
                    <p/>
                    <p>{aboutPageContent.toolsDescription}</p>

                    {/* links */}
                    <h2 className="mt-4 mb-3">{aboutPageContent.linksTitle}</h2>
                    <ListGroup>
                        <ListGroupItem tag="a" href="https://www.gitbook.com/book/jbanda11/api-documentation/details">API Documentation</ListGroupItem>
                        <ListGroupItem tag="a" href="https://www.gitbook.com/book/jbanda11/technical-report/details">Parkd Technical Report</ListGroupItem>
                        <ListGroupItem tag="a" href="https://github.com/colin19/Parkd">GitHub Repository</ListGroupItem>
                        <ListGroupItem tag="a" href="https://www.gitbook.com/book/jbanda11/self-critique/details">Self Critique</ListGroupItem>
                        <ListGroupItem tag="a" href="https://www.gitbook.com/book/jbanda11/other-critique/details">Other Critique</ListGroupItem>
                        <ListGroupItem tag="a" href="https://travis-ci.org/colin19/Parkd">Travis CI</ListGroupItem>
                        <ListGroupItem tag="a" href="parkd.us/visual">Data Visualization</ListGroupItem>
                    </ListGroup>
                </Container>
                <Footer/>
            </div>
        );
    }
}