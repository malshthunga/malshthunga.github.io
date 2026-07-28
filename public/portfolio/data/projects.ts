import { Project } from "@/types/project";

// ─────────────────────────────────────────────────────────────
// HOW TO USE THIS FILE
// Every project below is a template. The 6 real projects are already
// filled in from your old site. The ones still marked [UPDATE: ...]
// are placeholders — replace the bracketed text, drop images into
// /public/assets/, and add your GitHub link.
// ─────────────────────────────────────────────────────────────

export const projects: Project[] = [
  // ── DATA ANALYTICS ──────────────────────────────────────────
  {
    id: "eeg-brain-stimulation",
    category: "analytics",
    metric: "81% accuracy",
    title: "Closed-Loop EEG Brain Stimulation Controller",
    summary:
      "Trained a model to predict neural state changes from EEG data, achieving 81% accuracy.",
    tags: ["Python", "Signal Processing", "Machine Learning"],
    problem:
      "Partnered with SAHMRI (South Australian Health and Medical Research Institute) through the University of Adelaide to prototype closed-loop brain stimulation — a system that adjusts stimulation in real time based on EEG activity, targeting the dorsolateral prefrontal cortex (DLPFC), a region tied to attention and working memory.",
    approach: [
      "Built a modular Python pipeline across 13 participant EEG datasets (GX tES EEG Physio-Behaviour Dataset)",
      "Extracted frequency-domain features (theta, alpha, beta band power) across ~619 features per segment",
      "Compressed features with PCA — chosen over Factor Analysis for clearer, more stable state clusters",
      "Trained and compared two architectures (MLP vs. LSTM) to predict neural-state transitions (Δz)",
      "Fed the trained MLP into two adaptive controllers — a PI controller and a reinforcement-learning controller",
    ],
    result: [
      "MLP predicted neural-state transitions with R² of 0.814 and RMSE of 0.104 — beating typical EEG modelling baselines (R² ≈ 0.3–0.7)",
      "Outperformed the LSTM, confirming static nonlinear mappings were enough for this dataset",
      "In simulation, stimulation intensity stabilised between 0.58–0.62 mA",
      "Mean error dropped ~50% within 100 cycles",
    ],
    images: [{ src: "/assets/closed-loop-eeg.png", alt: "Closed-loop EEG brain stimulation controller" }],
    githubUrl:
      "https://github.com/malshthunga/Closed-loop-Brain-Stimulation-Controller-Using-Machine-Learning-Sprint-2",
  },
  {
    id: "customer-segmentation",
    category: "analytics",
    metric: "Retention strategy",
    title: "Customer Segmentation & Recommendations",
    summary:
      "Data-driven Power BI dashboard highlighting key customer personas and retention strategies.",
    tags: ["Python", "scikit-learn", "Power BI"],
    problem:
      "Grad Careers needed to understand which customers were driving revenue and which were at risk of churning across its six service lines, so retention efforts could be targeted rather than blanket.",
    approach: [
      "Imported 1,000 orders into Power BI Desktop and transformed the data in Power Query",
      "Applied RFM (Recency, Frequency, Monetary) methodology to classify customers into behavioural segments",
      "Built custom DAX measures to support the segmentation logic",
      "Designed an interactive dashboard covering revenue performance, order status, and sales agent performance",
    ],
    result: [
      "Identified 5 distinct customer segments",
      "Lost customers were the largest group at 26.9%",
      "Lost + At Risk customers together made up 48.8% of the base, despite above-average spend histories — a high-value win-back opportunity",
      "Recommended a targeted Mentoring Program re-engagement campaign",
      'Flagged 387 orders still sitting at "Service Booked" for structured follow-up',
    ],
    images: [
      { src: "/assets/customer-segmentation-dashboard.png", alt: "Customer segmentation Power BI dashboard" },
      { src: "/assets/business-overview-dashboard.png", alt: "Business overview Power BI dashboard" },
    ],
    githubUrl: "https://github.com/malshthunga/Customer-Segmentation-Recommendation",
  },
  {
    id: "customer-churn",
    category: "analytics",
    metric: "27% churn rate",
    title: "Customer Churn Segmentation",
    summary: "Built a Random Forest model to predict at-risk customers and inform retention strategy.",
    tags: ["Python", "scikit-learn", "Power BI"],
    problem:
      "A telecom customer base of 6,418 customers needed a way to flag at-risk customers before they churned, so retention efforts could be targeted rather than reactive.",
    approach: [
      "Cleaned and prepared the data with SQL views (null checks, filtering, churn view creation)",
      "Built a Random Forest classification model in Python (scikit-learn) to predict churn status from customer, service and billing features",
      "Label-encoded categorical variables and trained on an 80/20 split",
      "Used feature importance to identify the strongest churn drivers",
      "Visualised customer status, churn reasons and predicted at-risk customers in an interactive Power BI dashboard",
    ],
    result: [
      "Identified a 27% churn rate across the customer base (1,732 of 6,418 customers)",
      "Competitor-related factors — better devices and better offers — were the leading cause of churn at 44% of cases",
      "Pointed to a clear retention lever: competitive device and offer bundling for at-risk customers",
    ],
    images: [
      { src: "/assets/churn-analysis-dashboard.png", alt: "Churn analysis dashboard" },
      { src: "/assets/churn-reason-dashboard.png", alt: "Churn reason breakdown dashboard" },
    ],
    githubUrl: "https://github.com/malshthunga/Customer-Churn-Segmentation",
  },
  {
    id: "sales-insights",
    category: "analytics",
    metric: "$224,638 top-line",
    title: "Sales Insights Dashboard",
    summary: "Interactive Excel dashboard summarising sales performance, product trends, and regional insights.",
    tags: ["Excel", "PivotTables", "XLOOKUP"],
    problem:
      "Grad Careers needed a clear view of sales performance, profit margin and regional trends across its service lines to guide pricing and promotion decisions.",
    approach: [
      "Cleaned and standardised the sales dataset in Excel",
      "Calculated profit and margin per service",
      "Built PivotTables and an interactive dashboard with slicers",
      "Broke performance down by service, sales agent, region and month",
    ],
    result: [
      "Mentoring Program generated the most revenue — $224,638 across 265 orders (~25% of total)",
      "Interview Prep delivered the strongest profit margin at 90%, despite lower revenue — the highest-return service to promote",
      "Surfaced a recurring March–April revenue dip",
      "Flagged a 10.3% cancellation rate worth addressing",
    ],
    images: [{ src: "/assets/sales-insight-dashboard.jpg", alt: "Sales insights Excel dashboard" }],
    githubUrl: "https://github.com/malshthunga/Sales-Insights-Dashboard",
  },
  {
    id: "bicycle-demand",
    category: "analytics",
    metric: "[UPDATE: result]",
    title: "[UPDATE: Bicycle Demand Analysis]",
    summary: "[UPDATE: short description of the analysis and what insight it produced.]",
    tags: ["[UPDATE: tool]", "[UPDATE: tool]"],
    problem: "[UPDATE: describe the real-world question this analysis answered.]",
    approach: ["[UPDATE: describe your method, data source, and tools.]"],
    result: ["[UPDATE: describe the outcome/insight and any concrete number.]"],
    images: [{ src: "/assets/placeholder.png", alt: "Add project image" }],
    githubUrl: "#",
  },
  {
    id: "flower-classification",
    category: "analytics",
    metric: "[UPDATE: result]",
    title: "[UPDATE: Flower Species Classification]",
    summary: "[UPDATE: short description of the classification model and dataset used.]",
    tags: ["Python", "scikit-learn"],
    problem: "[UPDATE: describe the classification task and dataset.]",
    approach: ["[UPDATE: describe the models compared, feature engineering, and validation method.]"],
    result: ["[UPDATE: describe model accuracy/performance and which model performed best.]"],
    images: [{ src: "/assets/placeholder.png", alt: "Add confusion matrix or classification report" }],
    githubUrl: "#",
  },

  // ── SOFTWARE ENGINEERING ────────────────────────────────────
  {
    id: "lms-internship",
    category: "software",
    metric: "[UPDATE: result]",
    title: "[UPDATE: LMS Platform — Software Engineering Internship]",
    summary: "[UPDATE: short description of the internship build and your role.]",
    tags: ["Next.js", "Node.js", "Architecture Design"],
    problem: "[UPDATE: describe what the internship/company needed and your role on the team.]",
    approach: [
      "[UPDATE: describe the tech stack, your contributions, and the architecture decisions you made or contributed to.]",
    ],
    result: ["[UPDATE: describe the outcome — e.g. features shipped, performance improvement, or what the LMS enabled.]"],
    images: [{ src: "/assets/placeholder.png", alt: "Add architecture diagram or product screenshot" }],
    githubUrl: "#",
  },
  {
    id: "springboot-api",
    category: "software",
    metric: "[UPDATE: result]",
    title: "[UPDATE: Spring Boot REST API]",
    summary: "[UPDATE: short description of what the API does and its purpose.]",
    tags: ["Java", "Spring Boot", "REST API"],
    problem: "[UPDATE: describe what the API was built to do.]",
    approach: ["[UPDATE: describe the endpoints, database, and design patterns used.]"],
    result: ["[UPDATE: describe what the API enabled or any testing/performance detail.]"],
    images: [{ src: "/assets/placeholder.png", alt: "Add API architecture or endpoint documentation" }],
    githubUrl: "#",
  },
  {
    id: "java-project",
    category: "software",
    metric: "[UPDATE: result]",
    title: "[UPDATE: Java Project Title]",
    summary: "[UPDATE: short description of the Java project.]",
    tags: ["Java", "[UPDATE: tool]"],
    problem: "[UPDATE: describe the problem this project solved.]",
    approach: ["[UPDATE: describe your method and tools.]"],
    result: ["[UPDATE: describe the outcome and impact.]"],
    images: [{ src: "/assets/placeholder.png", alt: "Add project image" }],
    githubUrl: "#",
  },

  // ── IT SUPPORT ───────────────────────────────────────────────
  {
    id: "learnworlds-lms-support",
    category: "it",
    metric: "Internship",
    title: "LearnWorlds LMS Support",
    summary: "Created technical documentation and supported onboarding of new users.",
    tags: ["Documentation", "LMS", "Support"],
    problem: "",
    approach: [],
    result: [],
    images: [],
    hasModal: false,
  },
];

export const categoryMeta = {
  analytics: {
    label: "Data Analytics",
    description: "Machine Learning models, predictive analysis, dashboards and business intelligence",
  },
  software: {
    label: "Software Engineering Projects",
    description: "Web applications, APIs, Java development and software engineering projects",
  },
  it: {
    label: "IT Support Projects",
    description: "Technical support, documentation, system administration and workplace IT projects",
  },
} as const;
