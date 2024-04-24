import { useFormik } from "formik"
import *as yup from 'yup'//* all data
import { Container, Form, Button } from 'react-bootstrap'
import { startCreateVehicle,startUpdateVehicle } from "../../actions/customerActions/customerVehicle"
import { useDispatch,useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
const validationVehicleSchema = yup.object({//object method
    vehicleNumber: yup.string().required(" vehicleNumber is required"),
    vehicleName: yup.string().required("vehicleName is required"),
    documents:yup.string().required("documents is required"),
    vehicleType:yup.string().required("vehicle type is required")
})
export default function VehiclesRegistration(props){
    const navigate=useNavigate()
    const id=props.editId
    const vehicles=useSelector((state)=>{
        return state.customer.vehicles
    })
    const vehicle=vehicles.find((ele)=>{
        return ele._id==id
    })
    
    const dispatch=useDispatch()
    const formik=useFormik({
           initialValues:{
            vehicleNumber:vehicle?vehicle.vehicleNumber:"",
            vehicleName: vehicle ? vehicle.vehicleName : "",
            vehicleType: vehicle ? vehicle.vehicleType : "",
            documents: vehicle ? vehicle.documents : ""
        },
       validationSchema:validationVehicleSchema,
       validateOnChange: true,
       onSubmit:async(values,{resetForm})=>{
          const formData={
            vehicleNumber:values.vehicleNumber,
            vehicleName:values.vehicleName,
            vehicleType:values.vehicleType,
            documents:values.documents
          }
         if(vehicle){
           dispatch(startUpdateVehicle(id,formData,resetForm,navigate))
         }else{
            dispatch(startCreateVehicle(formData,resetForm))
         }
       }
    })
    return(
        <Container className="d-flex justify-content-center align-items-center vh-100">
        <div>
            <h2 className="text-center mb-4 mt-4">vehicleForm</h2>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group controlId="formBasicvehicleName" >
                    <Form.Label>vehicleName</Form.Label>
                    <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Enter vehicle name"
                        name="vehicleName"
                        value={formik.values.vehicleName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        onFocus={() => formik.setFieldError('vehicleName', '')}//set field error on focus
                        isInvalid={formik.touched.vehicleName && formik.errors.vehicleName}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.touched.vehicleName && formik.errors.vehicleName} {/* Display error message if the field has been touched and has an error */}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicvehicleNumber">
                    <Form.Label>vehicleNumber</Form.Label>
                    <Form.Control
                        size="lg"
                        type="text"
                        name="vehicleNumber"
                        placeholder="vehicleNumber"
                        value={formik.values.vehicleNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        onFocus={() => formik.setFieldError('vehicleNumber', '')}
                        isInvalid={formik.touched.vehicleNumber && formik.errors.vehicleNumber}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.vehicleNumber}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicvehicleDocuments">
                    <Form.Label>vehicleType</Form.Label>
                    <Form.Control
                        size="lg"
                        type="text"
                        name="vehicleType"
                        placeholder="vehicleType"
                        value={formik.values.vehicleType}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        onFocus={() => formik.setFieldError('vehicleType', '')}
                        isInvalid={formik.touched.vehicleType && formik.errors.vehicleType}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.vehicleType}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicDocuments">
                    <Form.Label>vehicleDocuments</Form.Label>
                    <Form.Control
                        size="lg"
                        type="file"
                       accept=".pdf, .doc, .docx"
                        onChange={(event) => formik.setFieldValue("documents", event.currentTarget.files[0])}
                        name="documents"
                        placeholder="vehicleDocuments"
                        onBlur={formik.handleBlur}
                        onFocus={() => formik.setFieldError('vehicleNumber', '')}
                        isInvalid={formik.touched.documents && formik.errors.documents}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.documents}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mt-3">
                    Submit
                </Button>
            </Form>
        </div>
    </Container>
    )
}