"use strict";

var initState = function initState() {
  return {
    mainMenu: true,
    editor: null,
    level: null,
    modal: null,
    dispatch: null
  };
};

module.exports = { initState: initState };