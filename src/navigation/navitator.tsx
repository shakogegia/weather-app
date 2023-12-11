import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import HomeScreen from '../screens/HomeScreen'
import HourlyScreen from '../screens/city/HourlyScreen'
import DailyScreen from '../screens/city/DailyScreen'
import { CityTabParamList, RootStackParamList } from './types'
import { Platform } from 'react-native'

const Stack = createNativeStackNavigator<RootStackParamList>()
const BottomTab = createBottomTabNavigator<CityTabParamList>()

function CityTabs() {
  return (
    <BottomTab.Navigator
      initialRouteName="Hourly"
      screenOptions={{ headerShown: false, tabBarStyle: { borderTopWidth: 0 }, tabBarActiveTintColor: '#000' }}
    >
      <BottomTab.Screen
        name="Hourly"
        component={HourlyScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'bar-chart' : 'bar-chart-outline'} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Daily"
        component={DailyScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'calendar' : 'calendar-outline'} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  )
}

function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="City"
          component={CityTabs}
          options={({ route }) => ({
            title: route.params.name || 'City',
            headerTransparent: false,
            headerTintColor: '#000',
            headerShadowVisible: false,
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: '#fff',
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator

function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={Platform.OS === 'ios' ? 25 : 22} {...props} />
}
