import { useSelector } from "react-redux"
export default function BookingsList(){
    const bookings=useSelector((state)=>{
        return state.customer.bookings
    })
    console.log(bookings,'bookings')
    const dateTimeOptions = {
        dateStyle: 'short',
        timeStyle: 'short',
        timeZone: 'UTC',
    };
    return(
    <div>
        
        <table class="table table-success table-striped">
            <thead>
                <tr>
                    <th>S.NO</th>
                    <th>Parking_Area</th>
                    <th>Start_Time</th>
                    <th>End_Time</th>
                    <th>Approval_Status</th>
                    <th>Space_Type</th>
                    <th>Vehicle_Name</th>
                    <th>Total_amount</th>
                    <th>payment_Status</th>
                </tr>
            </thead>
            <tbody>
                {bookings.map((ele,i)=>{
                        // Convert start and end times to Date objects
                        const startTime = new Date(ele.startDateTime);
                        const endTime = new Date(ele.endDateTime);

                        // Format the date and time
                        const formattedStartTime = new Intl.DateTimeFormat('en-GB', dateTimeOptions).format(startTime);
                        const formattedEndTime = new Intl.DateTimeFormat('en-GB', dateTimeOptions).format(endTime);
                        console.log(formattedStartTime,formattedEndTime,'timings')
                    const spaceType=ele.parkingSpaceId.spaceTypes.find((e)=>{
                        return e._id==ele.spaceTypesId
                    })
                    return(
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{ele.parkingSpaceId.title}</td>
                            <td>{formattedStartTime}</td>
                            <td>{formattedEndTime}</td>
                            <td>{ele.approveStatus?"success":"pending"}</td>
                            <td>{spaceType.types}</td>
                            <td>{ele.vehicleId.vehicleName}</td>
                            <td>{ele.amount}</td>
                            <td><button disabled={!ele.approveStatus}>pay</button></td>
                         
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    )
}