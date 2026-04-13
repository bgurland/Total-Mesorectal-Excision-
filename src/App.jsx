import { useState } from "react";

// ─── DATA ──────────────────────────────────────────────────────────────────

const STEPS = {
  lap: [
    {
      num: 1, title: "Patient positioning & port placement",
      color: "blue",
      keys: [
        "Lloyd-Davies / modified lithotomy position",
        "Left arm tucked, 15–20° Trendelenburg + right lateral tilt",
        "5-port configuration: umbilical camera (12mm), RLQ working (12mm), LLQ assistant, RUQ + LUQ 5mm",
        "Surgeon stands on patient's right side"
      ],
      pitfall: "Inadequate Trendelenburg leads to small bowel crowding the pelvis — reposition early, not mid-dissection.",
      pearl: "Place left lower port lateral to the epigastric vessels — confirm with transillumination before trocar insertion.",
      videos: [{ label: "Port placement overview", url: "https://www.youtube.com/results?search_query=laparoscopic+TME+port+placement" }]
    },
    {
      num: 2, title: "Medial-to-lateral mobilization & IMA ligation",
      color: "blue",
      keys: [
        "Elevate sigmoid at sacral promontory — identify IMA pedicle",
        "Develop avascular retromesenteric plane (Toldt's fascia)",
        "Identify and preserve left ureter and gonadal vessels before ligation",
        "High vs low tie: high tie for oncologic cases; preserve LCA when feasible",
        "Apply clips or vessel sealer 1–2 cm from aorta for high ligation"
      ],
      pitfall: "Ureteral injury — the ureter crosses beneath the IMA origin. Always confirm identification before ligation.",
      pearl: "The 'holy plane' is entered at the sacral promontory — correct plane is bloodless with pre-hypogastric nerves visible.",
      videos: [{ label: "IMA ligation technique", url: "https://www.youtube.com/results?search_query=laparoscopic+IMA+ligation+rectal+cancer" }]
    },
    {
      num: 3, title: "Splenic flexure takedown",
      color: "teal",
      keys: [
        "Required for tension-free anastomosis — especially for low rectal tumors",
        "Divide splenocolic and phrenocolic ligaments",
        "Enter lesser sac through gastrocolic omentum",
        "Mobilize IMV at inferior border of the pancreas",
        "Ensure adequate colonic reach to the pelvis (>6 cm below pubic symphysis)"
      ],
      pitfall: "Splenic injury from traction on the splenocolic ligament — divide under direct vision, never bluntly.",
      pearl: "IMV division at the ligament of Treitz provides an additional 4–6 cm of reach without compromising vascularity.",
      videos: [{ label: "Splenic flexure mobilization", url: "https://www.youtube.com/results?search_query=laparoscopic+splenic+flexure+takedown+rectal" }]
    },
    {
      num: 4, title: "TME dissection — posterior & lateral planes",
      color: "purple",
      keys: [
        "Enter the holy plane posterior to the mesorectum — anterior to pre-sacral fascia",
        "Sharp dissection under direct vision — energy devices sparingly",
        "Identify and preserve hypogastric nerves bilaterally",
        "Posterior dissection to the level of the levator ani",
        "Lateral stalks divided last — contain middle rectal vessels and nerve bundles"
      ],
      pitfall: "Pre-sacral venous plexus hemorrhage from wrong plane — if bleeding, you are posterior to Waldeyer's fascia.",
      pearl: "Hypogastric nerves are visible as white cord-like structures at the pelvic brim — sweep anteriorly to preserve them.",
      videos: [
        { label: "TME posterior dissection", url: "https://www.youtube.com/results?search_query=laparoscopic+TME+posterior+dissection" },
        { label: "Nerve preservation", url: "https://www.youtube.com/results?search_query=autonomic+nerve+preservation+TME" }
      ]
    },
    {
      num: 5, title: "Anterior dissection — Denonvilliers' fascia",
      color: "purple",
      keys: [
        "Most challenging plane — especially in obese males",
        "Peritoneal incision at the rectovesical / rectouterine pouch",
        "Dissect anterior to Denonvilliers' fascia for oncologic cases",
        "Posterior to Denonvilliers' for benign disease (preserve it)",
        "Identify seminal vesicles / posterior vaginal wall as landmarks"
      ],
      pitfall: "Urethral injury during low anterior dissection — NVBs run lateral; excessive anterior traction risks urethral damage.",
      pearl: "In males, traction on the Foley catheter helps identify the urethra — feel the balloon before dividing the rectourethralis.",
      videos: [
        { label: "Anterior TME plane", url: "https://www.youtube.com/results?search_query=laparoscopic+anterior+TME+Denonvilliers" }
      ]
    },
    {
      num: 6, title: "Rectal transection & specimen extraction",
      color: "amber",
      keys: [
        "Confirm adequate distal margin (≥1 cm for mid/low rectal cancers)",
        "Wash rectal stump with cytocidal solution (betadine/water)",
        "Apply roticulating endostapler — typically 2 fires for adequate closure",
        "Extract specimen via Pfannenstiel or extended port site with wound protector",
        "Inspect mesorectum completeness (Quirke grading) before anastomosis"
      ],
      pitfall: "Incomplete mesorectal resection at the anterior distal margin — inspect before proceeding; consider converting if TME integrity is compromised.",
      pearl: "Two stapler firings at an angle increases risk of dog-ear — ensure perpendicular firing and minimize overlap.",
      videos: [{ label: "Rectal transection technique", url: "https://www.youtube.com/results?search_query=laparoscopic+rectal+transection+TME+stapler" }]
    },
    {
      num: 7, title: "Colorectal anastomosis & leak test",
      color: "green",
      keys: [
        "Circular stapled anastomosis — EEA 29/31mm",
        "Purse-string suture on proximal colon or anvil insertion via proximal bowel",
        "Confirm two complete donuts",
        "Air leak test: submerge anastomosis in saline, insufflate via rigid sigmoidoscope",
        "Diverting loop ileostomy for low anastomosis (<6 cm from AV), post-neoadjuvant, or tenuous anastomosis"
      ],
      pitfall: "Anastomotic leak is the most feared complication (rate 5–15% for low rectal). Risk factors: male sex, obesity, neoadjuvant therapy, low anastomosis.",
      pearl: "If air bubbles seen on leak test — over-sew the defect and consider diversion; do not rely on the anastomosis holding.",
      videos: [
        { label: "Circular stapled anastomosis", url: "https://www.youtube.com/results?search_query=circular+stapled+colorectal+anastomosis+technique" },
        { label: "Leak test demonstration", url: "https://www.youtube.com/results?search_query=anastomotic+leak+test+colorectal" }
      ]
    }
  ],
  rob: [
    {
      num: 1, title: "Docking & trocar configuration",
      color: "blue",
      keys: [
        "Da Vinci Xi system — preferred for TME (multiquadrant access)",
        "Steep Trendelenburg (30°) + right lateral tilt",
        "4 robotic arms; 8–12mm ports in curved line across abdomen",
        "Assistant port (12mm) in RLQ for staplers, suction, specimen bags",
        "Camera arm over umbilicus; target anatomy = sacral promontory"
      ],
      pitfall: "Inadequate docking angle causes arm conflicts mid-operation — plan trocar placement with the robot target in mind before incision.",
      pearl: "Xi allows lateral docking with less repositioning for splenic flexure — use Firefly fluorescence for ureteral identification.",
      videos: [
        { label: "Herrando et al. 2022 (DC&R)", url: "https://journals.lww.com/dcrjournal/abstract/2022/05000/step_by_step__demonstration_of_robotic_low.32.aspx", featured: true },
        { label: "Robotic TME docking Xi", url: "https://www.youtube.com/results?search_query=robotic+TME+da+vinci+Xi+docking+configuration" }
      ]
    },
    {
      num: 2, title: "Medial-to-lateral mobilization & IMA ligation",
      color: "blue",
      keys: [
        "Same oncologic principles as laparoscopic — enter retromesenteric plane at promontory",
        "Wristed instruments facilitate precise nerve identification",
        "Maryland bipolar forceps + monopolar scissors for medial dissection",
        "Hem-o-lok clips for IMA ligation under 3D magnified view",
        "Ureter identification facilitated by Firefly ICG fluorescence"
      ],
      pitfall: "Over-reliance on robotic precision — haptic feedback is absent; excessive force risks avulsion of IMA or ureter.",
      pearl: "The 30° up camera angle during IMA dissection provides better visualization of retroperitoneal structures.",
      videos: [
        { label: "Herrando et al. 2022 (DC&R)", url: "https://journals.lww.com/dcrjournal/abstract/2022/05000/step_by_step__demonstration_of_robotic_low.32.aspx", featured: true },
        { label: "Robotic IMA ligation", url: "https://www.youtube.com/results?search_query=robotic+IMA+ligation+rectal+cancer" }
      ]
    },
    {
      num: 3, title: "Splenic flexure mobilization",
      color: "teal",
      keys: [
        "Option 1: Re-dock Xi laterally for full robotic splenic flexure",
        "Option 2: Laparoscopic assistant performs flexure while robot docked pelvically (hybrid)",
        "IMV ligation at inferior pancreatic border",
        "Energy sealing of splenocolic and phrenocolic attachments",
        "Confirm adequate reach before pelvic dissection begins"
      ],
      pitfall: "Splenic capsule tear with robotic arm movement in tight subphrenic space — consider undocking for flexure in obese patients.",
      pearl: "Hybrid approach (robotic pelvis + laparoscopic flexure) saves OR time and avoids re-docking complexity in most cases.",
      videos: [
        { label: "Herrando et al. 2022 (DC&R)", url: "https://journals.lww.com/dcrjournal/abstract/2022/05000/step_by_step__demonstration_of_robotic_low.32.aspx", featured: true },
        { label: "Robotic splenic flexure", url: "https://www.youtube.com/results?search_query=robotic+splenic+flexure+takedown" }
      ]
    },
    {
      num: 4, title: "Robotic TME — posterior & lateral planes",
      color: "purple",
      keys: [
        "Wristed instruments provide superior angulation in the narrow male pelvis",
        "Fenestrated bipolar for retraction + monopolar scissors for dissection",
        "3D magnification enhances nerve visualization — identify both hypogastric nerves",
        "Posterior dissection to pelvic floor under excellent illumination",
        "Fourth arm provides independent retraction — key advantage over laparoscopic"
      ],
      pitfall: "Loss of tactile feedback — watch for tension on nerves visually; use traction-countertraction with the fourth arm.",
      pearl: "Robotic TME's main advantage is posterior/lateral pelvic dissection in the narrow male pelvis — this is where it earns its place.",
      videos: [
        { label: "Herrando et al. 2022 (DC&R)", url: "https://journals.lww.com/dcrjournal/abstract/2022/05000/step_by_step__demonstration_of_robotic_low.32.aspx", featured: true },
        { label: "Robotic pelvic TME", url: "https://www.youtube.com/results?search_query=robotic+TME+pelvic+dissection+posterior" }
      ]
    },
    {
      num: 5, title: "Anterior dissection — Denonvilliers' fascia",
      color: "purple",
      keys: [
        "Robotic wristed dissection provides excellent anterior visibility",
        "Peritoneal incision at the rectovesical pouch — maintained tension via arm 3 retraction",
        "Sharp entry anterior to Denonvilliers' for oncologic cases",
        "Identify seminal vesicles / NVBs with 3D magnification",
        "Use 0° lens for anterior dissection; switch to 30° down for lateral steps"
      ],
      pitfall: "NVB injury at 3 and 9 o'clock positions during lateral–anterior junction — stay on the mesorectum.",
      pearl: "The robotic platform's 3D magnification makes NVB identification more reliable at the anterolateral junction than standard laparoscopic.",
      videos: [
        { label: "Herrando et al. 2022 (DC&R)", url: "https://journals.lww.com/dcrjournal/abstract/2022/05000/step_by_step__demonstration_of_robotic_low.32.aspx", featured: true },
        { label: "Robotic anterior TME", url: "https://www.youtube.com/results?search_query=robotic+TME+anterior+dissection+Denonvilliers" }
      ]
    },
    {
      num: 6, title: "Rectal transection & specimen extraction",
      color: "amber",
      keys: [
        "Robotic EndoWrist stapler or undock for laparoscopic stapler",
        "Robotic stapler allows articulation in narrow pelvis — single-fire transection more achievable",
        "Wash rectal stump via assistant port",
        "Extract specimen via Pfannenstiel with wound protector",
        "Inspect mesorectum — Quirke grading on back table; Grade 3 (complete) is the goal"
      ],
      pitfall: "Robot-assisted stapler misfiring in narrow pelvis — ensure adequate visualization before firing; confirm no adjacent tissue included.",
      pearl: "Quirke Grade 3 (complete): smooth mesorectal surface, no defects >5mm, coning only at level of insertion.",
      videos: [
        { label: "Herrando et al. 2022 (DC&R)", url: "https://journals.lww.com/dcrjournal/abstract/2022/05000/step_by_step__demonstration_of_robotic_low.32.aspx", featured: true },
        { label: "TME specimen Quirke grading", url: "https://www.youtube.com/results?search_query=TME+specimen+Quirke+grading+mesorectum" }
      ]
    },
    {
      num: 7, title: "Colorectal anastomosis & leak test",
      color: "green",
      keys: [
        "EEA 29/31mm circular stapled anastomosis — undock robot for anvil placement and stapler firing",
        "Confirm two complete donuts",
        "Air leak test mandatory — submerge and insufflate",
        "Diversion threshold: low anastomosis, irradiated tissue, technical concern",
        "Consider transanal reinforcement sutures (TAMIS-assisted) for borderline anastomoses"
      ],
      pitfall: "Anastomotic leak rates for robotic TME are equivalent to laparoscopic in RCTs — the anastomosis is still the weak point regardless of platform.",
      pearl: "The decision to divert should be made preoperatively based on risk factors — not contingent solely on intraoperative leak testing.",
      videos: [
        { label: "Herrando et al. 2022 (DC&R)", url: "https://journals.lww.com/dcrjournal/abstract/2022/05000/step_by_step__demonstration_of_robotic_low.32.aspx", featured: true },
        { label: "EEA anastomosis technique", url: "https://www.youtube.com/results?search_query=EEA+circular+stapler+colorectal+anastomosis" }
      ]
    }
  ]
};

