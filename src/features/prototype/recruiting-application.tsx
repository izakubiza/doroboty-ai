import { useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { Button, buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ApplicationRecord } from "./application-record";
import { nextStages, stageActionLabels, stageLabels, type Application } from "./model";
import { usePrototype } from "./store";
import { WorkSummaryDetail } from "./work-summary";

export function RecruitingApplication({ application }: { application: Application }) {
  const { state, run } = usePrototype();
  const [note, setNote] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const statusRef = useRef<HTMLSpanElement>(null);
  const pendingFocus = useRef(false);
  const company = state.companies.find((item) => item.id === application.companyId);
  const availableStages = nextStages[application.stage];

  useLayoutEffect(() => {
    if (pendingFocus.current) {
      statusRef.current?.focus();
      pendingFocus.current = false;
    }
  }, [application.stage]);

  return (
    <>
      <ApplicationRecord
        application={application}
        companyName={company?.name ?? ""}
        audience="employer"
        history={application.events}
        statusRef={statusRef}
        footer={
          <>
            {availableStages.length > 0 ? (
              <>
                <p className="record-caption">Notatka zapisze się w historii po zmianie etapu.</p>
                <div className="record-actions">
                  {availableStages.map((stage) => (
                    <Button
                      key={stage}
                      variant={stage === "rejected" ? "outline" : "default"}
                      onClick={() => {
                        if (run({ type: "stage", applicationId: application.id, stage, note })) {
                          setNote("");
                          setAnnouncement(`Zapisano etap: ${stageLabels[stage]}.`);
                          pendingFocus.current = true;
                        }
                      }}
                    >
                      {stageActionLabels[stage]}
                    </Button>
                  ))}
                </div>
              </>
            ) : (
              <p className="record-caption">
                {stageLabels[application.stage]}. Brak kolejnych działań w tym procesie.
              </p>
            )}
            <div className="record-back">
              <Link className={buttonVariants({ variant: "outline" })} to="/app/kandydaci">
                <ArrowLeft aria-hidden="true" />
                Wróć na listę kandydatów
              </Link>
            </div>
          </>
        }
      >
        {application.work && <WorkSummaryDetail work={application.work} />}
        {availableStages.length > 0 ? (
          <>
            <h3>
              <label htmlFor="recruiting-note">Notatka rekrutacyjna</label>
            </h3>
            <p className="record-caption" id="recruiting-note-hint">
              Widoczna tylko pracodawcy w tym scenariuszu.
            </p>
            <Textarea
              id="recruiting-note"
              aria-label="Notatka rekrutacyjna (widoczna pracodawcy)"
              aria-describedby="recruiting-note-hint"
              maxLength={12000}
              rows={4}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Co warto sprawdzić w rozmowie?"
            />
          </>
        ) : null}
      </ApplicationRecord>
      <p role="status" className="sr-only">
        {announcement}
      </p>
    </>
  );
}
