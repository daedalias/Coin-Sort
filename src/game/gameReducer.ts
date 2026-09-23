import type { GameState } from "./GameState"
import type { Coin } from "./Coin"

export type GameAction =
    | { type: "DEAL" }
    | { type: "TAP_TUBE"; tubeIndex: number }
    | { type: "RESTART" }
    | { type: "LOAD"; state: GameState }

function lowestCoinOnBoard(
    state: GameState
): number {

    const values =
        state.tubes.flatMap(
            tube => tube.coins.map(
                (coin: Coin) => coin.value
            )
        )

    if (values.length === 0) {
        return state.currentCheckpoint
    }

    return Math.min(...values)
}

function highestCoinOnBoard(
    state: GameState
): number {

    const values =
        state.tubes.flatMap(
            tube => tube.coins.map(
                (coin: Coin) => coin.value
            )
        )

    if (values.length === 0) {
        return state.currentCheckpoint
    }

    return Math.max(...values)
}

function randomDealValue(
    state: GameState
): number {

    const lowest =
        lowestCoinOnBoard(state)

    const highest =
        highestCoinOnBoard(state)

    const upperBound =
        Math.max(
            lowest,
            highest - 1
        )

    const focusedChance =
        Math.random() < 0.7

    if (focusedChance) {

        const focusedUpper =
            Math.min(
                upperBound,
                lowest + 2
            )

        return (
            Math.floor(
                Math.random() *
                (
                    focusedUpper -
                    lowest +
                    1
                )
            ) + lowest
        )
    }

    return (
        Math.floor(
            Math.random() *
            (
                upperBound -
                lowest +
                1
            )
        ) + lowest
    )
}

export function gameReducer(
    state: GameState,
    action: GameAction
): GameState {

    switch (action.type) {

case "DEAL": {

    const nextState = {
        ...state,

        tubes: [...state.tubes],

        dealCount:
            state.dealCount + 1
    }

    const value =
        randomDealValue(state)

    nextState.tubes[0] = {

        ...nextState.tubes[0],

        coins: [

            ...nextState.tubes[0].coins,

            {
                id: crypto.randomUUID(),
                value
            }
        ]
    }

    return nextState
}

        case "TAP_TUBE":

            return state

        case "RESTART":

            return state

        case "LOAD":

            return action.state

        default:

            return state
    }
}