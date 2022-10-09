import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardText,
    Button,
    Row,
    Col,
    CardHeader,
    CardGroup,
    CardSubtitle,
} from 'reactstrap'
import PropTypes from 'prop-types'
import axios from 'axios'
import { URL } from '../global'

/**
 * This component displays a single product card on the products page.
 */

const ProductCard = ({ product, maxBid, name }) => {
    const [url, setUrl] = useState(`/details/${product[0]}`)
    const [image, setImage] = useState('https://picsum.photos/900/180')

    const fetchImage = async () => {
        try {
            const response = await axios.post(`${URL}/product/getImage`, {
                productID: product[0],
            })
            console.log(response)
            setImage(response.data.result[0])
        } catch (e) {
            alert(e)
        }
    }
    useEffect(() => {
        fetchImage()
    }, [])
    const myStyle = {
        boxShadow:
            'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
        width: '30%',
        padding: '50px',
        margin: '20px',
    }

    return (
        <>
            <Card style={myStyle}>
                <CardTitle tag="h3" style={{ textAlign: 'center' }}>
                    {product[1]}
                </CardTitle>
                <hr />
                <CardImg
                    className="mx-auto"
                    src={image}
                    style={{ width: '50%', textAlign: 'center' }}
                />
                {/* <img alt="Sample" src={image} /> */}
                <CardBody>
                    <CardText>Seller: {product[2]}</CardText>
                    <CardText>Minimum price: ${product[3]}</CardText>
                    <CardText>
                        Current highest bids: ${maxBid === -1 ? 'N/A' : maxBid}
                    </CardText>
                    <CardText>Current highest bidder: {name}</CardText>
                    <Button color="warning" href={url}>
                        Details
                    </Button>
                </CardBody>
            </Card>

            {/* <Card className="my-2" style={{ width: '70%' }}>
                <CardImg
                    alt="Card image cap"
                    src={image}
                    style={{
                        height: 180,
                        width: 500,
                    }}
                    width="50%"
                />
                <CardBody>
                    <CardTitle tag="h5">{product[1]}</CardTitle>
                    <CardText>Seller: {product[2]}</CardText>
                    <CardText>Minimum price: ${product[3]}</CardText>
                    <CardText>
                        Current highest bids: ${maxBid === -1 ? 'N/A' : maxBid}
                    </CardText>
                    <CardText>Current highest bidder: {name}</CardText>
                </CardBody>
            </Card> */}
        </>
    )
}

ProductCard.propTypes = {
    product: PropTypes.array.isRequired,
    maxBid: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
}

export default ProductCard
