export function processSkills(rawSkills: any[]): string[] {
  if (!Array.isArray(rawSkills)) return [];

  return rawSkills
    .map((skill) => {
      if (typeof skill === "string") {
        return skill;
      }

      if (skill?.skill?.name) {
        return skill.skill.name;
      }

      if (skill?.skill && typeof skill.skill === "string") {
        return skill.skill;
      }

      if (skill?.name) {
        return skill.name;
      }

      return null;
    })
    .filter((s): s is string => s !== null);
}
