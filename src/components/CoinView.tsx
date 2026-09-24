import { coinColors } from "../game/CoinPalette"

export interface CoinViewProps {

    value: number

    lifted: boolean
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
               width: "52px",
height: "14px",

                background: color,

                borderRadius: "5px",

                display: "flex",

                justifyContent: "center",

                alignItems: "center",

                color: "white",

                fontSize: "12px",

                fontWeight: "bold",
               textShadow: `
    0 0 2px rgba(0,0,0,0.9),
    0 0 4px rgba(0,0,0,0.6)
`,
            }}
        >
            {props.value}
        </div>
    )
}