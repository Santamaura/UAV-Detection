import { TOGGLE_DETECTED } from './actions';

const toggleDetected = (state = [], action) => {
    switch(action.type) {
        case TOGGLE_DETECTED:
            return state.map(detected =>
                detected.freq === action.freq ? {...detected, isVisible: !detected.isVisible} : detected
            )
        default:
            return state
    }
}

export default toggleDetected