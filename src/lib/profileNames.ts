export type NameParts = {
  first_name: string;
  middle_name: string;
  last_name: string;
};

export function parseFullName(fullName: string): NameParts {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { first_name: "", middle_name: "", last_name: "" };
  if (parts.length === 1) return { first_name: parts[0], middle_name: "", last_name: "" };
  if (parts.length === 2) return { first_name: parts[0], middle_name: "", last_name: parts[1] };
  return {
    first_name: parts[0],
    middle_name: parts.slice(1, -1).join(" "),
    last_name: parts[parts.length - 1],
  };
}

export function composeFullName(parts: NameParts): string {
  return [parts.first_name, parts.middle_name, parts.last_name]
    .map((p) => p.trim())
    .filter(Boolean)
    .join(" ");
}

export function displayFullName(
  user: { full_name?: string; first_name?: string; middle_name?: string; last_name?: string } | null
): string {
  if (!user) return "";
  const composed = composeFullName({
    first_name: user.first_name ?? "",
    middle_name: user.middle_name ?? "",
    last_name: user.last_name ?? "",
  });
  return composed || user.full_name || "";
}
