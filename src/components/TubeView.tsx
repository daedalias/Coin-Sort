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
                width: "60px",
                height: "160px",

           borderLeft: "4px solid white",

borderRight: "4px solid white",

borderBottom: "4px solid white",

         borderBottomLeftRadius: "20px",
borderBottomRightRadius: "20px",

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