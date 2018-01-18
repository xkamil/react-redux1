import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import {applyMiddleware, createStore} from "redux";
import reducers from "./reducers";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import Api from "./Api";

const store = createStore(reducers , applyMiddleware(thunk.withExtraArgument(Api)));

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
