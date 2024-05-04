import Table from 'react-bootstrap/Table'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { startGetAllParkingSpace } from '../../actions/adminsActions'
import OwnerInfo from './ownerInfo'
import { startGetAllOwner } from '../../actions/adminsActions'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
export default function OwnerDetail() {
  const[perPage,setPerPage]=useState(5)
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const [modal, setModal] = useState(false);
  const [ownerId, setOwnerId] = useState('')
  const toggle = () => setModal(!modal)
  const [searchQuary,setSearchQuary]=useState('')
  const[debounceQuary,setDebounceQuary]=useState('')
  
  useEffect(() => {
    dispatch(startGetAllParkingSpace())
  }, [])
  
  useEffect(()=>{
    // setTimeout(()=>{
    //   console.log("hiiii")
    //          setDebounceQuary(searchQuary)
    // },1000)
    dispatch(startGetAllOwner(currentPage))
  },[currentPage])

  const handleSearchQuary=(event)=>{
    setSearchQuary(event.target.value)
}
  
  const parkingSpaces = useSelector((state) => {
    return state.admin.ownersAllParkings
  })
  const owners = useSelector((state) => {
    return state.admin.allOwners
  })
  const totalSpace = (id) => {
    return parkingSpaces?.reduce((acc, cv) => {
      if (cv.ownerId._id == id) {
        acc = acc + 1
        return acc
      }
    }, 0)
  }
  const searchResult=()=>{
    return owners
  }
  const handleMore = (ownerId) => {
    setOwnerId(ownerId)
    toggle()
}
const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
}
console.log("all",parkingSpaces)
console.log("sqsq",totalSpace())
console.log("adfdds",debounceQuary)
  return (
   <> 
   <Container style={{ paddingTop: '80px' }}>
      <div className="d-flex justify-content-end mt-4 mr-4 mb-4" >
      <input
                type="text"
                value={searchQuary}
                className="form-control rounded-pill"
                placeholder="search for owners"                           
                style={{ width: "30%", height: "10%" }}
                onChange={handleSearchQuary}
           />
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
              <td>{i+1}</td>
              <td>{ele.name}</td>
              <td>{ele.phone}</td>
              <td>{totalSpace(ele._id)}</td>
              <td>
                <button  type="button" className='btn btn-info' onClick={()=>{handleMore(ele._id)}}>More</button>
                <button type='button' className={ele.activeStatus ? 'btn btn-success ml-2' : 'btn btn-danger ml-2'}>{ele.activeStatus ? "active" : "disable"}</button>
              </td>
            </tr>
          })}
        </tbody>
      </Table>
      <nav aria-label="Page navigation example ">
  <ul class="pagination d-flex justify-content-end">
    <li className='mr-2'>
    <select className='form-select ' onChange={(e)=>{setPerPage(e.target.value)}}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value='15'>15</option>
          <option value="20">20</option>

        </select>
    </li>
  <li className="page-item">
                    <button className="page-link" disabled={currentPage <= 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                </li>
                <li className="page-item">
                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                </li>
  </ul>
</nav>
    </Container>
    <Modal isOpen={modal} toggle={toggle}>
                <ModalBody>
                  <OwnerInfo  ownerId={ownerId} toggle={toggle} owners={owners} parkingSpaces={parkingSpaces}/>
                </ModalBody>
            </Modal>
    </>
  )
}