/**
 * Created by hps on 12.02.2017.
 */
import React, {Component} from 'react'
import * as currencyConverter from '../actions/CurrencyConverter'

export default class Goods extends Component {
    constructor(props) {
        props.getData();
        super(props);
        this.state = {
            selectedGoods: []
        }
    }

    addGoodToBasket(e, good, index) {
        e.preventDefault();
        if (!e.currentTarget.classList.contains('added')){
            e.currentTarget.classList.add('added');

            let goods = this.state.selectedGoods.slice();
            goods.push(index);
            this.setState({selectedGoods: goods});
            this.props.selectGood(good);
        }
    }

    showGoods() {
        let goods = this.props.data,
            baseCurrency = currencyConverter.convertCurrencyToString(this.props.currency);
        if (goods.length != 0) {
            return goods.map((good, index)=> {
                return (
                    <div className={'good ' + (this.state.selectedGoods.indexOf(index) != -1 ? 'added' : '')}
                         key={`good${index}-price_${good.price}`}
                         onClick={(event)=>this.addGoodToBasket(event,good,index)}>
                        <img src='/assets/example_good.png'/>
                        <div>{good.price} {baseCurrency}</div>
                    </div>
                )
            });
        } else {
            return (<div>no goods</div>);
        }
    }

    render() {
        return (
            <div className='goods-container'>
                <div className='title-container'>//Goods:</div>
                {this.showGoods()}
            </div>
        )
    }
}