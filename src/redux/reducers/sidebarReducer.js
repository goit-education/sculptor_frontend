/*eslint-disable*/
function showSidebar(state = false, action) {
  switch (action.type) {
    case 'SHOW_SIDEBAR':
      return !state;
    case 'HIDE_SIDEBAR_BACKDROP':
      return false;
    default:
      return state;
  }
}

export default showSidebar;
