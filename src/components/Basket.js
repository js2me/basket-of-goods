/**
 * Created by hps on 12.02.2017.
 */
import React, {Component} from 'react'

export default class Basket extends Component {
    constructor(props) {
        super(props);
    }
    collectInternationalPrice(){
        let {payment} = this.props;
        console.log(payment);
        return Object.keys(payment).map(name=>{
            return <div className='price'>
                {name} : {payment[name]}
            </div>
        });
    }

    render() {
        let goods = this.props.data;
        return (
            <div className='basket-container'>
                <div className='title-container'>
                    //{goods.length} selected goods
                </div>
                <div className='result'>
                    {this.collectInternationalPrice()}
                </div>
            </div>
        )
    }
}