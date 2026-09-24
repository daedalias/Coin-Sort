import { useReducer } from "react"
import "./App.css"

import { gameReducer } from "./game/gameReducer"
import { createEmptyGameState } from "./game/createEmptyGameState"
import { TubeView } from "./components/TubeView"
import {
    pickupCount
} from "./game/gameReducer"
function App() {

    const [state, dispatch] = useReducer(
        gameReducer,
        createEmptyGameState()
    )

    return (

        <div
            style={{
                height: "100vh",
                background: "#2e2e2e",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "16px"
            }}
        >

            <h1>Coin Sort</h1>

            <p>
    <p>
    Lv. {state.level}
</p>

<p>
    XP: {state.xp}
</p>

<p>
    Deals: {state.dealCount}
</p>
</p>

<div
    style={{
        display: "grid",
        gridTemplateColumns:
            "repeat(5, 1fr)",
        gap: "12px"
    }}
>

    {state.tubes.map(
        (tube, index) => (

       <TubeView
    key={tube.id}
    index={index}
    coins={tube.coins}
    selected={
        state.selectedTubeIndex === index
    }
    selectedCoinCount={
    state.selectedTubeIndex === index
        ? pickupCount(
            state,
            index
        )
        : 0
}
    onClick={() =>
        dispatch({
            type: "TAP_TUBE",
            tubeIndex: index
        })
    }
/>
        )
    )}
</div>

            <button
                onClick={() =>
                    dispatch({
                        type: "DEAL"
                    })
                }
                style={{
                    padding: "12px 24px",
                    fontSize: "18px",
                    borderRadius: "999px",
                    border: "none",
                    background: "#2563eb",
                    color: "white",
                    cursor: "pointer"
                }}
            >
                Deal
            </button>

        </div>
    )
}

export default App