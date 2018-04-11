const invariant = function(condition, errorMessage) {
  if (!condition) {
    throw new Error(errorMessage);
  }
}
