import React from "react";
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, PolarAngleAxis, Tooltip } from 'recharts';





const PieChart = (props) => {
  
  let colour = "";
  if(props.value/props.fillValue < 0.3){
    colour="#ff4d4d"
  }else if(props.value/props.fillValue <0.6){
    colour="#ff8533"
  }else {
     colour="#90b45c"
    
  }
  
  
  
  const data = [
    { name: props.name, content: props.value, fill: colour }

  ];
  const getIntroOfPage = (label) => {
    if (props.name === 'Carbs') {
      return "🍚 intake in gram";
    }
    if (props.name === 'Protein') {
      return "🥩 intake in gram";
    }
    if (props.name === 'Fibre') {
      return "🌿 intake in gram";
    }
  };
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${data[0].name} : ${payload[0].value}`}</p>
          <p className="intro">{getIntroOfPage(label)}</p>
          
        </div>
      );
    }
  
    return null;
  };



  return (

    <>
      <RadialBarChart width={400} height={300} data={data} innerRadius="80%" outerRadius="110%" barSize={60} startAngle={180}
        endAngle={-180} name="Name" >

        <PolarAngleAxis type="number" domain={[0, props.fillValue]} angleAxisId={0} tick={false} />
        <RadialBar background minAngle={100} fill={3} anticlockWise dataKey="content" angleAxisId={0} />
        <Legend name="Carbs" verticalAlign="top" height={36} />
        <Tooltip content={<CustomTooltip />} />

      </RadialBarChart>
    </>
  );

}

export default PieChart;