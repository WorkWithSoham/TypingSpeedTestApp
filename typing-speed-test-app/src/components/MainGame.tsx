import React from 'react'
import Speed from "./Speed";
import { BaseState } from '../StateInterface';

const initialState: BaseState = {
    typeTest: 'Click START to begin the test...',
    words: [],
    enteredText: '',
    correctCount: 0,
    started: false,
    startTime: null,
    speed: null,
    finalTime: 0
}

export class MainGame extends React.Component {

    state: BaseState = initialState
    showSpeedTime: boolean = false

    componentDidMount() {
        getQuote().then((quote: string) => {
            this.setState({ typeTest: quote })
            this.setState({ words: quote.split(' ') })
        });
    }

    startClicked = () => {
        DomManipulation('cornflowerblue', false);
    }

    resetClicked = () => {
        this.showSpeedTime = false;
        this.setState(initialState);
        this.componentDidMount();
        DomManipulation('graytext', true);
    }

    checkFinished = () => {
        if (this.state.words.length === 0) {

            const currentTime = new Date()
            const startTime = this.state.startTime ? this.state.startTime.getTime() : 0

            const finalTime = (currentTime.getTime() - startTime) / 1000
            const speed = this.computeSpeed(this.state.typeTest.length, finalTime)

            this.setState({ finalTime: Math.round(finalTime), speed })

            this.showSpeedTime = true;
        }
    }

    computeSpeed = (charsTyped: number, millis: number): number =>
        Math.floor((charsTyped / 5) / (millis / 60))

    onInputType = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        if (!this.state.started) {
            this.setState({ started: true, startTime: new Date() })
        }

        const enteredText = e.currentTarget.value.trim()
        this.setState({ enteredText })

        if (enteredText === this.state.words[0]) {
            this.setState({ correctCount: this.state.correctCount + 1 })
            this.setState({ enteredText: '' })
            this.setState({ words: this.state.words.slice(1) }, (): void => this.checkFinished())
        }

    }

    render() {

        const speedRender = this.showSpeedTime ? <Speed {...this.state} /> : null

        return (
            <div className="container-sm">
                <div className="col-md-8 offset-md-2 p-5 border rounded" id='QuoteBox'
                    style={{ color: 'GrayText' }}>
                    <h3>{this.state.typeTest}</h3>
                </div>
                {speedRender}
                <div className="col-md-6 pt-2 offset-md-3 pb-5">
                    <textarea
                        value={this.state.enteredText}
                        onChange={this.onInputType}
                        className="form-control"
                        name="inputCol"
                        id="inputCol"
                        placeholder="Begin writing here..." disabled ></textarea>
                    <button className="btn btn-danger m-2" onClick={this.resetClicked}>Reset</button>
                    <button className="btn btn-success m-2" onClick={this.startClicked}>Start</button>
                </div>
            </div>
        );
    }
}

async function getQuote(): Promise<string> {
    const response = await fetch('https://api.quotable.io/random?minLength=150&maxLength=250')
    const data = await response.json()

    return data.content
}

const DomManipulation = (color: string, dis: boolean): void => {

    let QuoteBox = document.getElementById("QuoteBox") as HTMLElement
    let inputCol = document.getElementById("inputCol") as HTMLTextAreaElement

    QuoteBox.style.color = color
    inputCol.disabled = dis

}
