import React, { useEffect } from 'react';
import EChartsReact from 'echarts-for-react';


const SuggestionChart = ({ data }) => {

    const x = data.map((element) => { return element.name })
    const y = data.map((element) => { return element.score })
    useEffect(() => { console.log(data) })


    const myChart = {
        title: {
            text: 'Suggested Data Elements',
            textStyle: {
                color: '#fff',
                fontSize: 20
            }
        },
        tooltip: {},
        xAxis: {
            data: x
        },
        yAxis: {},
        series: [
            {
                name: 'Relevance',
                type: 'bar',
                data: y
            }
        ]
    };

    return (<EChartsReact option={myChart} className='w-[400px] text-white' />);
}

export default SuggestionChart;