export const   formatDate = (dateString) => { // Formating  the date to yyyy-mm-dd
    const dateObj = new Date(dateString)
    const year = dateObj.getFullYear()
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2)
    const day = ('0' + dateObj.getDate()).slice(-2)
    const hours = ('0' + dateObj.getHours()).slice(-2)
    const minutes = ('0' + dateObj.getMinutes()).slice(-2)
    return `${year}-${month}-${day} ${hours}:${minutes}`
}

 export const calculateDuration = (startDateTime,endDateTime) => {
    // Convert start and end times to Date objects
    const startDate = new Date(`${startDateTime}`)
    const endDate = new Date(`${endDateTime}`)
    // Calculate the difference in milliseconds
    const difference = endDate - startDate
    // Convert milliseconds to hours
    const durationHours = difference / (1000 * 60 * 60)
    return durationHours
}

//  export const function getCurrentTime() {
//     const now = new Date();
//     const hour = now.getHours().toString().padStart(2, '0');
//     const minute = now.getMinutes().toString().padStart(2, '0');
//     return `${hour}:${minute}`;
// } 
