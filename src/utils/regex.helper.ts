function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export const makeNameRegex = (keyword: string) =>
  new RegExp(`^\\s*${escapeRegExp(keyword)}\\s*$`, 'i');