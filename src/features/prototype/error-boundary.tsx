import { Component, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { STORAGE_KEY } from "./storage";
import { downloadText } from "./settings";

function readRawSave(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

type Props = { children: ReactNode };
type State = { failed: boolean };

/**
 * Last-resort screen for unexpected render errors. It never shows the error
 * text (it may contain private free text) and never modifies the stored save.
 */
export class AppErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    const raw = readRawSave();
    return (
      <main className="prototype-section" role="alert">
        <h1>Coś poszło nie tak</h1>
        <p className="my-5">
          Ten ekran nie mógł się wyświetlić. Dane zapisane w tej przeglądarce nie zostały usunięte
          ani zmienione. Odśwież stronę albo wróć na stronę główną. Jeśli problem wraca, pobierz
          kopię danych i opisz, co działo się tuż przed błędem.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button type="button" onClick={() => window.location.reload()}>
            Odśwież stronę
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              window.location.hash = "#/";
              window.location.reload();
            }}
          >
            Wróć na stronę główną
          </Button>
          {raw !== null && (
            <Button
              type="button"
              variant="outline"
              onClick={() => downloadText("doroboty-zapis-do-odzyskania.txt", raw, "text/plain")}
            >
              Pobierz kopię danych
            </Button>
          )}
        </div>
      </main>
    );
  }
}
