import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Navv from './Navv'
import ProductCard from './ProductCard'
import { URL } from '../global'
import axios from 'axios'

/**
 * This component displays all products on the products page.
 */

const Products = () => {
    const [apiData, setApiData] = useState([])

    const getProducts = async () => {
        try {
            let data = await axios.get(`${URL}/getLatestProducts`)
            console.log(data.data)
            setApiData(data.data)
        } catch (error) {
            alert('Something went wrong')
            console.log(error)
        }
    }
    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            <Navv />
            {/* {products.map((product) => (
        <ProductCard product={product} />
      ))} */}
            {apiData && apiData.products && apiData.products.length == 0 ? (
                <div>No products yet</div>
            ) : (
                apiData.products.map((product, index) => (
                    <ProductCard
                        key={index}
                        product={product}
                        maxBid={apiData.maximumBids[index]}
                        name={apiData.names[index]}
                    />
                ))
            )}
            <Footer />
        </>
    )
}

export default Products
