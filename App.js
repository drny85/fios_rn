import React from 'react'
import { createAppContainer, createStackNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation'
import LoginScreen from './screens/LoginScreen';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import authReducer from './store/reducers/auth';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux'
import WelcomeScreen from './screens/WelcomeScreen';
import StartupScreen from './screens/StartupScreen';
import referralReducer from './store/reducers/referrals';
import ReferralsScreen from './screens/ReferralsScreen';
import ReferralDetails from './components/ReferralDetails';
import AddReferral from './components/AddReferral';

const rootReducer = combineReducers({
  auth: authReducer,
  referrals: referralReducer
})


const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const authNavigator = createStackNavigator({
  Login: LoginScreen
})

const mainNavigation = createStackNavigator({
  home: WelcomeScreen
})

const referralsNav = createStackNavigator({
  Referrals: ReferralsScreen,
  Details: ReferralDetails,
  Add: AddReferral
},

  {
    initialRouteName: 'Add'
  }
)

const mainNav = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: authNavigator,
  Main: mainNavigation
});

const drawer = createDrawerNavigator({
  Home: mainNav,
  Referrals: referralsNav

})


const App = createAppContainer(drawer);

export default () => (<Provider store={store}>
  <App />
</Provider>)
