import React from 'react';
import ReactDOM from 'react-dom';

const HOC = (InnerComponent) => class extends React.Component {
    constructor(){
        super();
        this.state = {count: 0}
    }
    update(){
        this.setState({count: this.state.count + 1})
    }
    componentWillMount(){
        console.log("HOC mounted")
    }
    render(){
        return(
            <InnerComponent {...this.props} {...this.state} update= {this.update.bind(this)}/>
        )
    }
}

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            txt: "this is the state text",
            cat: 0,
            currentEvent: '---',
            a: '',
            val: 0,
            red: 0,
            blue: 0,
            green: 0


        }
        this.update2 = this.update2.bind(this)
        this.update3 = this.update3.bind(this)
        this.update4 = this.update4.bind(this)
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
    update4(e){
        this.setState({
            red: ReactDOM.findDOMNode(this.refs.red.refs.inp).value,
            blue: ReactDOM.findDOMNode(this.refs.blue.refs.inp).value,
            green: ReactDOM.findDOMNode(this.refs.green.refs.inp).value
    })}
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
            <StarWars/>
            <Button2>Dbao mujhe</Button2>
            <br/>
            <LabelHOC>Dont touch me</LabelHOC>
            <p>
            <Parent>
                <div className="Raju">
                </div>
                <div className="Mighty"></div>
            </Parent>
            </p>
            <p>
            <Buttons>
            <button value="A">A</button>
            <button value="B">B</button>
            <button value="C">C</button>
            
            </Buttons>
            </p>

            <Slider ref="red" update4={this.update4}/>
            {this.state.red}
            <Slider ref="blue" update4={this.update4}/>
            {this.state.blue}
            <Slider ref="green" update4={this.update4}/>
            {this.state.green}
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
    mount2(){
        ReactDOM.render(<JSX/>,document.getElementById("b"));
   }
    unmount(){
        ReactDOM.unmountComponentAtNode(document.getElementById("a"));
    }
    unmount2(){
        ReactDOM.unmountComponentAtNode(document.getElementById("b"));
    }
    render(){
        return(
            <div>
            <h2>Will</h2>
            <button onClick={this.mount.bind(this)}>Mount</button>
            <button onClick={this.unmount.bind(this)}>UnMount</button>
            <button onClick={this.mount2.bind(this)}>JSX</button>
            <button onClick={this.unmount2.bind(this)}>UnMount</button>
            <div id="a"></div>
            <div id="b"></div>
            </div>)
    }
}

class JSX extends React.Component {
    constructor(){
        super();
        this.state = {
            input: '/* add your input here.. */',
            output: '',
            err: ''
        }
    }
    update(e){
        let code = e.target.value;
        try {
            this.setState({
                output: window.Babel.transform(code,{ presets: ['es2015','react']}).code,
                err: ''
            })
        }
        catch(err){
            this.setState({err: err.message})
        }
    }

    render(){
        return(
            <div>
                <header>{this.state.err}</header>
            <div className="container">
                <textarea onChange={this.update.bind(this)} defaultValue={this.state.input}/>
                
            </div>
            <pre>
                {this.state.output}
            </pre>
            <p>
            <Parent>
                <div className="Raju">
                </div>
                <div className="Mighty"></div>
            </Parent>
            </p>
            </div>
        )
    }
}

class StarWars extends React.Component {
    constructor(){
        super();
        this.state = { items: []}
    }
    componentWillMount() {
        fetch('http://swapi.co/api/people/?format=json')
        .then( response => response.json() )
        .then ( ({results: items}) => this.setState({items}))

    }
    filter(e){
        this.setState({filter: e.target.value})
    }
    render(){
        let items = this.state.items
        if(this.state.filter){
            items = items.filter( item => 
            item.name.toLowerCase()
            .includes(this.state.filter.toLowerCase()))

        }
        return (
            <div>
                <input type="text" onChange={this.filter.bind(this)}/>
                {items.map(item => 
                    <Person key={item.name} person={item}/>)}
            </div>
        )
    }
}

const Button2 = HOC((props) => <button onClick={props.update}>{props.children}-{props.count}</button>)

class Label extends React.Component {
    componentWillMount(){
        console.log("Label mounted")
    }
    render(){
        return(
            <label onMouseMove = {this.props.update}>{this.props.children}- {this.props.count}</label>
        )
    }
}

class Parent extends React.Component {
    render(){
        let items = React.Children.forEach(this.props.children, child => console.log(child.props.className))
        return null
    }
}

class Buttons extends React.Component {
    constructor(){
        super();
        this.state = {selected: 'None'}
    }
    selectItem(selected){
        this.setState({selected})
    }

    render(){
        let fn = child => React.cloneElement(child, { onClick: this.selectItem.bind(this,child.props.value)})
        let items = React.Children.map(this.props.children, fn)
        return(
            <div>
             <h3>You have selected: {this.state.selected}</h3>
            {items}
            </div>
        )
    }
}

class Slider extends React.Component {
    render(){
        return(
            <div>
            <input ref="inp" type="range" min="0" max="200" onChange={this.props.update4}/>
            </div>
        )
    }
}

const LabelHOC = HOC(Label)
const Person = (props) => <h4>{props.person.name}</h4>
export default Wrapper


