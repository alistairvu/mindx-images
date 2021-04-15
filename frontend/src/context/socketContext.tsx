import React from "react"
import { io } from "socket.io-client"

export const socket = io()
export const SocketContext = React.createContext(null)

export const SocketProvider: React.FC = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}
