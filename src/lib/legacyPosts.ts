// Legacy blog posts pulled from buckeyepsych.wordpress.com
// (the source-view PDFs in /reference). Used by the
// "Import legacy posts" button on /admin/blog. Idempotent — the action
// skips any slug that already exists, so re-importing is safe.

export type LegacyPost = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  publishedAt: string; // ISO date
  content: string; // markdown
};

export const LEGACY_POSTS: LegacyPost[] = [
  {
    slug: "add-adhd-medications-lower-likelihood-of-crime",
    title: "Use Of ADD/ADHD Medications Lower Likelihood Of Crime",
    publishedAt: "2012-11-28",
    tags: ["ADHD", "ADD", "Crime"],
    excerpt:
      "A New England Journal of Medicine study finds patients on ADHD medication had a 32% lower criminality rate in men and 41% lower in women compared with non-medication periods.",
    content: `According to a [study](http://tinyurl.com/adhd-crime) published November 22nd in the *New England Journal of Medicine* by Paul Lichtenstein, Ph.D et al, "The use of medication to treat attention-deficit/hyperactivity disorder [AD/HD] is linked to a lower likelihood of crime."

"Using Swedish national registers, researchers studied about 16,000 men and 10,000 women ages 15 and older who had been diagnosed with AD/HD." Next, "court and prison records were used to track convictions from 2006 through 2009 and see whether patients were taking AD/HD drugs when their crimes were committed."

The results showed that as compared with nonmedication periods, among patients receiving ADHD medication, there was a significant reduction of **32% in the criminality rate for men** and **41% for women**.`,
  },
  {
    slug: "naltrexone-acamprosate-alcoholism",
    title: "New Study Shows Naltrexone, Acamprosate Helpful In Treating Alcoholism",
    publishedAt: "2012-10-29",
    tags: ["Alcoholism", "Naltrexone", "Acamprosate"],
    excerpt:
      "A meta-analysis of 64 studies in the journal Addiction concludes that naltrexone (Revia) and acamprosate (Campral) may be effective initial treatments for alcoholism.",
    content: `[Reuters](http://www.reuters.com/article/2012/10/26/us-meds-alcohol-idUSBRE89P0PX20121026) (10/26, Pittman) reports that according to a meta-analysis of 64 studies published in the journal *Addiction*, the medications **naltrexone (Revia)** and **acamprosate (Campral)** may be good initial treatments of alcoholism.

Both acamprosate and naltrexone tended to work better when patients had abstained from alcohol for at least a few days before starting the medications, or had been through a detox program.

Acamprosate is known to calm brain activity, so it can stabilize a brain that gets agitated when an alcoholic stops drinking. Naltrexone works on the brain's reward and reinforcement system, so if people were to drink while on the drug, it would block some of the positive feelings produced by alcohol and keep them from overdoing it.`,
  },
  {
    slug: "ketamine-may-relieve-depression",
    title: "Ketamine May Relieve Depression By Restoring Brain Cell Connections",
    publishedAt: "2012-10-10",
    tags: ["Depression", "Antidepressants", "Ketamine"],
    excerpt:
      "Researchers at Yale describe how ketamine appears to relieve major depression in hours rather than weeks by rapidly restoring brain-cell connections damaged by stress.",
    content: `The [NPR](http://www.npr.org/blogs/health/2012/10/04/162299564/ketamine-relieves-depression-by-restoring-brain-connections) (10/5, Hamilton) "Shots" blog reports that "scientists say they have figured out how an experimental drug called ketamine is able to relieve major depression in hours instead of weeks."

Ketamine is an FDA-approved anesthetic. It's also a popular club drug that can produce out-of-body experiences and hallucinations. Not exactly what you'd want from a depression drug.

> "It's exciting. The hope is that this new information about ketamine is really going to provide a whole array of new targets that can be developed that ultimately provide a much better way of treating depression."
>
> — Ron Duman, psychiatrist and neurobiologist at Yale University

In stressed mice, a dose of ketamine was able to "rapidly increase connections and also to rapidly reverse the deficits that are caused by stress," Duman says. Research is intended to produce drugs that will work like ketamine, but without the hallucinations. Several of these alternative drugs are already being tried in people.`,
  },
  {
    slug: "omega-3-benefits-questioned",
    title: "Omega-3 Benefits Questioned",
    publishedAt: "2012-10-04",
    tags: ["Health", "Supplements", "Omega-3"],
    excerpt:
      "Recent JAMA research suggests omega-3 fatty acids may not protect against heart attacks, strokes or deaths — but at reasonable doses there's still potential for benefit.",
    content: `According to an [article in the WSJ](http://tinyurl.com/omega3wsj), Melinda Beck states that many people are using omega-3 supplements to protect against various ailments, despite the fact that research on omega-3's benefits is mixed.

Recent research published in *JAMA* suggests that omega-3 fatty acids do not protect against heart attacks, strokes or deaths. Some medical associations, including the American Psychiatric Association, recommend regular consumption of fish rich in omega-3 for most people.

Still, according to Paul Coates, director of the Office of Dietary Supplements, "There is no single answer here." Coates adds, "Given that there is a potential for benefit, and the harm has not yet been fully explored, at reasonable levels of intake, it's not a bad idea."`,
  },
  {
    slug: "parasite-suicide-attempts",
    title: "Research Study Associates Common Parasite With Higher Risk For Suicide Attempts",
    publishedAt: "2012-09-14",
    tags: ["Depression", "Suicide", "Toxoplasmosis"],
    excerpt:
      "A Swedish cohort study published in the Journal of Clinical Psychiatry found people previously infected with T. gondii were seven times more likely to engage in non-fatal self-directed violence.",
    content: `According to a [study](http://tinyurl.com/tgondii) in the August issue of the *Journal of Clinical Psychiatry*: "A cohort study of 84 adults from Sweden showed that those who had been infected with T gondii were seven times more likely to participate in nonfatal, self-directed violence compared with their counterparts who had not been infected."

T. gondii has always been known to be dangerous, especially in pregnant women. It is the causative agent in toxoplasmosis. It is frequently contracted through eating undercooked meat or coming into contact with cat feces.`,
  },
  {
    slug: "mindfulness-can-change-the-brain",
    title: "Mindfulness Can Change the Brain",
    publishedAt: "2011-02-01",
    tags: ["Mindfulness", "Meditation"],
    excerpt:
      "An eight-week Mindfulness-Based Stress Reduction program produced measurable increases in hippocampal gray matter and decreases in amygdala density on MRI.",
    content: `[HealthDay](http://tinyurl.com/minful-change) (1/25, Preidt) reported that a mindfulness meditation training program can trigger measurable changes in brain areas associated with awareness, empathy and sense of self within eight weeks, according to a new study.

Mindfulness focuses on nonjudgmental awareness of one's feelings, sensations and state of mind, which often results in greater peacefulness and relaxation, the researchers explained. They used MRI to assess the brain structure of 16 volunteers two weeks before and after they took the eight-week Mindfulness-Based Stress Reduction program at the University of Massachusetts Center for Mindfulness. The program included weekly meetings to practice mindfulness meditation and audio recordings for guided meditation practice. The researchers also analyzed MRI scans of a control group of people who did not meditate for comparison.

The meditation group participants spent an average of 27 minutes a day doing mindfulness meditation exercises. The MRI scans taken after the eight-week program revealed:

- **Increased gray matter density in the hippocampus** (important for learning and memory)
- **Increased density in structures associated with compassion and self-awareness**
- **Decreased gray matter density in the amygdala**, which plays a role in anxiety and stress

Participant-reported reductions in stress were correlated with the amygdala changes. None of these brain structure changes were seen in the control group. The study was published in the Jan. 30 issue of the journal *Psychiatry Research: Neuroimaging*.`,
  },
  {
    slug: "low-testosterone-and-alzheimers",
    title: "Could Low Testosterone Lead to Alzheimer's?",
    publishedAt: "2010-12-26",
    tags: ["Alzheimer's", "Testosterone", "Dementia"],
    excerpt:
      "A small study of older Chinese men with mild cognitive impairment found those with low free testosterone were far more likely to progress to Alzheimer's disease over one year.",
    content: `[WebMD](http://tinyurl.com/lowt-alzheimers) (10/8, Boyles) reported that low testosterone levels in older men with memory problems may signal progression to Alzheimer's disease or increase the risk for developing age-related dementia.

In a newly published study, older Chinese men with early memory declines who did not yet have Alzheimer's were far more likely to develop Alzheimer's over a year of follow-up if they had low testosterone. The study was small, but the findings suggest low testosterone may be an independent risk factor for rapid cognitive decline in older men with early memory loss, according to Saint Louis University Medical Center professor of gerontology John Morley, MD.

All the men underwent testing to assess memory function at enrollment, and 47 were determined to have evidence of mild cognitive impairment. Over the course of the next year, 10 men received a diagnosis of Alzheimer's disease. All were in the previously identified group with early memory declines and all had low levels of free testosterone in blood samples.

While the research suggests a role for testosterone in the prevention of Alzheimer's disease, study researcher Scott Moffat, PhD, says it is too soon to recommend testosterone treatment for men at risk for cognitive decline. "It is not really clear if testosterone is protecting the men in these studies or if levels are reflective of some other factor, such as overall better health," he tells WebMD.`,
  },
  {
    slug: "no-fear",
    title: "No Fear",
    publishedAt: "2010-12-26",
    tags: ["Anxiety", "Neuroscience", "Amygdala"],
    excerpt:
      "Patient SM, who has bilateral amygdala damage from lipoid proteinosis, displays no fear response to snakes, spiders, horror films, or even a knife attack — a finding with implications for PTSD therapy.",
    content: `The [New York Times](http://tinyurl.com/fearamygdala) (12/17, Bhanoo) reports that in the 1930s researchers discovered that when a certain part of monkeys' brains was removed, the animals became fearless. Now, scientists have confirmed that a missing amygdala results in similar behavior in humans, according to a study in the journal *Current Biology*.

Patient SM, because of a rare condition called lipoid proteinosis, has holes where her amygdala would normally reside. Researchers found that she, like the monkeys, has no fear of creatures like snakes and spiders, which ordinarily alarm most people.

SM put her life at risk several times. In one instance, she walked through a park alone at night and was attacked by a man with a knife. The following day, she walked through the same park again. She was exposed to snakes and spiders at a pet store, shown clips of horror movies like *The Shining* and *The Blair Witch Project*, and taken through a haunted house in a former sanatorium. SM's fear response was nonexistent. What's more, she "relished cuddling snakes and had to be stopped from reaching for a tarantula."

Understanding how the mind of a patient like SM works could help researchers develop therapies for individuals who express excessive amounts of fear, like war veterans.`,
  },
  {
    slug: "fda-approves-latuda-from-sunovion",
    title: "FDA Approves New Schizophrenia Medication From Sunovion",
    publishedAt: "2010-11-03",
    tags: ["Schizophrenia", "Antipsychotics", "Latuda", "FDA"],
    excerpt:
      "The FDA has approved Sunovion's atypical antipsychotic Latuda for the treatment of schizophrenia in adults, based on four placebo-controlled studies.",
    content: `[The AP](http://tinyurl.com/latuda1) (10/29) reports the Food and Drug Administration approved a new drug from Sunovion Pharmaceuticals to treat adults with schizophrenia. Schizophrenia affects about 1 percent of the U.S. population, causing hallucinations, paranoia and delusions.

The FDA approved Sunovion's drug **Latuda** based on four studies that showed patients taking the drug had fewer schizophrenia symptoms than patients taking a placebo pill. Latuda is part of the atypical antipsychotics drug class, which also includes Eli Lilly & Co.'s Zyprexa, Johnson & Johnson's Risperdal and AstraZeneca's Seroquel. Those drugs were the top-selling group of prescription drugs in the U.S. last year, with combined sales of $14.6 billion.

Sunovion Pharmaceuticals Inc. is based in Fort Lee, N.J. and is the U.S. subsidiary of Japanese drugmaker Dainippon Sumitomo Pharma Co.

> "Latuda is an oral, once-daily atypical antipsychotic, offering a first-line treatment option for patients with schizophrenia and is expected to be available in the US during the first quarter of 2011."
>
> — Sunovion (Marlborough)

Sunovion recently changed its name from Sepracor, a company known for its Lunesta sleep aid. A year ago, Sepracor was acquired by Dainippon Sumitomo Pharma Co., a Japanese drug maker.`,
  },
  {
    slug: "army-blood-test-mild-brain-trauma",
    title: "Army Claims It Has Simple Blood Test To Identify Mild Brain Trauma",
    publishedAt: "2010-10-20",
    tags: ["TBI", "Concussion", "Veterans"],
    excerpt:
      "The Army says a simple blood test that detects unique proteins released from damaged brain cells can accurately diagnose mild traumatic brain injury — a potential breakthrough for unrecognized concussions.",
    content: `[USA Today](http://www.usatoday.com/yourlife/health/medical/2010-10-15-1Abrain15_ST_N.htm) (10/15, Zoroya) reports the Army says it has discovered a simple blood test that can diagnose mild traumatic brain damage or concussion.

> "This is huge."
>
> — Gen. Peter Chiarelli, Army vice chief of staff

Army Col. Dallas Hack, who has oversight of the research, says recent data show the blood test, which looks for unique proteins that spill into the bloodstream from damaged brain cells, accurately diagnosing mild traumatic brain injury in 34 patients.

Doctors can miss these injuries because the damage does not show up on imaging scans, and symptoms such as headaches or dizziness are ignored or downplayed by the victims. If the brain is not allowed time to recover and a second concussion occurs, permanent damage may result.

Brain injuries afflict 1.4 million Americans each year, says the National Brain Injury Association. Seventy percent are mild cases. About 300,000 troops in Iraq and Afghanistan have suffered concussions, mostly from roadside bombs, according to a RAND Corp. study. Hack says the new findings could rival the discovery of unique proteins in the 1970s that now help doctors identify heart disease.`,
  },
];
