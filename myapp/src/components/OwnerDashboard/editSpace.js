import React, { useEffect,useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
const validationSpaceRegisterSchema = yup.object({
    title: yup.string().required('Title is required'),
    propertyType: yup.string().required('Property type is required'),
    amenities: yup.string( 'Select at least one amenity'),
    street: yup.string().required('Street is required'),
    area: yup.string().required('Area is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    description: yup.string().required('Description is required'),
    spaceTypes: yup.array().of(
      yup.object({
        capacity: yup.number().required('Capacity is required').min(1, 'Minimum capacity is 1').max(50, 'Maximum capacity is 50'),
        amount: yup.number().required('Amount per hour is required').max(100, 'Maximum amount is 100')
      })
    ).min(1, 'At least one space type must be filled')
  });
export default function EditSpace(props){
  const {editId,toggle}=props
  const dispatch=useDispatch()
  const parkingSpace = useSelector((state) => {
    return state.owners.parkingSpace.find(ele => ele._id == editId)
})
    const formik = useFormik({
        initialValues: parkingSpace ? ( {
          title: parkingSpace.title,
          propertyType: parkingSpace.propertyType,
          amenities:parkingSpace.amenities,
          street: parkingSpace.address.street,
          area: parkingSpace.address.area,
          city: parkingSpace.address.city,
          state: parkingSpace.address.state,
          description: parkingSpace.description,
          spaceTypes: [
            {
              Type: parkingSpace.spaceTypes[0].types,
              capacity: parkingSpace.spaceTypes[0].capacity,
              amount:  parkingSpace.spaceTypes[0].amount
            },
            {
              Type: parkingSpace.spaceTypes[1].types,
              capacity:parkingSpace.spaceTypes[1].capacity,
              amount: parkingSpace.spaceTypes[1].amount
            }
          ]
        }):(
          {
            title: '',
            propertyType: '',
            amenities:'',
            street: '',
            area: '',
            city: '',
            state: '',
            description: '',
            spaceTypes: [
              {
                Type: "Two Wheeler",
                capacity:'',
                amount: ''
              },
              {
                Type: "Four Wheeler",
                capacity: '',
                amount: ''
              }
            ]
          }
        ),
        validationSchema: validationSpaceRegisterSchema,
        onSubmit: async(values,{resetForm}) => {
              const formData={
                title:values.title,
          propertyType:values.propertyType,
          amenities: values.amenities,
         address:{ 
          street:values.street,
          area: values.area,
          city:values.city,
          state:values.state ,
    
         },
          description: values.description,
          spaceTypes: formik.values.spaceTypes.map((spaceType) => ({
            types: spaceType.Type,
            capacity: Number(spaceType.capacity),
            amount: Number(spaceType.amount)
          }))
              }
              console.log("formData",formData)
              try{
                const response=await axios.put(`http://localhost:3045/api/parkingSpace/update/${editId}`,formData,{
                  headers:{'Authorization':localStorage.getItem('token'),
                  'Content-Type': 'multipart/form-data'
                }
                })
                console.log("sfsf",response.data)
                toggle()
              }catch(err){
                console.log(err)
              }
        }
      });
    
      const handleSpaceTypeChange = (index, fieldName, value) => {
        formik.setFieldValue(`spaceTypes[${index}].${fieldName}`, value);
      };
    return (
        <>
         <Container>
      <h2>Parking Space Registration</h2>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => formik.setFieldError('title', '')}
            isInvalid={formik.touched.title && formik.errors.title}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.title}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="propertyType">
          <Form.Label>Property Type</Form.Label>
          <Form.Control
            as="select"
            name="propertyType"
            value={formik.values.propertyType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => formik.setFieldError('propertyType', '')}
            isInvalid={formik.touched.propertyType && formik.errors.propertyType}
          >
            
            <option value="independence_house">independence_house</option>
            <option value="gated_apartment"> gated_apartment</option>
            {/* Add options for property types */}
          </Form.Control>
          <Form.Control.Feedback type="invalid">{formik.errors.propertyType}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="amenities">
          <Form.Label>Amenities</Form.Label>
          <Form.Control
            as="select"
            name="amenities"
            value={formik.values.amenities}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => formik.setFieldError('amenities', '')}
            isInvalid={formik.touched.amenities && formik.errors.amenities}
          >
            <option value="covered">covered</option>
            <option value="opendoor">opendoor</option>
            
          
          </Form.Control>
          <Form.Control.Feedback type="invalid">{formik.errors.amenities}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="spaceType">
          <Form.Label>Space Types</Form.Label>
          {formik.values.spaceTypes.map((space, index) => (
            <Row key={index}>
              <Col>
                <Form.Group controlId={`${space.Type}_capacity`}>
                  <Form.Label>{space.Type}</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Capacity"
                    name="capacity"
                    value={space.capacity}
                    onChange={(e) => handleSpaceTypeChange(index, 'capacity', e.target.value)}
                    onBlur={formik.handleBlur}
                    onFocus={() => formik.setFieldError(`spaceTypes[${index}].capacity`, '')}
                    isInvalid={formik.touched.spaceTypes && formik.errors.spaceTypes && formik.errors.spaceTypes[index] && formik.errors.spaceTypes[index].capacity}
                  />
                  <Form.Control.Feedback type="invalid">{formik.errors.spaceTypes && formik.errors.spaceTypes[index] && formik.errors.spaceTypes[index].capacity}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId={`${space.Type}_amount`}>
                  <Form.Label>Amount per Hour</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Amount per Hour"
                    name="amount"
                    value={space.amount}
                    onChange={(e) => handleSpaceTypeChange(index, 'amount', e.target.value)}
                    onBlur={formik.handleBlur}
                    onFocus={() => formik.setFieldError(`spaceTypes[${index}].amount`, '')}
                    isInvalid={formik.touched.spaceTypes && formik.errors.spaceTypes && formik.errors.spaceTypes[index] && formik.errors.spaceTypes[index].amount}
                  />
                  <Form.Control.Feedback type="invalid">{formik.errors.spaceTypes && formik.errors.spaceTypes[index] && formik.errors.spaceTypes[index].amount}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          ))}
          {/* {formik.errors.spaceTypes && formik.touched.spaceTypes && <div className="invalid-feedback d-block">{formik.errors.spaceTypes}</div>} */}
        </Form.Group>
        <h3>Address</h3>
        <Form.Group controlId="street">
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Street"
            name="street"
            value={formik.values.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => formik.setFieldError('street', '')}
            isInvalid={formik.touched.street && formik.errors.street}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.street}</Form.Control.Feedback>
        </Form.Group>
        <Row>
          <Col>
            <Form.Group controlId="area">
              <Form.Label>Area</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Area"
                name="area"
                value={formik.values.area}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onFocus={() => formik.setFieldError('area', '')}
                isInvalid={formik.touched.area && formik.errors.area}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.area}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onFocus={() => formik.setFieldError('city', '')}
                isInvalid={formik.touched.city && formik.errors.city}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.city}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter State"
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onFocus={() => formik.setFieldError('state', '')}
                isInvalid={formik.touched.state && formik.errors.state}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.state}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={() => formik.setFieldError('description', '')}
            isInvalid={formik.touched.description && formik.errors.description}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.description}</Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>{' '}
        <Button variant="danger" type="reset">
          Reset
        </Button>
      </Form>
    </Container>
        </>
    )
}