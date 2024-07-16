import React from 'react';
import EChartsReact from 'echarts-for-react';


const SuggestionChart = () => {

    // var myChart = echarts.init(document.getElementById('chart'));

    const myChart = {
        title: {
            text: 'Suggested Tech Terms',
        },
        tooltip: {},
        xAxis: {
            data: ['shirt', 'cardigan', 'chiffon', 'pants', 'heels', 'socks'],
        },
        yAxis: {},
        series: [
            {
                name: 'Relevance',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }
        ]
    };

    return (<EChartsReact option={myChart} className='w-[400px] text-white' />);
}

export default SuggestionChart;