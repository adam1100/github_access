import React from 'react';
require('dotenv').config()

const token = 'yourapikey'
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
            user: 'adam1100',
            commitData: [],
            commitDataLoaded: false
        }
    }

    async componentDidMount() {

         await fetch(`https://api.github.com/users/${this.state.user}/repos`, {
            method: 'GET',
            headers: headers,
          })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    repos: json,
                })
            }).catch((err) => {
                console.log(err);
            });
        
         await fetch(`https://api.github.com/repos/${this.state.user}/inventory-tracker2/commits`, {
            method: 'GET',
            headers: headers,
          })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    commits: json,
                })
            }).catch((err) => {
                console.log(err);
            });

            const repos = this.state.repos;
            var commitData = [];
            var numCommits;

      for(var i = 0; i < repos.length; i++) {
        var repoName = repos[i].name;
        console.log(repoName);

         await fetch(`https://api.github.com/repos/${this.state.user}/${repoName}/commits`)
        .then(response => {
            return response.json()
        }).then(json => {
            numCommits = json.length;
        })
        .catch((error) => console.error(error));
    
        var data = { repoName: repoName, commits: numCommits };
        commitData.push(data);
    }
        console.log(commitData[0])
        console.log(commitData[1])
        console.log(commitData[2])
        console.log(commitData[3])
        console.log(commitData[4])
    
        this.setState({
            isLoaded: true,
            commitData: commitData,
        })
    }

    render() {
 
        const { isLoaded, repos, commits, commitData } = this.state;
        if (!isLoaded)
            return <div>Loading...</div>;

        return (
            <div className="App">
                <ul>
                  Number of commits:{commits.length} <br />
                  Number of repos:{repos.length} <br />
                    {commitData.map(commitData => (
                        <li key={commitData.repoName}>
                            Name: {commitData.repoName} <br />
                            Commits: {commitData.commits}
                   
                        </li>
                    ))}
                </ul>
                <br />
            </div>
        );

    }

}

export default App;