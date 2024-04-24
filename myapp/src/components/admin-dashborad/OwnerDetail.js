import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { startGetAllParkingSpace } from '../../actions/adminsActions'
export default function OwnerDetail(){
const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(startGetAllParkingSpace())
    },[])
    const parkingSpaces=useSelector((state)=>{
        return state.admin.ownersAllParkings
    })
    return (
    <Container style={{ paddingTop: '80px' }}>
       <Table className=" text-center"  bordered>
         <thead>
        <tr>
          <th>Sr No</th>
          <th>Name</th>
          <th>city</th>
          <th>total Space</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {parkingSpaces?.map((ele,i)=>{
            return <tr>
                <td>{i}</td>
                <td>{ele.ownerId?.name}</td>
                <td>{ele.address.city}</td>
                <td>{}</td>
                <td>
                    <Button variant='info'>More</Button>
                    <Button  className='ml-2' variant={ele.activeStatus ? 'success' : 'danger'}>{ele.activeStatus ? "active" : "disable"}</Button>
                    </td>
            </tr>
        })}
      </tbody>
       </Table>
    </Container>
    )
}