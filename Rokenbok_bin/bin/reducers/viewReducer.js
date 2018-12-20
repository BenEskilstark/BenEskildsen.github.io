'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('../settings'),
    VIEW_WIDTH = _require.VIEW_WIDTH,
    VIEW_HEIGHT = _require.VIEW_HEIGHT,
    ZOOM_DEBOUNCE = _require.ZOOM_DEBOUNCE;

var viewReducer = function viewReducer(state, action) {
  switch (action.type) {
    case 'ZOOM':
      {
        var canvas = document.getElementById('canvas');
        var image = null;
        if (!state.view.image) {
          image = new Image();
          image.src = canvas.toDataURL();
        }
        var nextWidth = state.view.width + 12 * action.out;
        var nextHeight = state.view.height + 9 * action.out;
        return _extends({}, state, {
          view: _extends({}, state.view, {
            width: nextWidth,
            height: nextHeight,
            shouldRender: true,
            image: image || state.view.image,
            imgX: image == null ? state.view.imgX : state.view.x,
            imgY: image == null ? state.view.imgY : state.view.y,
            imgWidth: image != null ? nextWidth : state.view.imgWidth,
            imgHeight: image != null ? nextHeight : state.view.imgHeight,
            imgCount: ZOOM_DEBOUNCE
          })
        });
      }
    case 'MOUSE_MOVE':
      {
        if (!state.view.dragging) {
          return state;
        }
        var _canvas = document.getElementById('canvas');
        var _image = null;
        if (!state.view.image) {
          _image = new Image();
          _image.src = _canvas.toDataURL();
        }
        var nextX = state.view.x + (action.x - state.view.dragStartX) * state.view.width / VIEW_WIDTH;
        var nextY = state.view.y + (action.y - state.view.dragStartY) * state.view.height / VIEW_HEIGHT;;
        return _extends({}, state, {
          view: _extends({}, state.view, {
            x: nextX,
            y: nextY,
            dragStartX: action.x,
            dragStartY: action.y,
            shouldRender: true,
            image: _image || state.view.image,
            imgX: _image == null ? state.view.imgX : nextX,
            imgY: _image == null ? state.view.imgY : nextY,
            imgWidth: _image != null ? state.view.width : state.view.imgWidth,
            imgHeight: _image != null ? state.view.height : state.view.imgHeight,
            imgCount: ZOOM_DEBOUNCE
          })
        });
      }
    case 'MOUSE_DOWN':
      return _extends({}, state, {
        view: _extends({}, state.view, {
          dragging: true,
          dragStartX: action.x,
          dragStartY: action.y
        })
      });
    case 'MOUSE_UP':
      return _extends({}, state, {
        view: _extends({}, state.view, {
          dragging: false
        })
      });
  }
};

module.exports = {
  viewReducer: viewReducer
};