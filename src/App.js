import React, { Component } from 'react';

function Button(props) {
  return (<button id={props.id} onClick={props.onClick}>{props.content}</button>);
}

function UIElement(props) {
    return (<h4 className="uiElement" id={props.id}>{props.value}</h4>);
}

function Lap(props) {
  return (<li className="lap">
    <UIElement value={props.lapNo} id="lapNo"/>
    <UIElement value={props.time} id="lapTime"/>
  </li>);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.lapSeconds = 0;

    this.state = {
      seconds: 0,
      formattedTime: "00:00:00",
      laps: [4]
    }
  }

  startTimer() {
    let copy = this.state;
    this.interval = setInterval(() => {
      copy.seconds += 1;
      this.lapSeconds += 1;
      copy.formattedTime = this.format(copy.seconds);
      this.setState(copy);  
    }, 1000);
  }

  format(seconds) {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor(seconds % 3600 / 60);
    let s = Math.floor(seconds % 3600 % 60);
    return this.pad(h, 2) + ':' + this.pad(m, 2) + ':' + this.pad(s, 2); 
  }

  lap() {
    console.log('Lap.');
    let copy = this.state;
    copy.laps.push(this.lapSeconds);
    this.lapSeconds = 0;
    this.setState(copy);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  formatLaps() {
    let i = 1;
    return this.state.laps.map(o => <Lap lapNo={i++} time={this.format(o)}/>);
  }

  render() {
    return (<div>
      <div id="app">
        <UIElement value={this.state.formattedTime} id="timer"></UIElement>
        <UIElement value={`Slowest Lap: ${this.format(Math.max(...this.state.laps))}`} id="slowestLap" />
        <UIElement value={`Fastest Lap: ${this.format(Math.min(...this.state.laps))}`} id="fastestLap" />
        <UIElement value={`Lap Count: ${this.state.laps.length}`} id="lapCount" />
        <Button id="startButton" onClick={() => {this.startTimer()}} content="Start" />
        <Button id="stopButton" onClick={() => {clearInterval(this.interval)}} content="Stop" />
        <Button id="lapButton" onClick={() => {this.lap()}} content="Lap" />
      </div>
      <h2 id="lapNoTitle">Lap No.</h2>
      <h2 id="lapTimeTitle">Lap Time.</h2>
      <div id="laps">
        {this.formatLaps()}
      </div>
    </div>);
  }
}

export default App;
