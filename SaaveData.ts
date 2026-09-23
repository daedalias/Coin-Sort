import type { Trophy } from "./Trophy"

export interface SaveData {
    tubeValues: number[][]

    gold: number

    currentCheckpoint: number

    trophies: Trophy[]

    nextTrophyNumber: number
}