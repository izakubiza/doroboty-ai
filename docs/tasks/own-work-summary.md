# Own-work summary on the employer candidate list

## Intent

Participant discovery (AIPH3 Supersprint, week 2) found that recruiters cannot see, before the first conversation, what a candidate did personally versus what their team did. This change prototypes the chosen solution ("idea 3") for the employer side:

- every application carries a prepared three-part work summary: what the candidate did personally, what the team did, and in which project;
- applications whose candidate describes their own work are highlighted on the employer list (`/#/app/kandydaci`);
- the employer can filter the list to candidates who describe their own work;
- the application detail (`/#/app/kandydaci/:id`) shows the same summary plus 2–3 prepared questions for the first conversation.

Scenario data: eight additional synthetic candidates apply to the BrightLabs "AI Product Manager" job (four describe their own work, four describe a supporting role) with similar Match Scores, next to the existing Marek Nowak example. They are not selectable in the person picker. Anna and Marek keep their prepared profiles; their work summaries are snapshotted on submit like the score and summary.

The candidate-side follow-up (the writing assistant must not remove the own-work sentence) is out of scope here and deferred.

## Acceptance criteria

1. As Karolina (BrightLabs), the candidate list shows 9 applications; 5 carry the "Dodany opis własnej pracy" label (Marek + 4) and every card shows the three summary lines.
2. The filter checkbox narrows the list to the labelled applications, shows the count, survives reload via the hash URL and combines with the text search.
3. The application detail shows the summary and questions for the employer only; the candidate view of their own application does not show them.
4. Existing flows still work: person picker (Anna, Marek, Karolina, Tomasz, instructor), candidate application submit, employer stage decisions, import/export/reset. Older saved scenarios without the new optional fields still parse.
5. All summaries and questions are labelled as prepared scenario content; no AI provider is called.

## Validation

Executed on Windows 11, Node 24.22.1 (2026-11-07):

- `npm run typecheck`, `npm run lint`, `npm test` (29 unit tests, including new seeding/snapshot/legacy-parse tests) and `npm run build` passed.
- Prettier check passes for every file changed in this task.
- `npm run format:check`, `npm run design-system:check` and `npm run verify:packet` fail for the whole checkout, not for this change: Git is configured with `core.autocrlf=true`, so all files were checked out with CRLF endings and the hash/CSV/format checks expect LF. Needs an LF re-checkout before these checks are meaningful.
- Playwright browser journeys (`npm run test:e2e`) were not run: no Playwright Chromium is provisioned on this machine.
- Manual browser check (in-app Chromium, after scenario reset): person picker still lists only Anna, Marek, Karolina, Tomasz and the instructor; Karolina sees 9 applications, 5 labelled; filter shows 5, survives reload via `?wlasna-praca=1`, combines with search ("Zofia" → 1, count 1); detail shows summary, caption and questions; stage changes reviewed → interview invited saved and shown on the list; Anna submitted a live application, which received her prepared summary, and her own application view shows no work summary or label; 375px list has no horizontal overflow.

## Follow-up: sorting (2026-11-07)

Added employer list sorting (Match Score by default, highest first; submission date; name) with a visible direction button. Logic in `src/features/prototype/application-sort.ts` with unit tests. Checked in the in-app browser: default order 77 → 70, direction toggle gives 70 first and `?kierunek=asc`, switching to submission date reorders and relabels the direction, 375px has no horizontal overflow. Typecheck, lint and 33 unit tests pass.

## Follow-up: submission date and freshness (2026-11-07)

Employer cards show the submission date and a freshness pill while the application awaits a first decision (submitted/reviewed): green up to 3 days, neutral 4–7, red from 8 days, matching the case evidence on invitation timing and decline rates. Logic in `application-freshness.ts` (unit-tested with a fixed clock); seeded submissions now span 27 Oct – 6 Nov 2026 so all three states appear. The age is computed from the viewer's current date, so the colours shift as real days pass. Checked in the in-app browser after a scenario reset (3 green, 3 neutral, 3 red on 7 Nov 2026; no overflow at 375px). Typecheck, lint and 36 unit tests pass.

## Follow-up: candidate availability (2026-11-07)

Added an outlined availability label to employer cards: current, at risk (8+ days awaiting a first decision) or withdrawn by the candidate; hidden after rejection or hire. Seeded Natalia Kamińska as withdrawn on 5 Nov 2026. Logic in `applicationAvailability` (unit-tested). Checked in the in-app browser after a scenario reset: 2 at risk, 1 withdrawn, 6 current. Typecheck, lint and 37 unit tests pass. Showing the recruitment stage more prominently is the planned next step.

