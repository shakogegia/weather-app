import { SafeAreaProvider } from 'react-native-safe-area-context'
import RootNavigator from './src/navigation/navitator'
import { StatusBar } from 'expo-status-bar'

export default function App() {
  return (
    <>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
      <StatusBar style="auto" />
    </>
  )
}
