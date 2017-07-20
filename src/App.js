import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            txt: "this is the state text",
            cat: 0,
            currentEvent: '---',
            a: '',
            val: 0


        }
        this.update2 = this.update2.bind(this)
        this.update3 = this.update3.bind(this)
    }
    update(e) {
        this.setState({txt: this.refs.b.value, a: this.a.refs.input.value})
    }
    update2(e) {
        this.setState({currentEvent: e.type})
    }
    update3(){
        this.setState({val: this.state.val + 1})
    }
    componentWillMount(){
        console.log("Wil Mount");
        this.setState({m: 2})
    }
    componentDidMount(){
        console.log("Did Mount");
        this.inc = setInterval(this.update3,1000)
    }
    componentWillUnmount(){
        console.log("Unmounting");
        clearInterval(this.inc)
    }
    render(){
        console.log("render firing up");
        return(
            <div>
            <input type="text" ref="b" onChange={this.update.bind(this)}/>
            <h1>{this.state.txt}</h1>
            <h2>{this.props.txt}</h2>
            <p><Button>I<Heart/>React</Button></p>
            <div><Title text="Karanveer"/></div>
            <textarea onKeyPress={this.update2} onCopy={this.update2}/>
            <h2>{this.state.currentEvent}</h2>
            <div>
            <Input update={this.update.bind(this)} ref={ component => this.a = component} /> {this.state.a}
            </div>

            <button onClick={this.update3}>{this.state.val * this.state.m }</button>
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

const Title = (props) => <p>Raju &hearts; {props.text}</p>
    Title.propTypes = {
        text(props, propName, component){
            if (props[propName].length < 6) {
                return new Error('Length of ${propName}')
            }

        }
    }

class Input extends React.Component {
    render(){
        return <div><input type="text" ref="input" onChange={this.props.update}/></div>
    }
}

class Wrapper extends React.Component {
    mount(){
        ReactDOM.render(<App/>, document.getElementById("a"));
    }
    unmount(){
        ReactDOM.unmountComponentAtNode(document.getElementById("a"));
    }
    render(){
        return(
            <div>
            <button onClick={this.mount.bind(this)}>Mount</button>
            <button onClick={this.unmount.bind(this)}>UnMount</button>
            <div id="a"></div>
            </div>)
    }
}
export default Wrapper
