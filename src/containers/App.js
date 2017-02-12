import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Basket from '../components/Basket'
import Goods from '../components/Goods'
import Currency from '../components/Currency'
import * as appActions from '../actions/AppActions'


class App extends Component {
    render() {
        const {goods,base,fetching,selectedGoods,payment} = this.props.app;
        const {getGoods,selectGood,updateBaseCurrency} = this.props.appActions;
        return <div className={`app-container ${fetching?'loading':''}`}>
            <Currency data={base} update={updateBaseCurrency}/>
            <Goods data={goods} getData={getGoods} selectGood={selectGood} currency={base}/>
            <Basket data={selectedGoods} payment={payment}/>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        app: state.app
    }
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
