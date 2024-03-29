import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { supabase } from './supabaseClient';

function ProductRow({ product, onDelete, onUpdate }) {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);

    async function updateProduct() {
        try {
            const { data, error } = await supabase
                .from("products")
                .update({
                    name: name,
                    description: description
                })
                .eq("id", product.id)
            
            if (error) throw error;
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    }

    async function deleteProduct() {
        try {
            const { data, error } = await supabase
                .from("products")
                .delete()
                .eq("id", product.id);

            if (error) throw error;
            onDelete();
        } catch (error) {
            alert(error.message);
        }
    }

    return (
         
         <tr className='text-center'>
          
            <td >{product.name}</td>
        
            <td >{product.description}</td>
            <td >
                {editing === false ? (
                    <>
                        <Button variant="danger" onClick={() => deleteProduct()}>
                            Borrar
                        </Button>
                        <Button variant="success" onClick={() => setEditing(true)}>
                            Editar
                        </Button>
                    </>
                ) : (
                    <>
                       <h4>Editing Product</h4>
                        <Button size="sm" onClick={() => setEditing(false)}>Go Back</Button>
                        <br></br>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            id="name"
                            defaultValue={product.name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control
                            type="text"
                            id="description"
                            defaultValue={product.description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <br></br>
                        <Button onClick={() => updateProduct()}>Update Product in Supabase DB</Button>
                    </>
                )}
            </td>
        </tr>
    );
}

export default ProductRow;
