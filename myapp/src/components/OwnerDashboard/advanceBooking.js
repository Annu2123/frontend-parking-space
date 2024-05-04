import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
export default function BookingCalender({booking}){
    const bookingList=()=>{
        const currentDate=new Date()
        const custBooking=[]
        booking.map((ele)=>{
                 if(new Date(ele.startDateTime) > currentDate){
                    const obj={title:ele.vehicleId.vehicleName,start:new Date(ele.startDateTime)}
                    custBooking.push(obj)
                    
                 }
        })
        return custBooking
    }
    console.log(bookingList())
    // const events = [
    //     { title: 'Meeting', start: new Date() }
    //   ]
    function renderEventContent(eventInfo) {
        return (
          <>
           <div className="tooltip bs-tooltip-bottom" role="tooltip">
                <div className="arrow"></div>
                <div className="tooltip-inner">
                    <b>{eventInfo.timeText}</b>
                    <i>{eventInfo.event.title}</i>
                </div>
            </div>
          </>
        )
      }
    return (
        <>
         <h1>Demo App</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={false}
        events={bookingList()}
        eventContent={renderEventContent}
      />
        </>
    )
}
