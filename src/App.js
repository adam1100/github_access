import React from 'react';
import Form from "./components/Form";
import Graph from "./components/Graph";
import './App.css';

require('dotenv').config()

const token = 'API Token'
const headers = {
    "Authorization" : "Token " + token
};

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            repos: [],
            commits: [],
            isLoaded: false,
            user: '',
            commitData: [],
            commitDataLoaded: false,
            contributors: []
        }
    }

    getUser = async (e) => {
        e.preventDefault();
        const username = e.target.elements.userName.value;
        await this.setState({
            user: username,
        }) 
        console.log("State user: ", this.state.user);
        e.preventDefault();
        var repos3 = await this.pageRequest
        (`https://api.github.com/users/${this.state.user}/repos?&per_page=100&page=`);
        this.setState({
            repos: repos3,
        }) 

        const repos = this.state.repos;
        var commitData = [];
        console.log(repos.length)
       
        for(var i = 0; i < repos.length; i++) {
        var repoName = repos[i].name;
        console.log(repoName);

   
        var commitArray = await this.pageRequest
        (`https://api.github.com/repos/${this.state.user}/${repoName}/commits?&per_page=100&page=`);

        var contributorsArray  = await this.pageRequest
        (`https://api.github.com/repos/${this.state.user}/${repoName}/contributors?&per_page=100&page=`);

        var data = { repoName: repoName, commits: commitArray.length, contributors: contributorsArray.length };
        commitData.push(data);
    }

        this.setState({
            isLoaded: true,
            commitData: commitData,
        })
      }

    async pageRequest(url){
        const baseUrl = url;
        var size;
        let finished = false;
        let page = 1;
        let repos1 = [];
        let lastResult = [];
        do {
          try {
            const resp = await fetch(`${baseUrl}${page}`, {
                method: 'GET',
                headers: headers,
              });

            const data = await resp.json();
            lastResult = data;
            repos1.push(data);
            size = lastResult.length;
            page++;

          } catch (err) {
            console.error(`Oeps, sometshing is wrong ${err}`);
          }
          if(size < 100){
              finished = true;
          }
        } while (!finished );
        var repos2 = [].concat.apply([], repos1);
        return repos2;
    }
    
    render() {
        const { isLoaded, repos, commits, commitData } = this.state;
      
        return (
            <div className="App"> 
            <div className="searchBar"> 
            <Form getUser={this.getUser} />
            </div> 
            {!isLoaded ? <div> Enter Github user </div>: 
            <div> 
                <Graph data={commitData} />
   
                <br />
            </div>
            } 
         
            </div>

        );

    }

}

export default App;