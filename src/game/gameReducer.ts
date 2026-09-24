import type { GameState } from "./GameState"
import type { Coin } from "./Coin"

export type GameAction =
    | { type: "DEAL" }
    | { type: "TAP_TUBE"; tubeIndex: number }
    | { type: "RESTART" }
    | { type: "LOAD"; state: GameState }

function lowestCoinOnBoard(
    state: GameState
): number {

    const values =
        state.tubes.flatMap(
            tube =>
                tube.coins.map(
                    coin => coin.value
                )
        )

    if (
        values.length === 0
    ) {

        return 1
    }

    return Math.min(...values)
}

function highestCoinOnBoard(
    state: GameState
): number {

    const values =
        state.tubes.flatMap(
            tube =>
                tube.coins.map(
                    coin => coin.value
                )
        )

    if (
        values.length === 0
    ) {

        return 1
    }

    return Math.max(...values)
}

function randomDealValue(
    state: GameState
): number {

    const lowest =
        lowestCoinOnBoard(state)

    const highest =
        highestCoinOnBoard(state)

    if (
        highest <= lowest
    ) {

        return lowest
    }

    return (
        Math.floor(
            Math.random() *
            (
                highest -
                lowest
            )
        ) + lowest
    )
}
export function pickupCount(
    state: GameState,
    tubeIndex: number
): number {

    const tube =
        state.tubes[tubeIndex]

    if (
        tube.coins.length === 0
    ) {
        return 0
    }

    const topValue =
        tube.coins[
            tube.coins.length - 1
        ].value

    let count = 0

    for (
        let i =
            tube.coins.length - 1;
        i >= 0;
        i--
    ) {

        if (
            tube.coins[i].value === topValue
        ) {

            count++

        } else {

            break
        }
    }

    return count
}
export function xpNeededForLevel(
    level: number
): number {

    return Math.floor(
        100 *
        Math.pow(
            1.06,
            level - 1
        )
    )
}
export function gameReducer(
    state: GameState,
    action: GameAction
): GameState {

    switch (action.type) {

case "DEAL": {

    const nextState = {

        ...state,

        tubes: state.tubes.map(
            tube => ({
                ...tube,
                coins: [...tube.coins]
            })
        ),

        dealCount:
            state.dealCount + 1
    }

    for (
        let tubeIndex = 0;
        tubeIndex < nextState.tubes.length;
        tubeIndex++
    ) {

        const value =
    Math.random() < 0.5
        ? 1
        : 2

        const groupSize =
            Math.floor(
                Math.random() * 3
            ) + 1

        const availableSpace =
            10 -
            nextState.tubes[tubeIndex].coins.length

        const actualGroupSize =
            Math.min(
                groupSize,
                availableSpace
            )

        if (
            actualGroupSize <= 0
        ) {
            continue
        }

        nextState.tubes[tubeIndex].coins.push(

            ...Array.from(
                { length: actualGroupSize },
                () => ({
                    id: crypto.randomUUID(),
                    value
                })
            )
        )
    }

    return nextState
}

case "TAP_TUBE": {

    if (
        state.selectedTubeIndex === null
    ) {

        return {

            ...state,

            selectedTubeIndex:
                action.tubeIndex
        }
    }

    if (
        state.selectedTubeIndex ===
        action.tubeIndex
    ) {

        return {

            ...state,

            selectedTubeIndex: null
        }
    }

    const sourceIndex =
        state.selectedTubeIndex

    const destinationIndex =
        action.tubeIndex

    const nextState = {

        ...state,

        tubes: state.tubes.map(
            tube => ({
                ...tube,
                coins: [...tube.coins]
            })
        ),

        selectedTubeIndex: null
    }

    const sourceTube =
        nextState.tubes[sourceIndex]

    const destinationTube =
        nextState.tubes[destinationIndex]

    if (
        sourceTube.coins.length === 0
    ) {

        return nextState
    }

    const topValue =
        sourceTube.coins[
            sourceTube.coins.length - 1
        ].value

    let pickupCount = 0

    for (
        let i =
            sourceTube.coins.length - 1;
        i >= 0;
        i--
    ) {

        if (
            sourceTube.coins[i].value ===
            topValue
        ) {

            pickupCount++

        } else {

            break
        }
    }

    if (
        destinationTube.coins.length > 0
    ) {

        const destinationTopValue =
            destinationTube.coins[
                destinationTube.coins.length - 1
            ].value

        if (
            destinationTopValue !==
            topValue
        ) {

            return nextState
        }
    }

    let matchingCount =
        destinationTube.coins.filter(
            coin =>
                coin.value === topValue
        ).length

    const spaceToTen =
        Math.max(
            0,
            10 - matchingCount
        )

    const moveCount =
        Math.min(
            pickupCount,
            spaceToTen
        )

    if (
        moveCount === 0
    ) {

        return nextState
    }

    const movedCoins =
        sourceTube.coins.splice(
            sourceTube.coins.length -
            moveCount,
            moveCount
        )

    destinationTube.coins.push(
        ...movedCoins
    )

    matchingCount += moveCount

    if (
        
        matchingCount >= 10
    ) {
nextState.xp += topValue

nextState.lifetimeXp += topValue

while (
    nextState.xp >=
    xpNeededForLevel(
        nextState.level
    )
) {

    nextState.xp -=
        xpNeededForLevel(
            nextState.level
        )

    nextState.level += 1
}

        destinationTube.coins =
            destinationTube.coins.filter(
                coin =>
                    coin.value !==
                    topValue
            )

        destinationTube.coins.unshift(
            {
                id: crypto.randomUUID(),
                value: topValue + 1
            },
            {
                id: crypto.randomUUID(),
                value: topValue + 1
            }
        )
    }

    return nextState
}

        case "RESTART":

            return state

        case "LOAD":

            return action.state

        default:

            return state
    }
}