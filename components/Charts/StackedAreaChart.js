import React from 'react';
import { StyleSheet } from 'react-native';
import {
  VictoryStack,
  VictoryArea,
  VictoryChart
} from "victory-native";
export class StackedAreaChart extends React.Component {
  // containerComponent={
  //           <VictoryVoronoiContainer
  //             onTouchStart={() => this.changeScroll(false)}
  //             onTouchEnd={() => this.changeScroll(true)}
  //             labels={(d) => `( ${d.x} , ${d.y} )`}
  //           />
  //         }
  render() {
    return (
      <VictoryChart>
        <VictoryStack
          width={300}
          height={450}
          style={{ data: {
            strokeDasharray: "10,10",
            strokeWidth: 2,
            fillOpacity: 0.4
          }}}
        >
          <VictoryArea
            style={{ data: {
              fill: "tomato", stroke: "tomato"
            }}}
            data={[
              {x: 1, y: 1},
              {x: 2, y: 2},
              {x: 3, y: 3}
            ]}
          />
          <VictoryArea
            style={{ data: {
              fill: "orange", stroke: "orange"
            }}}
            data={[
              {x: 1, y: 2},
              {x: 2, y: 1},
              {x: 3, y: 1}
            ]}
          />
          <VictoryArea
            style={{ data: {
              fill: "gold", stroke: "gold"
            }}}
            data={[
              {x: 1, y: 3},
              {x: 2, y: 4},
              {x: 3, y: 2}
            ]}
          />
        </VictoryStack>
      </VictoryChart>
    );
  }
}
