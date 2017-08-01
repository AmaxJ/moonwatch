import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../components/App/App';
import actions from './actionCreators';

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
