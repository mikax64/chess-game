export const getRelativeHistoric = (historic, currentSquare) => {
  const historicLength = historic.length;

  if (
    historic.length > 1 &&
    historic[historicLength - 1] !== historic[historicLength - 2]
  ) {
    return currentSquare;
  }
  return "";
};