const QUIZ_QUESTIONS = [
  {
    tag: "Anatomy", tagColor: "purple",
    q: "You are entering the 'holy plane' during posterior TME dissection. Which fascial layer defines the correct posterior boundary — the layer you must stay anterior to?",
    opts: ["Denonvilliers' fascia", "Waldeyer's fascia (presacral fascia)", "Toldt's fascia", "Gerota's fascia"],
    ans: 1,
    exp: "Waldeyer's fascia (rectosacral fascia) is the correct posterior boundary. The holy plane lies anterior to it, between the mesorectal fascia propria and the presacral fascia. Violating posteriorly places you at risk for presacral venous plexus hemorrhage — a hallmark of wrong-plane dissection."
  },
  {
    tag: "Pitfall", tagColor: "red",
    q: "During posterior TME dissection you encounter brisk venous bleeding from the posterior midline. What is the most likely error and the first maneuver?",
    opts: ["Arterial injury — apply clips to IMA", "Entry posterior to Waldeyer's fascia into the presacral venous plexus — direct pressure and reorient anteriorly", "Injury to the middle rectal artery — bipolar coagulation", "Mesorectal vessel — energy device to the bleeding point"],
    ans: 1,
    exp: "Presacral venous plexus hemorrhage results from dissecting posterior to Waldeyer's fascia. The plexus retracts into sacral foramina — clips and energy are rarely effective. First maneuver: direct pressure. Then reorient anteriorly into the correct plane. Prevention is key."
  },
  {
    tag: "Anatomy", tagColor: "purple",
    q: "At what anatomical landmark do the hypogastric nerves become visible, and in which direction must you sweep them to preserve autonomic function?",
    opts: ["At the aortic bifurcation — sweep laterally", "At the pelvic brim / sacral promontory — sweep anteriorly with the mesorectum", "At the level of S3 — sweep posteriorly", "At the lateral stalks — sweep medially"],
    ans: 1,
    exp: "The hypogastric nerves descend from the superior hypogastric plexus and are visible as white cord-like structures at the pelvic brim. They must be swept anteriorly — they travel with the specimen side unless actively protected. Injury causes bladder dysfunction and sexual dysfunction."
  },
  {
    tag: "Rob vs Lap", tagColor: "blue",
    q: "A 58-year-old obese male (BMI 34) has a cT3N1 mid-rectal tumor post-neoadjuvant chemoradiation. Which statement best describes the platform advantage of robotic over laparoscopic TME in this patient?",
    opts: ["Robotic significantly reduces anastomotic leak rate compared to laparoscopic", "Wristed instrumentation and 3D magnification improve dissection quality in the narrow irradiated male pelvis where straight laparoscopic instruments lose range of motion", "Robotic approach eliminates the need for diverting ileostomy", "Robotic allows faster splenic flexure mobilization"],
    ans: 1,
    exp: "The robotic platform's primary advantage is mechanical: wristed instruments maintain degrees of freedom in the confined male pelvis. However, ROLARR (Jayne et al., JAMA 2017) showed no significant difference in conversion rates or anastomotic leak rates. The benefit is ergonomic and technical, most pronounced in obese males with narrow pelvises."
  },
  {
    tag: "Decision", tagColor: "amber",
    q: "After completing a low anterior resection with TME, your air leak test shows bubbles at the anterior aspect of the anastomosis at 4 cm from the anal verge post-neoadjuvant radiation. What is the correct management sequence?",
    opts: ["Repeat the leak test — a single bubble is acceptable", "Take down the anastomosis and perform end colostomy", "Over-sew the defect transanally, confirm resolution on repeat leak test, then form a diverting loop ileostomy", "Place a pelvic drain and close — the anastomosis will seal"],
    ans: 2,
    exp: "A positive leak test at a low, irradiated anastomosis requires active management. Correct sequence: (1) transanal over-suture of the defect, (2) confirm resolution on repeat air test, (3) divert with loop ileostomy. Simply draining carries unacceptably high rates of clinical leak and pelvic sepsis."
  },
  {
    tag: "Anatomy", tagColor: "purple",
    q: "During anterior dissection in a male patient for a mid-rectal cancer, which structure defines the anterior limit of safe dissection and how do you identify it intraoperatively?",
    opts: ["The prostate — identified by firm texture and traction on the Foley catheter", "The seminal vesicles — identified by their Y-shaped bifurcation posteriorly", "The neurovascular bundles — identified by their lateral position at 3 and 9 o'clock", "The urethra — identified by transillumination"],
    ans: 0,
    exp: "The prostate is the anterior limit of dissection. Traction on the Foley catheter allows you to feel and see the balloon, confirming the urethral course before the distal anterior dissection. The seminal vesicles are important landmarks at the proximal entry point, while NVBs run laterally."
  },
  {
    tag: "Rob vs Lap", tagColor: "blue",
    q: "The ROLARR randomized trial (Jayne et al., JAMA 2017) compared robotic vs laparoscopic rectal resection. What was the primary finding?",
    opts: ["Robotic significantly reduced conversion to open (primary endpoint met)", "No significant difference in conversion rate to open surgery between robotic and laparoscopic (primary endpoint not met)", "Laparoscopic had significantly lower conversion rates", "The trial was stopped early due to clear robotic superiority"],
    ans: 1,
    exp: "ROLARR's primary endpoint — reduction in conversion to open — was not met. Conversion occurred in 8.1% of robotic vs 12.2% of laparoscopic cases (OR 0.61, p=0.16). Secondary outcomes including 30-day morbidity, CRM positivity, TME completeness, and functional outcomes were also equivalent."
  },
  {
    tag: "Pitfall", tagColor: "red",
    q: "During IMA ligation, the left ureter was not explicitly identified before clip application. What is the correct next step?",
    opts: ["Proceed — the ureter is typically lateral and safe at this level", "Stop, release any clips if possible, and identify the ureter by tracing it from where it crosses under the IMA origin before proceeding", "Place ureteral stents via cystoscopy before proceeding", "Ask the assistant to look for peristalsis to confirm ureteral identity"],
    ans: 1,
    exp: "The left ureter is at highest risk immediately beneath the IMA origin. Stop and identify it explicitly — not assume safety. Develop the retromesenteric plane (Toldt's fascia) to visualize the ureter before any ligation. Ureteral stents are useful prophylactically in redo pelvis or post-radiation cases but not a substitute for visual identification."
  },
  {
    tag: "Decision", tagColor: "amber",
    q: "After TME specimen inspection, the mesorectal surface has a 7mm defect with visible mesorectal fat but intact fascia propria. How do you grade this (Quirke) and what is the clinical implication?",
    opts: ["Grade 3 (complete) — no action needed", "Grade 2 (nearly complete) — document and discuss at multidisciplinary tumor board", "Grade 1 (incomplete) — mandates immediate re-resection", "Grade 2 (nearly complete) — mandates adjuvant chemotherapy"],
    ans: 1,
    exp: "A defect >5mm but with intact fascia propria is Quirke Grade 2 — nearly complete. Grade 3 (complete) has a smooth intact surface with no defects. Grade 1 (incomplete) exposes the muscularis propria. Grade 2 is documented and discussed at tumor board — associated with higher local recurrence rates than Grade 3."
  },
  {
    tag: "Decision", tagColor: "amber",
    q: "You have completed a robotic LAR with TME for a cT3N1 low rectal cancer (anastomosis at 4 cm from AV) following long-course chemoradiation. Donuts are complete, leak test is negative. What is the correct diversion decision?",
    opts: ["Negative leak test means diversion is not indicated", "Anastomosis <6 cm from AV + post-neoadjuvant radiation — both are present; form a diverting loop ileostomy", "Only divert if there is a positive leak test or technical concern", "Diversion is only indicated in robotic cases, not laparoscopic"],
    ans: 1,
    exp: "Anastomosis below 6 cm from the AV and post-neoadjuvant chemoradiation are each independent indications for diverting loop ileostomy — together they represent the highest-risk scenario. A negative leak test does not override these risk factors. The decision to divert should be made preoperatively based on anatomy and oncologic history."
  }
];

