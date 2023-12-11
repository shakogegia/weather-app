export const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#fb8c00',
  backgroundGradientTo: '#ffa726',
  decimalPlaces: 0,

  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
}

export const weatherMoods = [
  {
    title: 'Amazing',
    emoji: '🤩',
    minTemp: 20,
    maxTemp: 100,
  },
  {
    title: 'Good',
    emoji: '😎',
    minTemp: 15,
    maxTemp: 20,
  },
  {
    title: 'Okay',
    emoji: '😐',
    minTemp: 10,
    maxTemp: 15,
  },
  {
    title: 'Bad',
    emoji: '😞',
    minTemp: 5,
    maxTemp: 10,
  },
  {
    title: 'Terrible',
    emoji: '😭',
    maxTemp: 5,
    minTemp: -100,
  },
]
