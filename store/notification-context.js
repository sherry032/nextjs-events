import React, {useState, useEffect} from "react";

const NotificationContext = React.createContext({
    showNotification: (notificationData)=>{},
    hideNotification: ()=>{},
    notification: null,
})

export default NotificationContext

export const NotificationContextProvider = (props)=>{
    const [activeNotification, setActiveNotification] = useState()
    useEffect(()=>{
    if(!activeNotification || activeNotification.status === "error" || activeNotification.status === "success"){
    const timer= setTimeout(()=>{
                    setActiveNotification(null)
                }, 3000)
                return ()=>{
                    clearTimeout(timer)
                }
            }
   
    },[activeNotification])
    const hideNotificationHandler=()=>{
        setActiveNotification(null)
    }
    const showNotificationHandler=(notificationData)=>{
        setActiveNotification(notificationData)
        
    }
    const notificationValue= {
    showNotification: showNotificationHandler,
    notification: activeNotification,
    hideNotification: hideNotificationHandler,
    }
    return <NotificationContext.Provider value={notificationValue}>{props.children}</NotificationContext.Provider>
}