import {
  teamMembers as initialTeamMembers,
  type TeamMember,
} from "../data/teamMembers";

const STORAGE_KEY = "serviceflow-team-members";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

function readTeamMembers(): TeamMember[] {
  const savedTeamMembers = localStorage.getItem(STORAGE_KEY);

  if (savedTeamMembers) {
    try {
      const parsedTeamMembers = JSON.parse(savedTeamMembers);

      if (Array.isArray(parsedTeamMembers)) {
        return parsedTeamMembers as TeamMember[];
      }
    } catch {
      // Fall back to initial mock data
    }
  }

  return initialTeamMembers;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  await delay(600);

  return readTeamMembers();
}

export async function createTeamMember(
  member: TeamMember,
): Promise<TeamMember> {
  await delay(400);

  const currentMembers = readTeamMembers();
  const updatedMembers = [...currentMembers, member];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMembers));

  return member;
}

export async function updateTeamMember(
  updatedMember: TeamMember,
): Promise<TeamMember> {
  await delay(400);

  const currentMembers = readTeamMembers();
  const updatedMembers = currentMembers.map((member) =>
    member.id === updatedMember.id ? updatedMember : member,
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMembers));

  return updatedMember;
}

export async function deleteTeamMember(
  memberId: number,
): Promise<number> {
  await delay(400);

  const currentMembers = readTeamMembers();
  const updatedMembers = currentMembers.filter(
    (member) => member.id !== memberId,
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMembers));

  return memberId;
}
