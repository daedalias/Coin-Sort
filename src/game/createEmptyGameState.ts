import type { GameState } from "./GameState"
import { loadGame } from "./loadGame"

export function createEmptyGameState(): GameState {
const saved =
    loadGame()
console.log(
    "CREATE_EMPTY_STATE"
)

console.log(
    "SAVED_VALUE",
    saved
)

if (saved) {

    return {

        tubes: saved.tubes ?? [],

        level: saved.level ?? 1,

        xp: saved.xp ?? 0,

        lifetimeXp:
            saved.lifetimeXp ?? 0,

        currentCheckpoint:
            saved.currentCheckpoint ?? 1,

        selectedTubeIndex: null,

        dealCount:
            saved.dealCount ?? 0,

        mergeCount:
            saved.mergeCount ?? 0,

        trophies:
            saved.trophies ?? [],

        nextTrophyNumber:
            saved.nextTrophyNumber ?? 1
    }
}

  
return {

    tubes: Array.from(
        { length: 20 },
        (_, index) => ({
            id: `tube-${index}`,
            coins: []
        })
    ),

    level: 1,

    xp: 0,

    lifetimeXp: 0,

    currentCheckpoint: 1,

    selectedTubeIndex: null,

    dealCount: 0,

    mergeCount: 0,

    trophies: [],

    nextTrophyNumber: 1
}
}