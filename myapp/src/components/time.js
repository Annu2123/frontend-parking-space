import React, { useState, useEffect } from 'react';


function IndianStandardTime() {
    // const booking_start=
    const date = new Date();
    const end_time = date.getHours() 
       const start_time =date.getHours()
   

  return (
    <div>
      <h1>Indian Standard Time (IST)</h1>
      <p>{start_time}</p>
      <p>{end_time}</p>
      <p>{console.log(new Date())}</p>
    </div>
  );
}

export default IndianStandardTime;
