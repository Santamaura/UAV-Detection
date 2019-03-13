import { TOGGLE_DETECTED, ADD_DETECTED, REMOVE_DETECTED } from './actions';

const initialState = {
    showDetections: ''
}

const toggleDetected = (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_DETECTED:
            return {...state, showDetections: state.showDetections.map(detected =>
                detected.freq === action.data ? {...detected, isVisible: !detected.isVisible} : detected)}
        case ADD_DETECTED:
            return {...state, showDetections: [...state.showDetections, action.data]}
        case REMOVE_DETECTED:
            let index = state.showDetections.findIndex(detection => detection.freq === action.data);
            return {...state, showDetections: [
                ...state.showDetections.slice(0, index),
                ...state.showDetections.slice(index + 1)
            ]}
        default:
            return state
    }
}

export default toggleDetected