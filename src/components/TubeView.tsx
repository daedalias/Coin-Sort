import type { Coin } from "../game/Coin"

import { CoinView } from "./CoinView"

export interface TubeViewProps {

    coins: Coin[]

    index: number

    selected: boolean

    selectedCoinCount: number

    onClick: () => void
}

export function TubeView(
    props: TubeViewProps
) {

    return (

       <div
    onClick={props.onClick}
            style={{
                width: "18vw",
maxWidth: "72px",
minWidth: "50px",
                height: "160px",

border: "3px solid #888",
borderRadius: "0 0 10px 10px",

                display: "flex",

                flexDirection: "column-reverse",

                alignItems: "center",

                gap: "2px",

                paddingBottom: "6px"
            }}
        >
       {props.coins.map(
    (coin, index) => (

        <CoinView
            key={coin.id}
            value={coin.value}
           lifted={
    props.selected &&
    index >= (
        props.coins.length -
        props.selectedCoinCount
    )
}

        />
    )
)}


        </div>
    )
}