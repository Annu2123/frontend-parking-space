import { Container,Button,Col,Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
export default function SpaceInfo(props) {
    const {spaceId, list,handleApprove } = props
    console.log(list)
    const handleCLick=(id)=>{
        handleApprove(id)
    }
    const space=()=>{
        return list.filter((ele)=>{
            if(ele._id == spaceId){
                return ele
            }
        })
    }
    const handleReject=(id)=>{
       
    }
    return (
        <>
            {space()?.map((ele) => {
                return <Card style={{ width: '18rem', border: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="card w-100" >
                    <Card.Body className="d-flex flex-column align-items-center">
                        <Card.Title>{ele.title}</Card.Title>
                        <Card.Text>
                           <h6>Owner Name :{ele.ownerId.name}</h6>
                           <h6>Location :{ele.address.area}</h6>
                           <h6>propertyType:{ele.propertyType}</h6>
                           <h6>amenities :{ele.amenities}</h6> 
                           <h6>two-wheeler:{ele.spaceTypes[0].capacity}</h6>
                           <h6>four-wheeler:{ele.spaceTypes[1].capacity}</h6>                                                 
                        </Card.Text>
                        <Container>
                            <Row>
                                <Col>
                                <Card.Link ><Button  onClick={()=>{handleCLick(ele._id)}}> accept</Button></Card.Link>
                                </Col>
                                <Col>
                                {/* <Card.Link ><Button onClick={()=>{handleReject(ele._id)}}>reject</Button></Card.Link> */}
                                </Col>
                            </Row>
                        </Container>                                      
                    </Card.Body>
                </Card>
            })}

        </>
    )
}