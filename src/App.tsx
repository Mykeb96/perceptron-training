import { useState, useEffect } from 'react';
import './App.css'
import Plot from 'react-plotly.js';

class Perceptron {
  learnc: number
  bias: number
  weights: Array<number>


  constructor(no: any, learningRate: any = 0.00001){
    // Set Initial Values
    this.learnc = learningRate;
    this.bias = 1;
    
    // Compute Random Weights
    this.weights = [];
    for (let i = 0; i <= no; i++) {
      this.weights[i] = Math.random() * 2 - 1;
    }
    
  }

      // Activate Function
    activate = (inputs: any) => {
      let sum = 0;
      for (let i = 0; i < inputs.length; i++) {
        sum += inputs[i] * this.weights[i];
      }
      if (sum > 0) {return 1} else {return 0}
    }
    
    // Train Function
    train = (inputs: any, desired: any) => {
      inputs.push(this.bias);
      let guess = this.activate(inputs);
      let error = desired - guess;
      if (error != 0) {
        for (let i = 0; i < inputs.length; i++) {
          this.weights[i] += this.learnc * error * inputs[i];
        }
      }
    }
}

function App() {

  const learningRate = 0.000001;

  const [trainingIterations, setTrainingIterations] = useState(0)
  const [numPoints, setNumPoints] = useState(100)
  const xPoints: any = [];
  const yPoints: any = [];

  const [xCords, setXCords] = useState([])
  const [yCords, setYCords] = useState([])

  const xMax = 50
  const yMax = 50

  let desired: any = [];

  let newColors: any = []
  const [graphColors, setGraphColors] = useState([])

  const handlePointsChange = (e: any) => {
    setNumPoints(e.target.value)
  }

  const handleIterationsChange = (e: any) => {
    setTrainingIterations(e.target.value)
  }

  useEffect(() => {

    const ptron = new Perceptron(2, learningRate);

    for (let i = 0; i < numPoints; i++) {
      xPoints[i] = Math.random() * xMax;
      yPoints[i] = Math.random() * yMax;
    }

    setXCords(xPoints)
    setYCords(yPoints)

    for (let i = 0; i < numPoints; i++) {
      if (yPoints[i] > xPoints[i]) {
        desired[i] = 1
      } else {
        desired[i] = 0;
      }
    }

    for (let j = 0; j <= trainingIterations; j++) {
      for (let i = 0; i < numPoints; i++) {
        ptron.train([xPoints[i], yPoints[i]], desired[i]);
      }
    }

    for (let i = 0; i < numPoints; i++) {
      const x = xPoints[i];
      const y = yPoints[i];
      let guess = ptron.activate([x, y, ptron.bias]);
      let color = "limegreen";
      if (guess == 0) color = "red";

      newColors.push(color)
      
    }

    setGraphColors(newColors)

    // for (let i = 0; i < desired.length; i++) {
    //   let color = "blue";
    //   if (desired[i] == 1) color = "red";

    //   newColors.push(color)
    // }

    // setGraphColors(newColors)
  }, [trainingIterations])

useEffect(() => {
  const ptron = new Perceptron(2, learningRate);

  for (let i = 0; i < numPoints; i++) {
    xPoints[i] = Math.random() * xMax;
    yPoints[i] = Math.random() * yMax;
  }

  setXCords(xPoints)
  setYCords(yPoints)

  for (let i = 0; i < numPoints; i++) {
    if (yPoints[i] > xPoints[i]) {
      desired[i] = 1
    } else {
      desired[i] = 0;
    }
  }

  for (let j = 0; j <= trainingIterations; j++) {
    for (let i = 0; i < numPoints; i++) {
      ptron.train([xPoints[i], yPoints[i]], desired[i]);
    }
  }

  for (let i = 0; i < numPoints; i++) {
    const x = xPoints[i];
    const y = yPoints[i];
    let guess = ptron.activate([x, y, ptron.bias]);
    let color = "limegreen";
    if (guess == 0) color = "red";

    newColors.push(color)
    
  }

  setGraphColors(newColors)
}, [numPoints])


  return (
    <div className='main-container'>
      {graphColors.length != 0 ?
        <Plot
        data={[
          {
            x: xCords,
            y: yCords,
            type: 'scatter',
            mode: 'markers',
            marker: {color: graphColors},
          },
        ]}
        layout={ {width: 700, height: 540, title: 'Perceptron Training', shapes: [{type: 'line', x0: 0, x1: 50, y0: 0, y1: 50}]} }
      />
      :
      <span>Loading...</span>
      }

      <div className='inputs'>
        <span>Number of Points: {numPoints}</span>
        <input type='range' max={500} min={10} value={numPoints} onChange={(e) => handlePointsChange(e)}></input>

        <span>Training Iterations: {trainingIterations}</span>
        <input type='range' max={10000} min={0} value={trainingIterations} step={100} maxLength={300} onChange={(e) => handleIterationsChange(e)}></input>
      </div>
    </div>
  )
}

export default App
