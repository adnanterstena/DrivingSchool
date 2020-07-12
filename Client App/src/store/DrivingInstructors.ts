import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import axios from "axios";
import { getJwt } from '../getJWT';


// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface DrivingInstructorsState {
    isLoading: boolean;
    instructors: DrivingInstructor[];
}

export interface DrivingInstructor {
    id: number;
    name: string;
    surname: string;
    characteristics: string;
    postDate: Date;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.



interface ReceiveDrivingInstructorsAction {
    type: 'RECEIVE_Driving_Instructors';
    instructors: DrivingInstructor[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = ReceiveDrivingInstructorsAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestDrivingInstructors: () : AppThunkAction<KnownAction> => (dispatch, getState) => {    
               
        const jwt = getJwt();
        axios.get('https://localhost:44362/api/DrivingInstructors', {
            headers: {
            authorization: jwt
            }
        })
        .then(res => {
            dispatch({ type: 'RECEIVE_Driving_Instructors', instructors: res.data });
        });                   
    }
    
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: DrivingInstructorsState = { instructors: [], isLoading: false };

export const reducer: Reducer<DrivingInstructorsState> = (state: DrivingInstructorsState | undefined, incomingAction: Action): DrivingInstructorsState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {           
        case 'RECEIVE_Driving_Instructors':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.  
            if (action.instructors !== state.instructors) {                      
                return {
                    instructors: action.instructors,
                    isLoading: true
                };
            }
            break;
        }
        return state;
};
