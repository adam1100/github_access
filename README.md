# Github Visualisation Project

I decided to examine the relationship between Contributors and Commits for a user's repositories. 
I chose this because I am interested in issues such as the Mythical-Man month by Fred Brooks who suggested that adding more workers to a late software engineering project increases complexity and thus takes more time to complete. Furthermore, it was interesting to investigate if the phrase "too many cooks spoil the broth" applies to the software engineering industry. 

I made the assumption the number of commits in a repository corresponds to the success of a repostiory, ie. the more commits, the "better" the repository. Obviously this is a flawed assumption but for the purposes of this exploration, commits represents success.

A user is entered in the search bar along with an api key, then the program retrieves each of their repositories. For each of these repositories, the number of contributors and commits is counted. This may take some time for larger repositories. A graph is then plotted.

For the repositories I searched, for example, adam1100, esjmb and phadej (this one took very long), I found that Contributors and Commits for repositories are positively correlated. That is, the higher number of contributors, the higher number of commits, and vice versa. This is not really surprising, however it does draw the conclusion that Fred Brooks mythical man month may not be completely true. A higher number of commits will generally result in more well polished, functioning code. Perhaps bigger teams contributing to a single project may be an option to increase performance and code efficiency, but it does bring higher complexity and introduction overhead. 

Note: Sometimes the text labels overlap for repositories with equal commits and contributors. This is annoying but unfortunately I could not get tooltips for the points functioning correctly.

## To run the program, you must have Docker installed and running.

In the project directory, you can run:

### `docker-compose up`

This will start the program on port 3000. To access this, run the command
### `docker-machine ip default`
to figure out the ip address of the docker machine. Then enter the ip followed by :3000 in the browser. For me, it was the following: 

http://192.168.99.101:3000/

## Alternatively, you can run the program by using the following npm commands

In the project directory, you can run:

### `npm install`
### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Example
![alt-text](https://github.com/adam1100/github_access/blob/master/visualisation.gif)
