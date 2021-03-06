import { useMemo } from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import courseReducer from './course/reducers'
import { CourseActionTypes } from './course/types'
import userReducer from './user/reducer'
import { UserActionTypes } from './user/types'

let store: any

const appReducer = combineReducers({
  course: courseReducer,
  user: userReducer,
})
export type RootState = ReturnType<typeof appReducer>
export type StoreEvent = CourseActionTypes | UserActionTypes

const initStore = (preloadedState: RootState | undefined) => {
  return createStore(
    appReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk))
  )
}

export const initializeStore = (preloadedState: any) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
