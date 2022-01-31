const sanitizeString = (s) =>
  s
    ? s
        .toLowerCase()
        .replace(/\//g, " ")
        .replace(/:/g, " ")
        .replace(/-/g, " ")
        .replace(/\?/g, "")
        .replace(/\./g, "")
        .replace(/\s\s+/g, " ")
        .replace(/^\s/gu, "")
        .replace(/\s/gu, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim() ?? ""
    : "";

module.exports = sanitizeString;
