import React from 'react'
import { createAppContainer, createStackNavigator, createSwitchNavigator, createDrawerNavigator, SafeAreaView, DrawerItems } from 'react-navigation'
import LoginScreen from './screens/LoginScreen';
import Colors from './constants/Colors';
import { View, Text, TouchableOpacity } from 'react-native'

import { createStore, combineReducers, applyMiddleware } from 'redux';
import authReducer from './store/reducers/auth';
import ReduxThunk from 'redux-thunk';
import { Provider, useDispatch } from 'react-redux'
import WelcomeScreen from './screens/WelcomeScreen';
import StartupScreen from './screens/StartupScreen';
import referralReducer from './store/reducers/referrals';
import ReferralsScreen from './screens/ReferralsScreen';
import refereeReducer from './store/reducers/referee';
import managersReducer from './store/reducers/managers';
import ReferralDetails from './components/ReferralDetails';
import AddReferral from './components/AddReferral';
import * as authActions from './store/actions/auth';

const rootReducer = combineReducers({
  auth: authReducer,
  referrals: referralReducer,
  referee: refereeReducer,
  managers: managersReducer
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
}, {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primary
      },
      headerTintColor: Colors.secondady
    }
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

},
  {
    contentOptions: {
      activeBackgroundColor: '#e1e6e2'
    },
    contentComponent: props => {
      const dispatch = useDispatch();
      return (
        <View style={{ paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems {...props} />
            <TouchableOpacity onPress={() => {
              dispatch(authActions.logout())
              props.navigation.navigate('Auth');
            }}>
              <Text style={{ fontWeight: '600', fontSize: 18, paddingLeft: 15, color: 'red', paddingVertical: 5, marginTop: 20 }}>Log out</Text>
            </TouchableOpacity>

          </SafeAreaView>
        </View>
      )
    }
  }

)


const App = createAppContainer(drawer);

export default () => (<Provider store={store}>
  <App />
</Provider>)
