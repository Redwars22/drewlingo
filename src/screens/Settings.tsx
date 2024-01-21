import { HeaderComponent } from "../components/Header.component";
import useDrewlingoStore from "../modules/store";

export default function SettingsScreen() {
  const { data, updateData } = useDrewlingoStore();

  return (
    <div>
      <HeaderComponent />
      <div
        style={{
          marginTop: "120px",
        }}
      >
        <h1>Configurações</h1>
        <button>Reiniciar Progresso</button>
      </div>
    </div>
  );
}
