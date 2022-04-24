export default function validateURL(_string) {
  let checkURL = "";

  try {
    checkURL = new URL(_string);
  } catch (err) {
    return false;
  }

  return checkURL.protocol === "https:" || checkURL.protocol === "http:";
}
