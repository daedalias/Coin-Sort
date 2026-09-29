import {
    useReducer,
    useState,
    useRef
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
const importInputRef =
    useRef<HTMLInputElement>(null)
useEffect(() => {

    saveGame(state)

}, [state])
const viewportHeight =
    window.innerHeight

const reservedHeight =
    430

const tubeHeight =
    Math.floor(
        (viewportHeight - reservedHeight) / 4
    )

const tubeWidth =
    Math.floor(
        tubeHeight * 0.343
    )
function exportProgress() {

    const progress = {

        exportVersion:
            state.exportVersion,

        level:
            state.level,

        xp:
            state.xp,

        lifetimeXp:
            state.lifetimeXp,

        currentCheckpoint:
            state.currentCheckpoint,

        trophies:
            state.trophies,

        nextTrophyNumber:
            state.nextTrophyNumber
    }

    const blob =
        new Blob(
            [
                JSON.stringify(
                    progress,
                    null,
                    2
                )
            ],
            {
                type:
                    "application/json"
            }
        )

    const url =
        URL.createObjectURL(
            blob
        )

    const link =
        document.createElement(
            "a"
        )

    link.href = url

    link.download =
        "coin-sort-progress.json"

    link.click()

    URL.revokeObjectURL(
        url
    )
}

async function importProgress(
    event:
    React.ChangeEvent<HTMLInputElement>
) {

    const file =
        event.target.files?.[0]

    if (!file) {
        return
    }

    const text =
        await file.text()

    const progress =
        JSON.parse(text)

    const savedGame =
        createEmptyGameState()

    dispatch({

        type: "LOAD",

        state: {

            ...savedGame,

            level:
                progress.level ?? 1,

            xp:
                progress.xp ?? 0,

            lifetimeXp:
                progress.lifetimeXp ?? 0,

            currentCheckpoint:
                progress.currentCheckpoint ?? 1,

            trophies:
                progress.trophies ?? [],

            nextTrophyNumber:
                progress.nextTrophyNumber ?? 1
        }
    })
}

return (

    <div
        style={{
           height: "100svh",
            background: "#2e2e2e",
            color: "white",
           display: "flex",
flexDirection: "column",
justifyContent: "flex-start",
alignItems: "center",
paddingTop: "0px",
            gap: "12px"
        }}
    >

<div
    style={{
      width: "100%",
maxWidth: "700px",

    }}
>

<div
    style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: "32px"
    }}
>

    <div
        style={{
            display: "flex",
            gap: "12px"
        }}
    >

        <button
            onClick={exportProgress}
            style={{
                fontSize: "24px",
                padding: "12px 24px"
            }}
        >
            Export
        </button>

        <button
            onClick={() =>
                importInputRef.current?.click()
            }
            style={{
                fontSize: "24px",
                padding: "12px 24px"
            }}
        >
            Import
        </button>

    </div>

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
                maxWidth: "90vw",
width: "90vw",

                margin: "0 auto",
                background: "#2a2a2a",
                borderRadius: "16px",
                padding: "48px"
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

                <h2
    style={{
        fontSize: "40px",
        margin: 0
    }}
>
    🏆 Trophy Cabinet
</h2>

             <button
    onClick={() =>
        setShowTrophies(
            false
        )
    }
    style={{
        fontSize: "24px",
        padding: "12px 24px"
    }}
>
    Close
</button>

            </div>

            {state.trophies.length === 0 ? (

            <p
    style={{
        fontSize: "28px"
    }}
>
    Earn your first
    trophy by completing
    a 99 stack.
</p>

            ) : (

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(320px, 1fr))",
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