import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { startGetAllParkingSpace } from '../../actions/adminsActions'
export default function OwnerDetail() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(startGetAllParkingSpace())
  }, [])
  const parkingSpaces = useSelector((state) => {
    return state.admin.ownersAllParkings
  })
  const owners = useSelector((state) => {
    return state.admin.allOwners
  })
  const totalSpace = (id) => {
    return parkingSpaces.reduce((acc, cv) => {
      if (cv.ownerId._id == id) {
        acc = acc + 1
        return acc
      }
    }, 0)
  }
  const searchResult=()=>{
    return owners
  }
  return (
    <Container style={{ paddingTop: '80px' }}>
      <div className="d-flex justify-content-end mt-4 mr-4 mb-4" >
        <button type="button" className="btn btn-primary">
          Notifications <span className="badge text-bg-secondary">4</span>
        </button>
      </div>
      <Table className=" text-center" bordered>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Name</th>
            <th>phone</th>
            <th>total Space Own</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {owners?.map((ele, i) => {
            return <tr>
              <td>{i}</td>
              <td>{ele.name}</td>
              <td>{ele.phone}</td>
              <td>{totalSpace(ele._id)}</td>
              <td>
                <Button variant='info'>More</Button>
                <Button className='ml-2' variant={ele.activeStatus ? 'success' : 'danger'}>{ele.activeStatus ? "active" : "disable"}</Button>
              </td>
            </tr>
          })}
        </tbody>
      </Table>
      <nav aria-label="Page navigation example ">
  <ul class="pagination d-flex justify-content-end">
    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav>
    </Container>
  )
}