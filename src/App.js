import React from 'react';

class App extends React.Component {
    render(){
        return(
                <div>
                    <h1>Hello</h1>
                    <h2>{this.props.txt}</h2>
                </div>
              )
    }
}

// const App = () => <h1>not displaying</h1>

export default App
