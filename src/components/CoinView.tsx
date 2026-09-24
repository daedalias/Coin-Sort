export interface CoinViewProps {

    value: number

    lifted: boolean
}

export function CoinView(
    props: CoinViewProps
) {

    return (

        <div
            style={{
transform:
    props.lifted
        ? "translateY(-10px)"
        : "translateY(0)",

transition:
    "transform 0.15s ease",
                width: "40px",

                height: "16px",

                background: "#f97316",

                borderRadius: "999px",

                display: "flex",

                justifyContent: "center",

                alignItems: "center",

                color: "white",

                fontSize: "12px",

                fontWeight: "bold"
                
            }}
        >
            {props.value}
        </div>
    )
}