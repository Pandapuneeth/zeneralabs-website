# SentinelAI — Security Log Anomaly Detection — Instagram Pack

## Carousel (7 slides) — "A Mini-SIEM that explains itself"

Visuals: rich source — 14 presentation PNGs (`PAGE 1`–`PAGE 14.png`), `sentinelai-arch.png`.

1. **Cover — HOOK**
   "'Attacker on the log' should never need a manual grep."
   Visual: `PAGE 1.png` title slide.
2. **The volume problem**
   "Too many events. Too few analysts. Early indicators buried in noise."
   Visual: `PAGE 2.png` problem statement.
3. **Ingest & score**
   "Every event is validated, rule-scored, and stored — location and device risk first."
   Visual: `PAGE 3.png` / `PAGE 5.png` system + detection slides.
4. **Hybrid detection**
   "Isolation Forest + per-user behaviour baselines → composite risk; alert at ≥ 80."
   Visual: `PAGE 6.png` ML detection slide.
5. **Attack-chain correlation**
   "Credential stuffing. Account takeover. Insider threat. Impossible travel."
   Visual: `PAGE 7.png` correlation slide.
6. **Explainable alerts**
   "SHAP shows *why* — so analysts investigate evidence, not flags."
   Visual: `PAGE 9.png` explainable AI slide + `PAGE 10.png` SOC dashboard.
7. **CTA**
   "Detection engineering without a platform-level budget → zeneralabs.in/portfolio/security-log-anomaly-detection"
   Visual: end-card (reuse `PAGE 14.png` roadmap slide).
   Objection handles: demo-scale SQLite backend, mock IOC feed, seeded demo accounts.

**Caption:**
Rule + ML + MITRE ATT&CK + SHAP + a SOC dashboard inside one internally built reference Mini-SIEM. 38 unit tests. Built by Zenera Labs, not outsourced.

Hashtags: #Cybersecurity #SIEM #DetectionEngineering #MITRE #ZeneraLabs

## Reel (40-60s) — "Attack chain, explained"

Source: build from `PAGE *.png` slides (Ken Burns pan/zoom), no video file available.

Storyboard (slides + motion):
- 0:00–0:05 hook: text "failed login — failed login — SUCCESS?" over `PAGE 2`.
- 0:05–0:15 zoom into `PAGE 5` pipeline: event → rule score → store → detect.
- 0:15–0:28 pan `PAGE 7` correlation: credential-stuffing chain highlighted.
- 0:28–0:42 zoom `PAGE 9`: SHAP "why" explanation on screen.
- 0:42–0:52 pan `PAGE 10` dashboard: live alert list, risk bars.
- 0:52–0:60 end card: "Risk-scored alerts from security events. Zenera Labs Engineering Portfolio."

This is a slide-motion reel (no footage) — fast pans, punchy captions, bass-heavy track.