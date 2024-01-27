import { StrictMode } from "react";

const getFormattedDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth()+1).padStart(2, '0');
    const day = String(today.getDay()).padStart(2, '0');

    return `${year}-${month}-${day}`
    
}

export function getCurrentTime(now: Date): string {
    //const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;

    // Format the time
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;

    return formattedTime;
}
export default getFormattedDate;