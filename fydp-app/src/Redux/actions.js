export const TOGGLE_DETECTED = 'TOGGLE_DETECTED';
export const ADD_DETECTED = 'ADD_DETECTED';
export const REMOVE_DETECTED = 'REMOVE_DETECTED';

export const toggleDetected = data => ({
    type: TOGGLE_DETECTED,
    data
});

export const addDetected = data => ({
    type: ADD_DETECTED,
    data
});

export const removeDetected = data => ({
    type: REMOVE_DETECTED,
    data
});