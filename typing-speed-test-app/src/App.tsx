import React, { Component } from 'react';
import { MainGame } from './components/MainGame';
import './App.css'

export default class App extends Component {
  render() {
    return (
      <div className="background">
      <div>
        <div className="text-center pt-2">
          <h1>Typing Jockey</h1>
        </div>
        <MainGame />
      </div>
    </div>
    )
  }
}
