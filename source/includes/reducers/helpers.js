const merge = (oldState, newState) => Object.assign({}, oldState, newState);
const noopValidate = (input) => (input);

export const MakeMerge = (validate = noopValidate) => (oldState, newState) => {
	return validate(merge(oldState, newState))
}
