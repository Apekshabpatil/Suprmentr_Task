# Placement Readiness Platform – Verification Steps

## Run the app
```bash
npm install
npm run dev
```
Open **http://localhost:5173** in your browser.

---

## 1) Live score works
- Go to **Dashboard** → **Run assessment**. You land on **Results**.
- Note the **Readiness Score** (e.g. 40 with all skills "Need practice").
- Click **I know this** on one or more skills: score should **increase by +2** per skill.
- Click **Need practice** on a skill: score should **decrease by 2**.
- Score stays between **0 and 100**.

## 2) Toggles persist after refresh
- On **Results**, set a few skills to **I know this** and a few to **Need practice**.
- Refresh the page (F5 or Ctrl+R).
- Same entry should load (first in history if you didn’t open from History).
- Skill toggles and score should be **unchanged** (stored in the history entry in `localStorage`).

## 3) History keeps changes
- From **Results**, change some toggles and note the score.
- Go to **History**.
- Click the same assessment entry to open **Results** again.
- Toggles and score should match what you set (persisted per history entry).

## 4) Export tools
On **Results**:
- **Copy 7-day plan** – clipboard has the 7-day plan text; button shows "Copied!" briefly.
- **Copy round checklist** – clipboard has the checklist.
- **Copy 10 questions** – clipboard has the 10 questions.
- **Download as TXT** – one file downloads with all three sections (7-day plan, round checklist, 10 questions).

## 5) Action Next box
- At the bottom of **Results**, **Action Next** shows:
  - **Top 3 weak skills** (skills marked "Need practice").
  - Suggestion: **"Start Day 1 plan now."**
- If all skills are "I know this", message changes to keeping up with the 7-day plan.

---

## Routes (unchanged)
- `/` – Home  
- `/dashboard` – Dashboard  
- `/results` – Results (interactive + export)  
- `/history` – History list (open entry → Results with that entry)

## Data stored per history entry
- `skillConfidenceMap[skill]` = `"know"` | `"practice"` (default: practice)
- `readinessScore` = live score (0–100), updated when toggles change
