import React from 'react';

class App extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            items: [],
            isLoaded: false
        }

    }

    componentDidMount() {

        fetch('https://api.github.com/users/adam1100/repos')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    items: json,
                    isLoaded: true, 
                })
            }).catch((err) => {
                console.log(err);
            });

    }

    render() {

        const { isLoaded, items } = this.state;

        if (!isLoaded)
            return <div>Loading...</div>;

        return (
            <div className="App">
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            Name: {item.name}
                        </li>
                    ))}
                </ul>
            </div>
        );

    }

}

export default App;