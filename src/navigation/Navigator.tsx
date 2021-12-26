import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import MainScreen from '../screens/Main'
import AboutScreen from '../screens/About'

import Sidebar from '../components/Sidebar'

const Drawer = createDrawerNavigator()

const Navigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <Sidebar {...props} />}
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        drawerType: 'back',
        overlayColor: '#00000000'
      }}
    >
      <Drawer.Screen name="Main" component={MainScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  )
}

export default Navigator
