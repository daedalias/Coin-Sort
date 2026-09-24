import type { GameState } from "./GameState"

export function createEmptyGameState(): GameState {

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