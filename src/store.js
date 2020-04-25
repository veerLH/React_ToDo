import {createStore, applyMiddleware,compose} from 'redux';
import rootRecuder from './reducer';
import thunk from 'redux-thunk';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(rootRecuder,composeEnhancers(applyMiddleware(thunk)));


export default store;

