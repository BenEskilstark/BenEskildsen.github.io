// @flow

const {VIEW_WIDTH, VIEW_HEIGHT, ZOOM_DEBOUNCE} = require('../settings');


const viewReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ZOOM': {
      const canvas = document.getElementById('canvas');
      let image = null;
      if (!state.view.image) {
        image = new Image();
        image.src = canvas.toDataURL();
      }
      const nextWidth = state.view.width + (12 * action.out);
      const nextHeight = state.view.height + (9 * action.out);
      return {
        ...state,
        view: {
          ...state.view,
          width: nextWidth,
          height: nextHeight,
          shouldRender: true,
          image: image || state.view.image,
          imgX: image == null ? state.view.imgX : state.view.x,
          imgY: image == null ? state.view.imgY : state.view.y,
          imgWidth: image != null ? nextWidth : state.view.imgWidth,
          imgHeight: image != null ? nextHeight : state.view.imgHeight,
          imgCount: ZOOM_DEBOUNCE,
        },
      };
    }
    case 'MOUSE_MOVE': {
      if (!state.view.dragging) {
        return state;
      }
      const canvas = document.getElementById('canvas');
      let image = null;
      if (!state.view.image) {
        image = new Image();
        image.src = canvas.toDataURL();
      }
      const nextX =
        state.view.x + (action.x - state.view.dragStartX) * state.view.width / VIEW_WIDTH;
      const nextY =
        state.view.y + (action.y - state.view.dragStartY) * state.view.height / VIEW_HEIGHT;;
      return {
        ...state,
        view: {
          ...state.view,
          x: nextX,
          y: nextY,
          dragStartX: action.x,
          dragStartY: action.y,
          shouldRender: true,
          image: image || state.view.image,
          imgX: image == null ? state.view.imgX : nextX,
          imgY: image == null ? state.view.imgY : nextY,
          imgWidth: image != null ? state.view.width : state.view.imgWidth,
          imgHeight: image != null ? state.view.height : state.view.imgHeight,
          imgCount: ZOOM_DEBOUNCE,
        },
      }
    }
    case 'MOUSE_DOWN':
      return {
        ...state,
        view: {
          ...state.view,
          dragging: true,
          dragStartX: action.x,
          dragStartY: action.y,
        }
      };
    case 'MOUSE_UP':
      return {
        ...state,
        view: {
          ...state.view,
          dragging: false,
        }
      };
  }
};

module.exports = {
  viewReducer,
};
