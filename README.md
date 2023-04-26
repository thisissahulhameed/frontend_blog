Redux :
    Redux is state Management  library 

Redux Api:
    createStore
        --> it holds the compelete state of the app
        --> a state contains preloadedData(initailState),reducer()

    createSlice
        --> it accepts initailState,object of reducer fuctions as parameters
        --> it generates automatically the action creator and action types form the corresponding reducer fucitons

    configureStore
        --> it is wrapper around the createStore api which accpets the reducer as parameter 

Redux hook:

    useSelector():
        --> extract data from redux store state
        --> subscribe to redux store 
    
Use of Redux Persist:
    to persist all the data even after the app is refreshed 
    it stores all the data in internal memory

Added a file(_redirects) inside public folder in order to prevent netlify broken page error 404