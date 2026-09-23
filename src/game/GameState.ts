import type { Tube } from "../models/Tube"
import type { Trophy } from "../models/Trophy"

export interface GameState {

    tubes: Tube[]

    gold: number

    currentCheckpoint: number

    selectedTubeIndex: number | null

    dealCount: number

    mergeCount: number

    trophies: Trophy[]

    nextTrophyNumber: number
}