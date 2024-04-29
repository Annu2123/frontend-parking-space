import { useSelector } from "react-redux"
export default function Customers(){
    const customers = useSelector((state) => {
        return state.admin.allCustomer
    })
    return (
        <>
         <Container style={{ paddingTop: '80px' }}>
       <Table className=" text-center"  bordered>
         <thead>
        <tr>
          <th>Sr No</th>
          <th>Name</th>
          <th>email</th>
          <th>number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {customers?.map((ele,i)=>{
            return <tr>
                <td>{i}</td>
                <td>{ele.name}</td>
                <td>{ele.email}</td>
                <td>{}</td>
                <td>
                    <Button variant='info'>More</Button>
                    <Button  className='ml-2'> </Button>
                    </td>
            </tr>
        })}
      </tbody>
       </Table>
    </Container>
        </>
    )
}