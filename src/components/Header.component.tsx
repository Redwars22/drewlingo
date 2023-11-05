import { useNavigate } from "react-router"

export const HeaderComponent = () => {
    const navigate = useNavigate();

    return (
        <header>
            <nav className="border fixed split-nav" style={{
                display: "flex",
                gap: "16px",
                alignItems: "baseline"
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
                            alignItems: "baseline"
                        }}>
                            <li>
                                <div className="form-group dark">
                                    <select id="paperSelects1">
                                        <option value="1">Regentino</option>
                                        <option value="2">Monterrubrino</option>
                                        <option value="3">Shatan Lishon</option>
                                    </select>
                                </div>
                            </li>
                            <li><i className="bi bi-trophy-fill text-danger"></i>3</li>
                            <li><i className="bi bi-heart-fill text-danger"></i>3</li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}