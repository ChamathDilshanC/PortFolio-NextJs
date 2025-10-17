export interface Person {
  name: string;
  role: string;
  avatar: string;
}

const people: Person[] = [
  {
    name: "Chamath Dilshan",
    role: "Software Engineer",
    avatar: "https://github.com/ChamathDilshanC.png",
  },
  {
    name: "Dan Abramov",
    role: "React Core Team",
    avatar: "https://github.com/gaearon.png",
  },
  {
    name: "Evan You",
    role: "Vue.js Creator",
    avatar: "https://github.com/yyx990803.png",
  },
  {
    name: "Guillermo Rauch",
    role: "Vercel CEO",
    avatar: "https://github.com/rauchg.png",
  },
];

export function getAllPeople(): Person[] {
  return people;
}

export function getAvatarUrl(avatar: string, size: number = 96): string {
  if (!avatar)
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=default&size=${size}`;
  if (avatar.includes("github.com")) {
    return `${avatar}?size=${size}`;
  }
  return avatar;
}
