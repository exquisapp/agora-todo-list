import { useState } from "react"

const useLocalStorage = <T>(key: string, initialState: T): [T, (value: T | ((val: T) => T)) => void] => {
    const [storedData, setStoredData] = useState<T>(() => {
        try {
            const data = window.localStorage.getItem(key)
            return data ? JSON.parse(data) as T : initialState
        }
        catch (error){
            console.error(`Error getting data from localStorage using key ${key}`, error)
            return initialState
        }
    })

    const setValue = (value: T | ((value: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedData): value
            setStoredData(valueToStore)
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch (error) {
            console.error('Error storing data in locastorage')
        }
    }
    
    return [storedData, setValue]
}

export {useLocalStorage}