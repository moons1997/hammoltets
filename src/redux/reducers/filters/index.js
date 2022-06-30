const filtersReducer = (
  state = {
    limit: 5,
    offset: 0,
    name: "",
    category: "",
    page: 1,
  },
  action
) => {
  switch (action.type) {
    case "CHANGE_LIMIT":
      return { ...state, limit: action.payload };
    case "CHANGE_OFFSET":
      return { ...state, offset: action.payload };
    case "CHANGE_PAGE":
      return { ...state, page: action.payload };
    case "CHANGE_NAME":
      return { ...state, name: action.payload };
    case "CHANGE_CATEGORY":
      return { ...state, category: action.payload };
    case "CHANGE_All":
      return action.payload;
    default:
      return state;
  }
};
export default filtersReducer;
