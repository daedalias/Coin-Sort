import type { GameState } from "./GameState"

const SAVE_KEY =
    "coin-sort-save"

export function saveGame(
    state: GameState
) {

    localStorage.setItem(
        SAVE_KEY,

        JSON.stringify(state)
    )
}