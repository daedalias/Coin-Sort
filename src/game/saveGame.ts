import type { GameState } from "./GameState"

const SAVE_KEY =
    "coin-sort-save"

export function saveGame(
    state: GameState
) {
console.log(
    "SAVE",
    state
)
    localStorage.setItem(
        SAVE_KEY,

        JSON.stringify({
            tubes: state.tubes,
            level: state.level,
            xp: state.xp,
            lifetimeXp: state.lifetimeXp,
            dealCount: state.dealCount
        })
    )
}