export const localeContains = (str: string, substr: string) => {
  if (substr === "") return true;
  if (!substr || !str.length) return false;
  substr = "" + substr;
  if (substr.length > str.length) return false;

  const ascii = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  return ascii(str).includes(ascii(substr));
};
