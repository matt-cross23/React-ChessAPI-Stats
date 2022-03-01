import { createContext, useReducer } from 'react'
import wineReducer from './WineReducer'
const WineContext = createContext()
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN
export const WineProvider = ({ children }) => {
    const initialState = {
        users: [],
        loading: false,
      }
      const [state, dispatch] = useReducer
      (wineReducer, initialState)
    const searchUsers = async (text) => {
        setLoading()
        const params = new URLSearchParams({
            q: text,
        })
        const modifyParams = params.toString()
        const searchParams = modifyParams.substring(2)
        const response = await
        fetch(`${GITHUB_URL}/${searchParams}`)
        const {items} = await response.json()
        console.log(response)
       dispatch({
          type: 'GET_USERS',
          payload: items,
      })
    
    }


 // Clear  user from state
 const clearUsers = () => dispatch({type: 'CLEAR_USERS' })
    // set loading
    const setLoading = () => dispatch({type: 'SET_LOADING'})
    return <WineContext.Provider value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers,
    }}>
        {children}
    </WineContext.Provider>
}
export default WineContext