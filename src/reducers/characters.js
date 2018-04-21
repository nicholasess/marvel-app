export default (state = [], action) => {
  switch (action.type) {
    case "SET_CHAR":
      return state.concat([action.char]);
    case "EXIST_CHAR":
      return state.filter(item => item.id === action.id);
    case "GET_CHAR":
      return state.filter(item => item.id === action.id)[0];
    default:
      return state;
  }
};
