import { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'

export default function Card({ children }: PropsWithChildren) {
  
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f2f2',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 3,
  }
})
