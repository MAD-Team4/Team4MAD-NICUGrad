// nicu_grad_frontend/app/components/LineGraph.js

import React from 'react';
import { Dimensions, View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const LineGraph = ({ data, title = "Progress", yAxisSuffix = "g", yAxisInterval = 1 }) => {
  const hasValidData = data && Array.isArray(data.labels) && Array.isArray(data.values) &&
    data.labels.length > 0 && data.values.length > 0 &&
    data.values.every(value => isFinite(value));

  if (!hasValidData) {
    return (
      <View style={{ height: 220, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, color: '#555' }}>No valid data to display yet.</Text>
      </View>
    );
  }

  return (
    <View>
      <LineChart
        data={{
          labels: data.labels,
          datasets: [
            {
              data: data.values,
              strokeWidth: 2,
            },
          ],
        }}
        width={screenWidth - 32}
        height={220}
        yAxisSuffix={yAxisSuffix}
        yAxisInterval={yAxisInterval}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: '#007AFF',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
          alignSelf: 'center',
        }}
      />
    </View>
  );
};

export default LineGraph;
