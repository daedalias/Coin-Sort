import type { Tube } from "./Tube"
import type { Trophy } from "./Trophy"

export interface GameState {

    tubes: Tube[]

    level: number

xp: number

lifetimeXp: number

    currentCheckpoint: number

    selectedTubeIndex: number | null

    dealCount: number

    mergeCount: number

    trophies: Trophy[]

    nextTrophyNumber: number
}