export const changeLimit = (event) => {
  return (dispatch) => {
    dispatch({ type: "CHANGE_LIMIT", payload: event });
  };
};
export const changeOffset = (event) => {
  return (dispatch) => {
    dispatch({ type: "CHANGE_OFFSET", payload: event });
  };
};
export const changeName = (event) => {
  return (dispatch) => {
    dispatch({ type: "CHANGE_NAME", payload: event });
  };
};
export const changeCategory = (event) => {
  return (dispatch) => {
    dispatch({ type: "CHANGE_CATEGORY", payload: event });
  };
};
export const changePage = (event) => {
  return (dispatch) => {
    dispatch({ type: "CHANGE_PAGE", payload: event });
  };
};
export const changeAll = (event) => {
  return (dispatch) => {
    dispatch({ type: "CHANGE_All", payload: event });
  };
};
