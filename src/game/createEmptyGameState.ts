import type { GameState } from "./GameState"

export function createEmptyGameState(): GameState {

    return {

        tubes: [],

        gold: 0,

        currentCheckpoint: 1,

        selectedTubeIndex: null,

        dealCount: 0,

        mergeCount: 0,

        trophies: [],

        nextTrophyNumber: 1
    }
}