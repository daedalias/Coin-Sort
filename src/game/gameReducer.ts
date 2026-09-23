import type { GameState } from "./GameState"

export type GameAction =
    | { type: "DEAL" }
    | { type: "TAP_TUBE"; tubeIndex: number }
    | { type: "RESTART" }
    | { type: "LOAD"; state: GameState }

export function gameReducer(
    state: GameState,
    action: GameAction
): GameState {

    switch (action.type) {

        case "DEAL":
            return state

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