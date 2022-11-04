 

export const initialState = {
    site:'xyz.com',
    name:'Test'
}

export const reducer = (state,action)=>{ 
    switch(action.type){
        case 'UPDATE_NAME':
            return {...state,name:action.payload}

        default :
            return state    
    }

}