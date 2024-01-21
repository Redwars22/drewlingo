import { useNavigate } from "react-router"
import useDrewlingoStore from "../modules/store";
import { TCourse } from "../types/types";

export const HeaderComponent = () => {
    const { data, updateData } = useDrewlingoStore();

    const navigate = useNavigate();

    return (
        <header>
            <nav className="border fixed split-nav" style={{
                display: "flex",
                gap: "16px",
                alignItems: "center"
            }}>
                <div className="nav-brand" style={{
                    cursor: "pointer"
                }} onClick={() => navigate("/")}>
                    <h1 className="text text-success">
                        <i className="bi bi-translate"></i>
                        Drewlingo</h1>
                </div>
                <div className="collapsible">
                    <input id="collapsible1" type="checkbox" name="collapsible1" />
                    <label htmlFor="collapsible1">
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </label>
                    <div className="collapsible-body">
                        <ul className="inline" style={{
                            display: "flex",
                            gap: "16px",
                            alignItems: "center"
                        }}>
                            <button className="btn-danger" disabled>HISTÓRIAS</button>
                            <button className="btn-danger" onClick={()=> navigate("/words")}>
                                PALAVRAS</button>
                            <li>
                                <div className="form-group dark">
                                    <select id="paperSelects1" value={data.course} onChange={(ev) => {
                                        updateData({
                                            ...data,
                                            course: ev.target.value as unknown as TCourse
                                        })
                                    }}>
                                        <option value="regentish">Regentino</option>
                                        <option value="crvenagorski">Monterrubrino</option>
                                        <option value="shatan">Shatan Lishon</option>
                                    </select>
                                </div>
                            </li>
                            <li><i className="bi bi-trophy-fill text-danger"></i>{data!.points}</li>
                            <li><i className="bi bi-heart-fill text-danger"></i>{data!.lives}</li>
                            <button className="btn-success" onClick={() => navigate("/settings")}>
                                <i className="bi bi-gear"></i>
                            </button>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}