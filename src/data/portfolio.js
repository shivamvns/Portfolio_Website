import resume from './resume.json';

export { resume };

export const skillItems = (category) =>
  resume.skills.find((item) => item.category === category)?.items ?? [];

export const currentRole = resume.experience[0];
export const careerDates =
  `${resume.experience.at(-1).startDate} – ${currentRole.endDate}`;
export const introduction = resume.summary.split('. ')[0] + '.';

export const educationText = resume.education
  .map(
    (item) =>
      `${item.degree}, ${item.institution} (${item.startDate}–${item.endDate}), ${item.percentage}`
  )
  .join(' • ');

export const experienceText = resume.experience
  .map(
    (item) =>
      `${item.role} at ${item.company} (${item.startDate} – ${item.endDate})`
  )
  .join(' • ');

export const skillCategories = resume.skills.map((item) => ({
  title: item.category,
  desc: item.items.join(' • '),
  tag: item.category,
  skills: item.items,
}));

export const projectsData = resume.projects.map((item, index) => ({
  title: item.name,
  category: item.title,
  description: item.highlights.join(' '),
  tags: item.technologies,
  episode: `S01 E${String(index + 1).padStart(2, '0')}`,
  url: item.url ?? item.playStoreUrl ?? null,
  playStoreUrl: item.playStoreUrl ?? null,
}));

const expertiseSources = [
  ['Test Automation', 0],
  ['API & Backend Testing', 4],
  ['AI / LLM Testing', 1],
  ['CI/CD & DevOps', 3],
];

const gradients = [
  'from-[#1f0a0c] via-[#121212] to-[#0a0a0a]',
  'from-[#1a0809] via-[#111111] to-[#090909]',
  'from-[#220a0d] via-[#131313] to-[#0a0a0a]',
  'from-[#1d090b] via-[#101010] to-[#080808]',
];

export const expertiseData = expertiseSources.map(
  ([category, highlight], index) => ({
    number: String(index + 1).padStart(2, '0'),
    title: category,
    text: currentRole.highlights[highlight],
    tag: skillItems(category).slice(0, 2).join(' / '),
    gradient: gradients[index],
  })
);