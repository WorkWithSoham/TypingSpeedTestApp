export interface BaseState {
    typeTest: string
    words: Array<string>
    enteredText: string
    correctCount: number
    started: boolean
    startTime: Date | null
    speed: number | null
    finalTime: number | null
}