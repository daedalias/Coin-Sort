import type { GameState }
    from "./GameState"

const SAVE_KEY =
    "coin-sort-save"

export function loadGame():

    Partial<GameState> | null {

    const raw =
        localStorage.getItem(
            SAVE_KEY
        )

    if (!raw) {

        return null
    }
const parsed =
    JSON.parse(raw)

console.log(
    "LOAD",
    parsed
)

return parsed

}