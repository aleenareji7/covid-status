import React,{Component} from 'react';
import Plot from 'react-plotly.js';

class Charts extends Component {
    constructor(props){
        super(props);
        this.state= {
            chartData:{}
        }
    }

    getChartData(data){
        let formattedStatus = data && Object.keys(data).map((value) => data[value]);
        this.setState({
           chartData:formattedStatus,
        })

    }

    componentWillReceiveProps(newProps){
        if(newProps){
            this.getChartData(newProps.chartValue);
        }
    }
  render() {
    return (
      <div className="chart-container">
        
      <Plot
        data={[
          {
            values: this.state.chartData,
           labels: ['Total Cases', 'Active Cases', 'Recovered','Death Cases'],
            type: 'pie',
          },
        ]}
        layout={ {width: 370, height: 280, title: 'Pie Chart'} }
      />
         <Plot
        data={[
          {
            type: 'bar',
            x: this.state.chartData,
           y: ['Total Cases', 'Active Cases', 'Recovered','Death Cases'],
            
            orientation: 'h'
          },
        ]}
        layout={ {width: 370, height: 280, title: 'Horizontal Bar chart'} }
      />
      </div>
    );
  }
}

export default Charts;