import React, { useEffect } from 'react';
import EChartsReact from 'echarts-for-react';


const SuggestionChart = ({ data }) => {

    const x = data.map((element) => { return element.name })
    const y = data.map((element) => { return element.score })
    useEffect(() => { console.log(data) })

    // var myChart = echarts.init(document.getElementById('chart'));

    const myChart = {
        title: {
            text: 'Suggested Tech Terms',
        },
        tooltip: {},
        xAxis: {
            // data: ['shirt', 'cardigan', 'chiffon', 'pants', 'heels', 'socks'],
            data: x
        },
        yAxis: {},
        series: [
            {
                name: 'Relevance',
                type: 'bar',
                // data: [5, 20, 36, 10, 10, 20]
                data: y
            }
        ]
    };

    return (<EChartsReact option={myChart} className='w-[400px] text-white' />);
}

export default SuggestionChart;