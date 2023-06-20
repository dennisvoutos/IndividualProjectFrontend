import { Component } from "react";

class NewApp extends Component{
    constructor(props){
        super(props);
        this.state = {
            items:[],
            isLoaded:false
        }
    }
    componentDidMount (){
        fetch('http://localhost:4000/users')
        .then(res => res.json())
        .then(json => {
            this.setState({
                isLoaded:true,
                items:json
            })
        })
    }
    render(){
        var {isLoaded,items} = this.state;
        if(!isLoaded){
            return <div>Loading.....</div>
        }else{
        return(
            <div>
                <ul>
                    {items.map(item => (
                        <li key ={item.id}>
                            Email: {item.email}  | Username: {item.username}
                        </li>
                    ))};
                </ul>
            </div>
        );
        }
    }
    
}
export default NewApp;