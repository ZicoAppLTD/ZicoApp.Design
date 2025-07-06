import { useEffect, useState } from "react"
import GetLicence from "../modals/GetLicence"

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <>
            <GetLicence />
        </>
    );
}

export default ModalProvider;