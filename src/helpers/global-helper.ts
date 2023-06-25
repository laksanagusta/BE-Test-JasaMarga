const validateCoordinates = (coordinates: string): boolean => {
  const regexExp = /^((\-?|\+?)?\d+(\.\d+)?),\s*((\-?|\+?)?\d+(\.\d+)?)$/gi;
  return regexExp.test(coordinates);
};

export { validateCoordinates };
