import { HeaderComponent } from "../components/Header.component";
import useDrewlingoStore from "../modules/store"
import { handleSpeech } from "../modules/textToSpeech";
import { ILearnedWords } from "../types/types";

export default function WordsScreen() {
    const { data } = useDrewlingoStore();

    const words = data.learnedWords;

    return (
        <>
            <HeaderComponent />
            <div
                style={{
                    maxWidth: "60vw",
                    marginTop: "100px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    alignItems: "center"
                }}
            >
                <h1>Lista de Palavras Aprendidas</h1>
                {
                    words.length > 0 && words.map((word: ILearnedWords) => <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px dashed white",
                        maxWidth: "50vw",
                        width: "50vw"
                    }}>
                        <div style={{
                            display: "flex",
                            gap: "10px"
                        }}>
                            <strong>{word.token}</strong>
                            <em>{word.translation}</em>
                        </div>
                        <button
                            className="btn btn-dark background-secondary"
                            onClick={() => handleSpeech(word.pronunciation, data.course)}
                        >
                            <i className="bi bi-volume-up"></i>
                        </button>
                    </div>)
                }</div>
        </>
    )
}