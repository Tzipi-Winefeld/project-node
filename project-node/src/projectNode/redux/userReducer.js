
import { produce } from 'immer'

const userState = {
    users: [
        { id: 1, firstName: 'Shulamit', lastName: 'cohen', email: 'shb7101@gmail.com', password: '7101' },
        { id: 2, firstName: 'Israel',lastName: 'cohen', email: 'il0504123229@gmail.com', password: '229' },
        { id: 3, firstName: 'Michal',lastName: 'cohen', email: 'mk0527660151@gmail.com', password: '0151' }
    ],
    currentUser: {_id: '', email: '', password: '',apartments:[{}] },

    manager:{firstName:'manager',email:'man@gmail.com',password:'111'}
}


const userReducer = produce((state, action) => {

    switch (action.type) {
        case 'SET_CURRENT_USER':
            state.currentUser = action.payload
            break;
        case 'ADD_USER':
            state.users = [...state.users, action.payload]
            break;
        case 'UPDATE_USER':
            //אם נרצה לגשת לאובייקט בודד - ניקח את המקום האפס
            debugger
            let user = state.users.filter(u => u.id == action.payload.index)[0]
            let i = state.users.indexOf(user)
            console.log(i);
            state.users[i] = action.payload.user

        // state.users[action.payload.index] = action.payload.user
        case 'ADD_START':
            state.start = [...state.start, action.payload]
            break;
        default:
            break;
    }

}, userState)

export default userReducer