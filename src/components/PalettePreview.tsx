import { CoinView } from "./CoinView"

export function PalettePreview() {

    const values = Array.from(
        { length: 99 },
        (_, index) => index + 1
    )

    return (

        <div
            style={{
                display: "grid",
                gridTemplateColumns:
                    "repeat(10, 1fr)",
                gap: "8px",
                padding: "16px"
            }}
        >

            {values.map(
                value => (

                    <CoinView
                        key={value}
                        value={value}
                        lifted={false}
                    />
                )
            )}

        </div>
    )
}