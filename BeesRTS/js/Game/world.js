function initializeWorld(canvasWidth, canvasHeight) {
  const height = 40;
  const width = 60;

  const viewLeft = 0; // all in grid coordinates
  const viewTop = 15;
  const viewHeight = 22;
  const viewWidth = 22;

  const world = {
    width,
    height,
    viewWidth,
    viewHeight,
    viewLeft,
    viewTop,
    grid: makeMatrix(width, height, () => null), // background
    entities: [], // in the foreground
    selected: [], // array of selected entities
    cellSelected: [],
  };

  return world;
}
