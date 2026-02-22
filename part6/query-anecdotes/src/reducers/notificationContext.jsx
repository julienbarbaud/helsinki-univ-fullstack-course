import { useReducer, createContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type){
    case 'SHOW':{
      return action.payload;
    }
    case 'DELETE':{
      return null;
    }
    default:{
      console.log('action unknown');
      return state;
    }
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatchNotification] = useReducer(notificationReducer, null);
  return(
    <NotificationContext.Provider value={{ notification, dispatchNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext;
