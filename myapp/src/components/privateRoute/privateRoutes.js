import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Spinner,Col,Row } from "react-bootstrap";
export default function PrivateRoute({permmitedRoles,children}){
    
    const user=useSelector((state)=>{
        return state.users
    })
    if(!user && localStorage.getItem('token')){
        return <Container>
            <Row>
                <Col>
                <Spinner/>
                </Col>
            </Row>
        </Container>
    }
    if(!user){
        return <Navigate to="/login"/>
               
    }
    if(!permmitedRoles.includes(user?.users?.role)){
        return <div className="text-center" style={{ paddingTop: '110px' }}>
        <p className="display-4">You are not authorized</p>
    </div>
    }
return children
}