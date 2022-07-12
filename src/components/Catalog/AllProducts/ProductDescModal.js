import React from 'react'
import { Modal} from "react-bootstrap";

const ProductDescModal = ({show,item,handleClose}) => {
  return (
    <React.Fragment> 
        <Modal className='remove-border' show={show} onHide={handleClose} centered>
    <Modal.Header className=" bg-light text-dark remove-border" closeButton>
        <Modal.Title >{item.product_name}</Modal.Title>
    </Modal.Header>
    {console.log(item)}
    <Modal.Body className=" bg-light text-light remove-border">
        <table className="table table-borderless indi-table mb-0">
            <tbody>
                <tr>
                    <th scope="row">Product List Id</th>
                    <td>{item.product_list_id}</td>
                </tr>
                <tr>
                    <th scope="row">SKU</th>
                    <td>{item.sku}</td>
                </tr>

                <tr>
                    <th scope="row">Price</th>
                    <td>{item.price}</td>
                   
                </tr>
                <tr>
                <th scope="row">Prepare time</th>
                    <td>{item.prepare_time}</td>
                </tr>

                <tr>
                    <th scope="row">Product Type</th>
                    <td>{item.product_type}</td>
                </tr>
                <tr>
                    <th scope="row">Food Type</th>
                    <td>{item.food_type}</td>
                </tr>
                
            </tbody>
            
        </table>
       <figure className='mt-1'>
        <img src={item.card_img} style={{width:"80%", height:"30vh"}} />
       </figure>
    </Modal.Body>

</Modal>
</React.Fragment>
  )
}

export default ProductDescModal