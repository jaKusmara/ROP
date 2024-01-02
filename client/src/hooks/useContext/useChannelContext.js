import { ChannelContext } from "../../context/ChannelContext"
import { useContext } from "react"

export const useChannelContext = () => {
    const context = useContext(ChannelContext)

    if(!context){
        throw Error('useChannelContext must be used inside an ChannelContextProvider')
    }

    return context
}