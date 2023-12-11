import * as React from 'react'
import { Image, View } from 'react-native'

export default function WeatherIcon({ icon, size }: { icon?: string; size: number }) {
  if (!icon) return <View style={{ width: size, height: size }} />
  return (
    <Image
      source={{
        uri: `http://openweathermap.org/img/wn/${icon}@2x.png`,
      }}
      width={size}
      height={size}
    />
  )
}
