// using React useState and useEffect to check if user is active to create a ticket

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux' // to check if user is logged in or not

export const useAuthStatus = () => {
    // STATE VALUES
    const [loggedIn, setloggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)

    // Check in STATE auth for user
    const { user } = useSelector((state) => state.auth)

    // useEffect Function
    useEffect(() => {
        if (user) {
            setloggedIn(true)
        } else {
            setloggedIn(false)
        }
        setCheckingStatus(false)
    }, [user])

    return { loggedIn, checkingStatus }
}
