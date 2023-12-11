import { StyleSheet, View, Text } from 'react-native'
import { RootStackScreenProps } from '../navigation/types'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function HomeScreen({ navigation }: RootStackScreenProps<'Home'>) {
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text>Home</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
