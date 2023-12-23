import { useNavigate } from "react-router";
import { HeaderComponent } from "../components/Header.component";
import useDrewlingoStore from "../modules/store";
import { TSuccess } from "../types/types";

export default function SuccessOrFailScreen() {
    const { data: drewlingo } = useDrewlingoStore();
    const navigate = useNavigate();

    const didUserWin: () => boolean = (): boolean => {
        if (drewlingo?.lives <= 0) {
            return false;
        }

        return true;
    }

    return (
        <>
            <HeaderComponent />
            <div style={{
                marginTop: "100px",
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: "80vw",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <i
                    className={`bi bi-${didUserWin() ?
                        "trophy-fill" :
                        "emoji-frown-fill"}`}
                    style={{
                        fontSize: '200px',
                        color: didUserWin() ? 'orange' : 'white'
                    }}
                ></i>
                <h2>{didUserWin() ? 'Parabéns! Você concluiu a lição!' : "Oops, tente novamente"}</h2>
                <button className="btn btn-success" onClick={()=>{
                    navigate('/')
                }}>Continuar</button>
            </div>
        </>
    )
}