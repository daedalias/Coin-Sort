export interface TubeViewProps {

    coinCount: number

    index: number
}

export function TubeView(
    props: TubeViewProps
) {

    return (

        <div
            style={{
                width: "60px",
                height: "160px",
                border: "4px solid white",
                borderTop: "none",
                borderRadius: "0 0 20px 20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontWeight: "bold"
            }}
        >
            {props.coinCount}
        </div>
    )
}