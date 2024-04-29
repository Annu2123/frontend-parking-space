import axios from "axios";
import { identity } from "lodash";
export const GET_CART = "GET_CART";
export const CREATE_SPACECART="CREATE_SPACECART"
export const REMOVE_SPACECART="REMOVE_SPACECART"
export const startGetSpaceCarts = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get("http://localhost:3045/api/spacecart/list", {
                headers: {
                    Authorization:localStorage.getItem("token"),
                },
            });
            dispatch(getSpaceCarts(response.data));
        } catch (err) {
            console.log("Error fetching space carts:", err);
        }
    };
};

export const startAddSpaceCart = (id) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `http://localhost:3045/api/spaceCarts/create/${id}`,
                {},
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
           dispatch(createSPaceCart(response.data))
        } catch (err) {
            console.log("Error creating space cart:", err);
        }
    };
};
export const startRemoveSpaceCart=(id)=>{
    return async(dispatch)=>{
        try{
            const response=await axios.delete(`http://localhost:3045/api/spacecart/delete/${id}`,{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            })
            dispatch(removeSpaceCart(response.data))
        }catch(err){
            console.log(err)
        }
    }
}

const getSpaceCarts = (data) => {
    return {
        type: GET_CART,
        payload: data,
    };
};
const createSPaceCart=(data)=>{
    return{
        type:CREATE_SPACECART,
        payload:data
    }
}
const removeSpaceCart=(data)=>{
    return{
        type:REMOVE_SPACECART,
        payload:data
    }
}
