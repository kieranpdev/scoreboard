
const Header = (props) => {
    return (
        <header>
            <h1>{ props.title }</h1>
            <span className="stats">Players: { props.totalPlayers }</span>
        </header>
    );
}

class Counter extends React.Component {

    state = {
        score: 0
    };

    /*    
    Use an arrow function to call React state methods otherwise 'this' will return undefined as the class extends a React component and loses the scope for 'this
    The prevState arrow function cause React to update the DOM immediately rather than storing updates to render in chunks
    */

    incrementScore = () => {
        this.setState( prevState => {
            return {
                score: prevState.score + 1
            }
        });
    }

    decrementScore = () => {
        this.setState( prevState => {
            return {
                score: prevState.score - 1
            }
        });
    }

    render(){
        return (
            <div className="counter">
                <button className="counter-action decrement" onClick={this.decrementScore}> - </button>
                <span className="counter-score">{ this.state.score }</span>
                <button className="counter-action increment" onClick={this.incrementScore}> + </button>
            </div>
        );
    }

}

const Player = (props) => {
    return (
        <div className="player">
            <span className="player-name">
            <button className="remove-player" onClick={ () => props.removePlayer(props.id) }>✖</button>
            {props.name}
            </span>

            <Counter />
        </div>
    );
}

/* 
The application state is set in the App component
Component state (local component state) belongs in the component itself
*/

class App extends React.Component {

    state = {
        players: [
            {
                name: "Guil",
                id: 1
                },
                {
                name: "Treasure",
                id: 2
                },
                {
                name: "Ashley",
                id: 3
                },
                {
                name: "James",
                id: 4
                }
        ]
    };

    handleRemovePlayer = (id) => {
        this.setState( prevState => {
            return {
                players: prevState.players.filter( p => p.id !== id )
            }

        });
    }

    render () {
        return (
            <div className="scoreboard">
                <Header 
                title="Scoreboard" 
                totalPlayers={this.state.players.length}
                />
    
                {/* Players list */}
                {this.state.players.map( player =>
                    <Player              
                        name={player.name}
                        id={player.id}
                        key={player.id.toString()}
                        removePlayer={this.handleRemovePlayer}
                    />
                )}
            </div>
        );
    }
    
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

