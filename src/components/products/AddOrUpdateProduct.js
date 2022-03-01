import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, Button, Label, Input } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from '../../redux/actions/categoryActions';
import { getProducts, saveProduct } from '../../redux/actions/productActions';

export default function AddOrUpdateProduct() {
    const dispatch = useDispatch();

    const productId = parseInt(useParams().productId);

    const categories = useSelector((state) => state.listCategoriesReducer);
    const products = useSelector((state) => state.listProductsReducer);
    const [product, setProduct] = useState(getProductById(products, productId));

    const navigate = useNavigate();

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(getCategories())
        }
        if (products.length === 0) {
            dispatch(getProducts())
        }
        setProduct(getProductById(products, productId))

    }, [products.length], [categories.length])


    function handleChange(event) {
        const { name, value } = event.target;
        setProduct(previousProduct => ({
            ...previousProduct, [name]: (name === "categoryId" ? parseInt(value) : value)
        }))
    }
    function handleSave(event) {
        event.preventDefault();
        dispatch(saveProduct(product)).then(() => navigate("/"));
    }


    return (
        <div>
            {productId ? <h2 className='text-center'>UPDATE</h2> : <h2 className='text-center'>SAVE</h2>}
            <Form onSubmit={handleSave} >
                <FormGroup >
                    <Label for="Product Name">Product Name</Label>
                    <Input type="text" name="productName" value={product.productName || ""} onChange={handleChange} />
                </FormGroup>

                <FormGroup>
                    <Label for="Category">Category</Label>
                    <Input type="select" name="categoryId" onChange={handleChange} value={product.categoryId || ""}>

                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.categoryName}</option>
                        ))}
                    </Input>
                </FormGroup>

                <FormGroup >
                    <Label for="Quantity Per Unit">Quantity Per Unit</Label>
                    <Input type="text" name="quantityPerUnit" value={product.quantityPerUnit || ""} onChange={handleChange} />
                </FormGroup>

                <FormGroup >
                    <Label for="Units In Stock">Units In Stock</Label>
                    <Input type="text" name="unitsInStock" value={product.unitsInStock || ""} onChange={handleChange} />
                </FormGroup>

                <FormGroup >
                    <Label for="Unit Price">Unit Price</Label>
                    <Input type="text" name="unitPrice" value={product.unitPrice || ""} onChange={handleChange} />
                </FormGroup>

                <div className='text-center'>
                    <Button type='submit' className='btn btn-success'>Save</Button>
                </div>

            </Form>
        </div>
    )



}

export function getProductById(products, productId) {
    let product = {};
    if (productId && products.length > 0) {
        product = products.find(product => product.id === productId);
    }
    return product;
}

