export type Skill = {
  id: string;
  name: string;
  description: string;
  category: string;
  createdAT: string;
  updatedAT: string;
};

export let SKILLS: Skill[] = [
  {
    id: "1",
    name: "React.js",
    description: "A JavaScript library for building user interfaces.",
    category: "Frontend",
    createdAT: "2022-01-01",
    updatedAT: "2022-01-01",
  },
  {
    id: "2",
    name: "Next.js",
    description: "A React framework for production.",
    category: "Frontend",
    createdAT: "2022-01-01",
    updatedAT: "2022-01-01",
  },
];

export async function getSkills() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 3000);
  });
  return [...SKILLS];
}

export async function addSkill(skill: Skill) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  SKILLS = [...SKILLS, skill];
  return getSkills();
}
