import { prisma } from "./db";

// Default content lifted from the existing www.buckeyepsych.com site.
// Admins can override any of these fields from the /admin/pages screen and
// the database values will take precedence.
export const DEFAULTS = {
  site: {
    name: "Buckeye Psychiatry, LLC",
    tagline: "Board-certified psychiatric care in Dublin, Ohio.",
    phone: "614.766.5205",
    email: "",
    address: "5060 Parkcenter Ave., Suite F, Dublin, OH 43017",
    hours:
      "New patient appointments typically available within 1–2 weeks. Evening and weekend appointments available.",
  },
  home: {
    heroEyebrow: "Adam Brandemihl, M.D., D.A.B.P.N.",
    heroTitle: "Compassionate, board-certified psychiatric care.",
    heroBody:
      "Buckeye Psychiatry offers psychiatric assessment, medication management, and psychotherapy for adults and late-teen adolescents. We take the time needed to understand you and build a treatment plan you can believe in.",
    servicesHeading: "A bio-psycho-social approach to your mental health.",
    servicesIntro:
      "Three tiers of care, each designed around your needs — from a comprehensive initial assessment to ongoing medication management and integrated psychotherapy.",
  },
  about: {
    heading: "About Dr. Brandemihl",
    intro:
      "Dr. Adam Brandemihl is a board-certified general psychiatrist specializing in medication management and psychotherapy for adults and late-teen adolescents. He is experienced in treating ADD/ADHD, Anxiety, Depression, Bipolar Disorder, Panic Attacks, OCD, Borderline Personality Disorder, Mood Swings, Anger Management, and Substance Abuse.",
    philosophy:
      "As a Board Certified Psychiatrist I am trained in both medication management and psychotherapy. I enjoy treating challenging illnesses and welcome those seeking second opinions. I am comfortable managing psychiatric medications alongside medical comorbidities and providing my clients the information they need to make informed decisions about their treatment.",
    education:
      "A graduate of The Ohio State University's College of Medicine, Dr. Brandemihl also completed his psychiatric residency at OSU. He remains active with Ohio State as a Clinical Assistant Professor of Psychiatry, teaching first-year medical students and resident physicians, and has served on the medical school's admissions committee. He is a diplomate of the American Board of Psychiatry and Neurology, Inc.",
    awards: [
      "2008 — Board Certification in Psychiatry and Neurology, ABMS / ABPN",
      "2007 — The Ohio State College of Nursing Award for Precepting Graduate Nursing Students",
      "2004 — Henry Nasrallah Excellence in Psychiatry Resident Award",
      "2003 — The Ohio State University Department of Psychiatry Outstanding Teacher Award",
      "2002 — Henry Nasrallah Excellence in Psychiatry Medical Student Award",
    ],
    memberships: [
      "Diplomate, American Board of Psychiatry and Neurology",
      "Member, American Psychiatric Association",
      "Member, Ohio Psychiatric Physician's Association",
      "Member, Dublin, Ohio Chamber of Commerce",
      "Clinical Assistant Professor of Psychiatry, Ohio State University Department of Psychiatry",
    ],
  },
  services: {
    heading: "Psychiatric services",
    intro:
      "Every engagement begins with a thorough assessment and continues with the level of support that fits your treatment goals.",
    items: [
      {
        title: "Psychiatric Assessment",
        body: "An approximately 45-minute appointment using a bio-psycho-social approach to establish a probable diagnosis and recommended treatment plan. Prior to the appointment, patients are encouraged to complete the Intake Form from the Forms page.",
      },
      {
        title: "Medication Management",
        body: "Approximately 15-minute appointments to evaluate how you are responding to your current medications. You and Dr. Brandemihl will decide whether to add, stop, or adjust a medication to help you achieve your mental-health goals.",
      },
      {
        title: "Medication Management & Psychotherapy",
        body: "30–60 minute all-inclusive sessions that combine medication adjustments with psychodynamic, supportive, or cognitive behavioral therapy — the complete bio-psycho-social treatment approach.",
      },
    ],
  },
  contact: {
    heading: "Get in touch",
    intro:
      "Call the office to schedule a new patient appointment. New patient slots are typically available within 1–2 weeks. Evening and weekend appointments are available.",
    directions:
      "Located at 5060 Parkcenter Ave., Suite F, Dublin, OH 43017. Ample parking is available on-site.",
    serviceArea:
      "Serving the Central Ohio area including Westerville, Delaware, Gahanna, New Albany, Lewis Center, Pickerington, Bellefontaine, Columbus, Dublin, Hilliard, Marysville, Powell, Upper Arlington, and Worthington.",
  },
};

export type SiteContent = typeof DEFAULTS;
export type ContentKey = keyof SiteContent;

function merge<T extends object>(base: T, override: unknown): T {
  if (!override || typeof override !== "object") return base;
  return { ...base, ...(override as Partial<T>) };
}

export async function getContent(): Promise<SiteContent> {
  let rows: { key: string; value: unknown }[] = [];
  try {
    rows = await prisma.setting.findMany();
  } catch (err) {
    // DB may not yet be reachable during local build — fall back to defaults.
    return DEFAULTS;
  }
  const map = new Map(rows.map((r) => [r.key, r.value]));
  return {
    site: merge(DEFAULTS.site, map.get("site")),
    home: merge(DEFAULTS.home, map.get("home")),
    about: merge(DEFAULTS.about, map.get("about")),
    services: merge(DEFAULTS.services, map.get("services")),
    contact: merge(DEFAULTS.contact, map.get("contact")),
  };
}

export async function setContent(key: ContentKey, value: unknown) {
  await prisma.setting.upsert({
    where: { key },
    create: { key, value: value as never },
    update: { value: value as never },
  });
}
