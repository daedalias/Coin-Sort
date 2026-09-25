import { coinColors } from "../game/CoinPalette"

export interface CoinViewProps {

    value: number

    lifted: boolean

    coinWidth: number

    coinHeight: number
}


export function CoinView(
    props: CoinViewProps
) {
const color =
    coinColors[props.value]
        ?? "#888888"
    return (

        <div
            style={{
transform:
    props.lifted
        ? "translateY(-10px)"
        : "translateY(0)",

transition:
    "transform 0.15s ease",
              width: `${props.coinWidth}px`,

height: `${props.coinHeight}px`,


                background: color,

                borderRadius: "8px",

                display: "flex",

                justifyContent: "center",

                alignItems: "center",

                color: "white",

                fontSize: "24px",

                fontWeight: "bold",
               textShadow: `
    0 0 6px rgba(0,0,0,0.9),
    0 0 8px rgba(0,0,0,0.6)
`,
            }}
        >
            {props.value}
        </div>
    )
}