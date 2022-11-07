import React , {Component} from 'react'
import './predictor.css'
const axios = require('axios').default;

class Predictor extends Component{

    constructor(props){
        super(props);
        this.state = {
            "passg": '',
            "male": '',
            "female": '',
            "kids": '',
            "nonveg_pas": '',
            "flight_dur": '',
            "day_night": '',
            "bus_class": '',
            "prediction" : ''
        }
        this.callApi = this.callApi.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.reset = this.reset.bind(this)

    }

    async callApi(evt){
        evt.preventDefault()
        let res = await axios.post('http://127.0.0.1:8000/predict' , {
            "passg": this.state.passg,
            "male": this.state.male,
            "female": this.state.female,
            "kids": this.state.kids,
            "nonveg_pas": this.state.nonveg_pas,
            "flight_dur": this.state.flight_dur,
            "day_night": this.state.day_night,
            "bus_class": this.state.bus_class
          })
          let pred = res.data.prediction
          let predi = `$ ${String(pred).split('.')[0]}`
          this.setState({
            "prediction" : predi
        })       
    }

    handleChange(evt){
        this.setState({
            [evt.target.name] : Number(evt.target.value)
        })
    }
    reset(){
        this.setState({
            "passg": '',
            "male": '',
            "female": '',
            "kids": '',
            "nonveg_pas": '',
            "flight_dur": '',
            "day_night": '',
            "bus_class": '',
            "prediction" : ''
          })
    }


    render(){

        return(
            <div className = 'predictor'>
                <h1 className='predictor_h1'>AIRLINES CATERING EXPENDITURE PREDICTOR</h1>
                <form onSubmit = {this.callApi}>
                   <div className = 'input'><label>Number of Passengers : </label><input type='number' placeholder = 'No. of Passengers' value = {this.state.passg} name = 'passg' onChange={this.handleChange}/></div> 
                   <div className = 'input'><label>Number of Adult Male Passengers : </label><input type='number' placeholder = 'No. of Male Passengers' name='male' value={this.state.male} onChange = {this.handleChange}/></div>
                   <div className = 'input'><label>Number of Adult Female Passengers : </label><input type='number' placeholder = 'No. of Female Passengers' name='female' value={this.state.female} onChange = {this.handleChange}/></div>
                   <div className = 'input'><label>Number of Kid Passengers (Age less than 12) : </label><input type='number' placeholder = 'No. of Kids' name='kids' value={this.state.kids} onChange = {this.handleChange}/></div>
                   <div className = 'input'><label>Number of NonVeg Passengers : </label><input type='number' placeholder = 'No. of Non-Veg Passengers' name='nonveg_pas' value={this.state.nonveg_pas} onChange = {this.handleChange}/></div>
                   <div className = 'input'><label>Flight Duration : </label><input type='number' placeholder = 'Flight Duration' name='flight_dur' value={this.state.flight_dur} onChange = {this.handleChange}/></div>
                   <div className = 'input'><label>Day or Night Flight (Enter 1 for day flight / 0 for night flight ) : </label><input type='number' placeholder = 'Day or Night flight' name='day_night' value={this.state.day_night} onChange = {this.handleChange}/></div>
                   <div className = 'input'><label>Number of Business Class Passengers : </label><input type='number' placeholder = 'No. of Business class Passengers' name='bus_class' value={this.state.bus_class} onChange = {this.handleChange}/></div>
                   <button >Predict</button>
                </form>
                <button onClick={this.reset}> Reset Values</button>
                {this.state.prediction ? <div className = 'prediction'><h3>Estimated Catering Expenditure : </h3>{this.state.prediction}</div>  : '' } 

            </div>
        )
    }
}

export default Predictor