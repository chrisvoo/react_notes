export default (state, action) => {
	switch (action.type) {
		case "SET_TECHNOLOGY":
            /* You should not mutate the state received in your Reducer. Instead, you should always
               return a new copy of the state. */
			return {
                ...state,
                tech: action.text
            }
		default:
		return state;
	}
}