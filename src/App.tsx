import {
    useReducer,
    useState
} from "react"
import "./App.css"
import { gameReducer } from "./game/gameReducer"
import { createEmptyGameState } from "./game/createEmptyGameState"
import { TubeView } from "./components/TubeView"
import {
    pickupCount,
    xpNeededForLevel
} from "./game/gameReducer"
import { useEffect }
    from "react"
    import { saveGame }
    from "./game/saveGame"
function App() {

    const [state, dispatch] = useReducer(
        gameReducer,
        createEmptyGameState()
    )
    const [
    showTrophies,
    setShowTrophies
] = useState(false)
useEffect(() => {

    saveGame(state)

}, [state])
const tubeWidth = 120

const tubeHeight = 340


return (

    <div
        style={{
           minHeight: "100svh",
            background: "#2e2e2e",
            color: "white",
           display: "flex",
flexDirection: "column",
justifyContent: "flex-start",
alignItems: "center",
paddingTop: "32px",
            gap: "12px"
        }}
    >

 <div
    style={{
        width: "100%",
       
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "8px"
    }}
>

</div>
          

<div
    style={{
      width: "100%",
maxWidth: "700px",

    }}
>

   <div
    style={{
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
        marginBottom: "32px"
    }}
>

        <div
            style={{
                fontSize: "40px",
fontWeight: "bold",
                textAlign: "right"
            }}
        >

           <div>
    Lv. {state.level}
    {" • "}
    XP: {state.xp} / {xpNeededForLevel(state.level)}
</div>

        </div>

    </div>

   <div
    style={{
        display: "grid",
        gridTemplateColumns:
            "repeat(5, auto)",
            justifyContent: "center",
        gap: "16px"
    }}
>

    {state.tubes.map(
        (tube, index) => (

 <TubeView
    key={tube.id}
    index={index}
    coins={tube.coins}

    tubeWidth={tubeWidth}

    tubeHeight={tubeHeight}

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
</div>
<div
    style={{
        display: "flex",
        gap: "12px"
    }}
>

<div
    style={{
        width: "95vw",
maxWidth: "600px",
        position: "relative",
        height: "60px",
        marginTop: "50px"
    }}
>

    <button
        onClick={() =>
            dispatch({
                type: "DEAL"
            })
        }
        style={{
            position: "absolute",
            left: "50%",
            transform:
                "translateX(-50%)",

           padding: "32px 72px",

fontSize: "48px",
            fontWeight: "bold",

            borderRadius: "999px",
            border: "none",

            background: "#2563eb",
            color: "white",

            cursor: "pointer"
        }}
    >
        Deal
    </button>

    <button
        onClick={() =>
            setShowTrophies(true)
        }
        style={{
            position: "absolute",
            right: -60,

            width: "120px",
            height: "120px",

            borderRadius: "999px",
            border: "none",

            background: "#d4af37",

            fontSize: "48px",
            cursor: "pointer"
        }}
    >
        🏆
    </button>

</div>

</div>

{showTrophies && (

    <div
        style={{
            position: "fixed",
            inset: 0,
            background:
                "rgba(0,0,0,0.8)",
            zIndex: 1000,
            padding: "40px",
            overflow: "auto"
        }}
        onClick={() =>
            setShowTrophies(false)
        }
    >

        <div
            style={{
                maxWidth: "1000px",
                margin: "0 auto",
                background: "#2a2a2a",
                borderRadius: "16px",
                padding: "24px"
            }}
            onClick={e =>
                e.stopPropagation()
            }
        >

            <div
                style={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems:
                        "center",
                    marginBottom:
                        "16px"
                }}
            >

                <h2>
                    🏆 Trophy Cabinet
                </h2>

                <button
                    onClick={() =>
                        setShowTrophies(
                            false
                        )
                    }
                >
                    Close
                </button>

            </div>

            {state.trophies.length === 0 ? (

                <p>
                    Earn your first
                    trophy by completing
                    a 99 stack.
                </p>

            ) : (

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(220px, 1fr))",
                        gap: "12px"
                    }}
                >

                    {state.trophies.map(
                        trophy => (

                            <div
                                key={
                                    trophy.id
                                }
                                style={{
                                    border:
                                        "2px solid #d4af37",
                                    borderRadius:
                                        "12px",
                                    padding:
                                        "12px",
                                    background:
                                        "#1f1f1f"
                                }}
                            >

                                <h3>
                                    🏆 #
                                    {
                                        trophy.trophyNumber
                                    }
                                </h3>

                                <p>
                                    XP:
                                    {" "}
                                    {
                                        trophy.xpEarned
                                    }
                                </p>

                                <p>
                                    Deals:
                                    {" "}
                                    {
                                        trophy.dealCount
                                    }
                                </p>

                                <p>
                                    Merges:
                                    {" "}
                                    {
                                        trophy.mergeCount
                                    }
                                </p>

                                <p>
                                    {new Date(
                                        trophy.dateEarned
                                    ).toLocaleDateString()}
                                </p>

                            </div>
                        )
                    )}

                </div>

            )}

        </div>

    </div>

)}
        </div>
    )
}

export default App