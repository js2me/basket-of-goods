/**
 * Created by hps on 12.02.2017.
 */
import React,{Component} from 'react'
import {localeCurrencies} from '../actions/CurrencyConverter'

export default class Currency extends Component{
    constructor(props){
        super(props);
        
    }
    render(){
        let currencies = localeCurrencies;
        return (
            <div className='currency-container'>
                //select currency:
                <select value={this.props.baseCurrency} onChange={(e)=>this.props.update(e.target.value)}>
                    {Object.keys(currencies).map((index)=>{
                       return <option value={index}>{currencies[index]}</option>
                    })}
                </select>
            </div>
        )
    }
}