## Follow-up: recruiting stage progress (2026-11-07)

Employer cards replace the plain stage text with "Etap N z 6: <stage>" and a six-segment bar along the main path (submitted → reviewed → invited → conversation → next stage → hired). Rejected and withdrawn applications show the furthest stage reached from their history. Logic in `stage-progress.ts` (unit-tested), component `stage-progress-bar.tsx`; candidate list unchanged. Checked in the in-app browser: Michał moved to invitation shows step 3 of 6 with two ink segments and a pink current one; Natalia shows "Wycofana na etapie 1 z 6 (Wysłana)"; 375px has no overflow. Typecheck, lint and 40 unit tests pass.

## Follow-up: card layout (2026-11-07)

Employer cards now open with the submission date, day-count and availability strip (dashed separator), then name, job and the stage bar with more spacing, then the three-sentence summary below a solid ink rule. Checked in the in-app browser on desktop and at 375px (no overflow).

## Follow-up: current applications (2026-11-07)

Per the participant: a long wait does not make an application outdated. The risk message moved into the red day-count pill ("Czeka N dni · ryzyko utraty kandydata"), and the availability label is now "Zgłoszenie aktualne" for every open process, "Kandydat wycofał zgłoszenie" after withdrawal and "Zgłoszenie nieaktualne" after rejection or hire. Added a default-checked "Pokaż tylko aktualne zgłoszenia" filter (`?aktualne=0` to show all). Checked in the in-app browser: default shows 8 of 9 (Natalia hidden), unchecking shows 9 with Natalia's withdrawal label. Typecheck, lint and 40 unit tests pass.

## Follow-up: availability wording and stage names (2026-11-07)

Availability label shortened to "Aktualne"/"Nieaktualne"; the stage bar explains why an application ended. Stage names were inherited from the case project (`stages`/`stageLabels` in `model.ts`, matching the funnel columns in `docs/case/baseline/journeys.json`); per the participant they now name what happened for the employer (Nowe zgłoszenie, Przejrzane, Zaproszenie na rozmowę, Po pierwszej rozmowie, Dalsza rekrutacja, Zatrudnienie, Odrzucone, Wycofane przez kandydata). Candidates keep Aplikacja wysłana, Proces zakończony and Wycofane via `candidateStageLabels`. Unit tests and the (not executed) Playwright journeys were updated to the new names. Checked in the in-app browser as Karolina (list, decision buttons, history) and Marek (list, detail, history). Typecheck, lint and 40 unit tests pass.

Renamed again per the participant: stage 3 "Zaproszenie wysłane", stage 4 "Rozmowa odbyta" (kept the held-conversation meaning from the case data), stage 5 "Kontynuacja" (bar label "Kontynuacja").

## Follow-up: score area and warning colour (2026-11-07)

Employer card now uses a grid: main column (date strip, name, job, stage bar) and a separate Match Score panel (88px ring, 64px on phones) in the top-right corner level with the date row; the brand-pink own-work label sits below the panel (full width below the main column on phones). The dashed rule under the date strip was removed. The 8+ day wait pill is yellow with an ink contour instead of red, and wraps on phones. Checked by geometry in the in-app browser at 1280px and 375px (panel top-right, label below and right-aligned, no overlap or horizontal overflow).

- Removed the canvas background and padding from the score panel at the user's request; the ring stands directly on the card.
- Highlighted the summary: new WorkSummaryCard with heading 'Co kandydat zrobił sam', ink contour, and an emphasised 'Własny wkład' row (light pink if ownWork, grey surface otherwise). Detail view reuses the same block.
- Removed ink contours from the summary block and own-contribution row; non-own-work rows have no background and bold the leading 'Nie opisuje…' clause. Added a 'Zobacz szczegóły' link button (pink button style, arrow icon, accessible name includes the candidate) at the bottom right of each employer card.
- Own-contribution row fill changed from light pink to light green (--gui-success-transparent) at the user's request.
- Recruiter stage buttons now use action verbs (stageActionLabels in model.ts) instead of stage names; stage labels, history and announcements unchanged. E2E selectors updated (not executed: no provisioned Playwright Chromium).
- Added an outline 'Wróć na listę kandydatów' link button at the bottom of the employer application detail (always shown, separated by a divider); the top breadcrumb stays.
