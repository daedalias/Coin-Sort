import { useReducer } from "react"
import "./App.css"

import { gameReducer } from "./game/gameReducer"
import { createEmptyGameState } from "./game/createEmptyGameState"

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
                Deals: {state.dealCount}
            </p>

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