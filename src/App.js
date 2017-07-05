import React from 'react';

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            txt: "this is the state text",
            cat: 0,
            currentEvent: '---'
        }
        this.update2 = this.update2.bind(this)
    }
    update(e) {
        this.setState({txt: e.target.value})
    }
    update2(e) {
        this.setState({currentEvent: e.type})
    }
    render(){
        return(
                <div>
                <input type="text" onChange={this.update.bind(this)}/>
                <h1>{this.state.txt}</h1>
                <h2>{this.props.txt}</h2>
                <p><Button>I<Heart/>React</Button></p>
                <p><Title text="Karanveer"/></p>
                <textarea onKeyPress={this.update2} onCopy={this.update2}/>

                <h2>{this.state.currentEvent}</h2>
                </div>
              )
    }
}
const Button = (props) => <button>{props.children}</button>

class Heart extends React.Component {
    render() {
        return <span>&hearts;</span>
    }
}

const Title = (props) => <h1>Raju &hearts; {props.text}</h1>
Title.propTypes = {
    text(props, propName, component){
        if (props[propName].length < 6) {
            return new Error('Length of ${propName}')
        }

    }
}


export default App
