import React from "react"
import { BaseState } from "../StateInterface"


export default class Speed extends React.Component<BaseState> {

    render() {

        return (
            <div className="col-md-6 mx-auto offset-md-5 mt-2">
                <div className="row">
                    <div className="col-md-4 mx-auto">
                        <h3>{this.props.speed ? this.props.speed : 0}</h3><p>wpm</p>
                    </div>
                    <div className="col-md-4 mx-auto">
                        <h3>{this.props.correctCount}</h3><p>Correct Words</p>
                    </div>
                    <div className="col-md-4 mx-auto">
                        <h3>{ this.props.finalTime }</h3><p>Time in seconds</p>
                    </div>
                </div>
            </div>
        )
    }
}