// ─── COLOR HELPERS ──────────────────────────────────────────────────────────

const colorMap = {
  blue:   { bg: "bg-blue-50",   border: "border-blue-200",   text: "text-blue-800",   badge: "bg-blue-100 text-blue-800" },
  teal:   { bg: "bg-teal-50",   border: "border-teal-200",   text: "text-teal-800",   badge: "bg-teal-100 text-teal-800" },
  purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-800", badge: "bg-purple-100 text-purple-800" },
  amber:  { bg: "bg-amber-50",  border: "border-amber-200",  text: "text-amber-800",  badge: "bg-amber-100 text-amber-800" },
  green:  { bg: "bg-green-50",  border: "border-green-200",  text: "text-green-800",  badge: "bg-green-100 text-green-800" },
  red:    { bg: "bg-red-50",    border: "border-red-200",    text: "text-red-800",    badge: "bg-red-100 text-red-800" },
};

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function NavBar({ section, setSection }) {
  const tabs = [
    { id: "steps", label: "Surgical Steps" },
    { id: "quiz",  label: "Quiz" },
    { id: "reference", label: "Reference" },
  ];
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-3 whitespace-nowrap py-3">TME Teaching</span>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setSection(t.id)}
              className={`py-3 px-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                section === t.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function StepCard({ step }) {
  const [open, setOpen] = useState(false);
  const c = colorMap[step.color];
  return (
    <div className={`rounded-xl border ${open ? c.border : "border-gray-200"} bg-white overflow-hidden transition-all`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${c.bg} ${c.text}`}>
          {step.num}
        </span>
        <span className="flex-1 text-sm font-medium text-gray-900">{step.title}</span>
        <span className={`text-gray-400 text-xs transition-transform ${open ? "rotate-180" : ""}`}>▼</span>
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-3">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Key steps</p>
            <ul className="space-y-1">
              {step.keys.map((k, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.bg} border ${c.border}`}></span>
                  {k}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
            <span className="font-semibold">Pitfall: </span>{step.pitfall}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
            <span className="font-semibold">Pearl: </span>{step.pearl}
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Video demonstrations</p>
            <div className="flex flex-wrap gap-2">
              {step.videos.map((v, i) => (
                <a
                  key={i}
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                    v.featured
                      ? "bg-blue-50 border-blue-300 text-blue-800 hover:bg-blue-100"
                      : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${v.featured ? "bg-blue-600" : "bg-red-500"}`}></span>
                  {v.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StepsSection() {
  const [mode, setMode] = useState("lap");
  const [reviewed, setReviewed] = useState(new Set());

  const steps = STEPS[mode];
  const pct = Math.round((reviewed.size / steps.length) * 100);

  return (
    <div className="space-y-4">
      {/* Featured reference */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
        <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded h-fit mt-0.5 flex-shrink-0">DCR 2022</span>
        <div className="min-w-0">
          <p className="text-sm font-medium text-blue-900 leading-snug">Step by Step: Robotic Low Anterior Resection with TME & Splenic Flexure Mobilization</p>
          <p className="text-xs text-blue-700 mt-0.5 mb-2">Herrando et al. — Champalimaud Foundation · Diseases of the Colon & Rectum, May 2022</p>
          <a
            href="https://journals.lww.com/dcrjournal/abstract/2022/05000/step_by_step__demonstration_of_robotic_low.32.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs bg-white border border-blue-300 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Open in DC&R Journal →
          </a>
        </div>
      </div>

      {/* Mode toggle */}
      <div className="flex gap-2">
        {[["lap", "Laparoscopic TME"], ["rob", "Robotic TME"]].map(([id, label]) => (
          <button
            key={id}
            onClick={() => { setMode(id); setReviewed(new Set()); }}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              mode === id
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{reviewed.size} of {steps.length} steps reviewed</span>
          <span>{pct}%</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-2">
        {steps.map((step, i) => (
          <div key={i} onClick={() => setReviewed(r => new Set([...r, i]))}>
            <StepCard step={step} />
          </div>
        ))}
      </div>
    </div>
  );
}

function QuizSection() {
  const [cur, setCur] = useState(0);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState([]);
  const [done, setDone] = useState(false);

  const q = QUIZ_QUESTIONS[cur];
  const correct = results.filter(Boolean).length;

  function pick(i) {
    if (selected !== null) return;
    const isCorrect = i === q.ans;
    setSelected(i);
    setResults(r => [...r, isCorrect]);
  }

  function next() {
    if (cur + 1 >= QUIZ_QUESTIONS.length) {
      setDone(true);
    } else {
      setCur(c => c + 1);
      setSelected(null);
    }
  }

  function restart() {
    setCur(0);
    setSelected(null);
    setResults([]);
    setDone(false);
  }

  if (done) {
    const pct = Math.round((correct / QUIZ_QUESTIONS.length) * 100);
    const byTag = {};
    QUIZ_QUESTIONS.forEach((q, i) => {
      if (!byTag[q.tag]) byTag[q.tag] = { total: 0, correct: 0, color: q.tagColor };
      byTag[q.tag].total++;
      if (results[i]) byTag[q.tag].correct++;
    });
    return (
      <div className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <div className="text-5xl font-semibold text-gray-900 mb-1">{correct}/{QUIZ_QUESTIONS.length}</div>
          <div className="text-sm text-gray-500 mb-4">
            {pct >= 80 ? "Excellent — board-ready performance" : pct >= 60 ? "Good — review the questions you missed" : "Keep reviewing — focus on your weak categories"}
          </div>
          <div className="grid grid-cols-2 gap-3 mb-5">
            {Object.entries(byTag).map(([tag, d]) => {
              const c = colorMap[d.color] || colorMap.blue;
              return (
                <div key={tag} className={`${c.bg} rounded-lg p-3 text-left`}>
                  <div className={`text-xs font-medium ${c.text} mb-1`}>{tag}</div>
                  <div className={`text-xl font-semibold ${c.text}`}>{d.correct}/{d.total}</div>
                </div>
              );
            })}
          </div>
          <button
            onClick={restart}
            className="w-full py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Retake quiz
          </button>
        </div>
      </div>
    );
  }

  const pct = Math.round((cur / QUIZ_QUESTIONS.length) * 100);
  const tc = colorMap[q.tagColor] || colorMap.blue;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${tc.badge}`}>{q.tag}</span>
        <span>Question {cur + 1} of {QUIZ_QUESTIONS.length}</span>
      </div>

      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <p className="text-sm font-medium text-gray-900 leading-relaxed mb-4">{q.q}</p>

        <div className="space-y-2">
          {q.opts.map((opt, i) => {
            let cls = "w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors ";
            if (selected === null) {
              cls += "border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300";
            } else if (i === q.ans) {
              cls += "border-green-300 bg-green-50 text-green-800";
            } else if (i === selected && selected !== q.ans) {
              cls += "border-red-300 bg-red-50 text-red-800";
            } else {
              cls += "border-gray-100 text-gray-400";
            }
            return (
              <button key={i} onClick={() => pick(i)} disabled={selected !== null} className={cls}>
                {opt}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className={`mt-3 p-3 rounded-lg text-sm ${selected === q.ans ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"}`}>
            <span className="font-semibold">{selected === q.ans ? "Correct. " : "Incorrect. "}</span>
            {q.exp}
          </div>
        )}
      </div>

      {selected !== null && (
        <button
          onClick={next}
          className="w-full py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          {cur + 1 < QUIZ_QUESTIONS.length ? "Next question →" : "See results →"}
        </button>
      )}

      <div className="flex gap-2 text-xs">
        <span className="bg-green-50 border border-green-200 text-green-700 px-2 py-1 rounded-full">{results.filter(Boolean).length} correct</span>
        <span className="bg-red-50 border border-red-200 text-red-700 px-2 py-1 rounded-full">{results.filter(v => !v).length} incorrect</span>
      </div>
    </div>
  );
}

function ReferenceSection() {
  const items = [
    {
      title: "ROLARR Trial (Jayne et al., JAMA 2017)",
      desc: "Primary RCT comparing robotic vs laparoscopic rectal resection. Primary endpoint (conversion rate) not met. No significant difference in oncologic outcomes.",
      url: "https://jamanetwork.com/journals/jama/fullarticle/2658306",
      tag: "RCT"
    },
    {
      title: "Herrando et al., DC&R 2022",
      desc: "Step-by-step video demonstration of robotic LAR with TME and splenic flexure mobilization. Champalimaud Foundation, Lisbon.",
      url: "https://journals.lww.com/dcrjournal/abstract/2022/05000/step_by_step__demonstration_of_robotic_low.32.aspx",
      tag: "Video"
    },
    {
      title: "Quirke Grading System",
      desc: "Grade 3 (complete): intact mesorectum, smooth surface, no defects >5mm. Grade 2 (nearly complete): defect >5mm, fat visible, fascia intact. Grade 1 (incomplete): muscularis propria exposed.",
      url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1971183/",
      tag: "Reference"
    },
    {
      title: "ACPGBI Guidelines — Rectal Cancer",
      desc: "Association of Coloproctology of Great Britain & Ireland guidelines on management of rectal cancer including TME principles.",
      url: "https://www.acpgbi.org.uk/resources/publications/",
      tag: "Guideline"
    },
    {
      title: "WebSurg — TME Video Library",
      desc: "Free access surgical video library with multiple laparoscopic and robotic TME demonstrations from international centers.",
      url: "https://www.websurg.com",
      tag: "Video"
    }
  ];

  const tagColors = { RCT: "bg-purple-100 text-purple-800", Video: "bg-red-100 text-red-800", Reference: "bg-blue-100 text-blue-800", Guideline: "bg-green-100 text-green-800" };

  const quirke = [
    { grade: "Grade 3", label: "Complete", color: "green", desc: "Intact mesorectum with smooth surface. Only minor irregularities. No defects greater than 5mm. No coning toward the distal margin." },
    { grade: "Grade 2", label: "Nearly complete", color: "amber", desc: "Moderate bulk to the mesorectum, but irregularities present. No surface defect greater than 5mm. No areas of visibility of muscularis propria except at the site of insertion of levator ani." },
    { grade: "Grade 1", label: "Incomplete", color: "red", desc: "Little bulk to mesorectum with defects down onto muscularis propria. Very irregular circumferential resection margin." },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Quirke TME Grading</h2>
        <div className="space-y-2">
          {quirke.map((g, i) => {
            const c = colorMap[g.color];
            return (
              <div key={i} className={`${c.bg} border ${c.border} rounded-xl p-4`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-sm font-semibold ${c.text}`}>{g.grade}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${c.badge}`}>{g.label}</span>
                </div>
                <p className={`text-sm ${c.text}`}>{g.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Key references & videos</h2>
        <div className="space-y-2">
          {items.map((item, i) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-start gap-2 mb-1">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${tagColors[item.tag]}`}>{item.tag}</span>
              </div>
              <p className="text-sm font-medium text-gray-900 mb-0.5">{item.title}</p>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── APP ────────────────────────────────────────────────────────────────────

export default function App() {
  const [section, setSection] = useState("steps");

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar section={section} setSection={setSection} />
      <div className="max-w-3xl mx-auto px-4 py-6">
        {section === "steps" && <StepsSection />}
        {section === "quiz" && <QuizSection />}
        {section === "reference" && <ReferenceSection />}
      </div>
    </div>
  );
}
