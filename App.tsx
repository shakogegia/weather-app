import { SafeAreaProvider } from 'react-native-safe-area-context'
import RootNavigator from './src/navigation/navitator'
import { StatusBar } from 'expo-status-bar'
import { store } from './src/store/store'
import { Provider as StoreProvider } from 'react-redux'

export default function App() {
  return (
    <>
      <SafeAreaProvider>
        <StoreProvider store={store}>
          <RootNavigator />
        </StoreProvider>
      </SafeAreaProvider>
      <StatusBar style="auto" />
    </>
  )
}
