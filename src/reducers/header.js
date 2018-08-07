
export function header(state = '', action) {
    if(action.type === 'ALERT') {
        return action.msg;
    }

    return state;
}