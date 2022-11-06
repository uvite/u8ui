import {Chart, LineSeries} from "lightweight-charts-react-wrapper";
import React from "react";

const data = [
    {time: '2019-04-11', value: 80.01},
    {time: '2019-04-12', value: 96.63},
    {time: '2019-04-13', value: 76.64},
    {time: '2019-04-14', value: 81.89},
    {time: '2019-04-15', value: 74.43},
    {time: '2019-04-16', value: 80.01},
    {time: '2019-04-17', value: 96.63},
    {time: '2019-04-18', value: 76.64},
    {time: '2019-04-19', value: 81.89},
    {time: '2019-04-20', value: 74.43},
];
export class TradeVolume extends React.Component {
    render() {
        return (
            <Chart width={800} height={600}>
                <LineSeries data={data}/>
            </Chart>
        );
    }
}
export default TradeVolume
