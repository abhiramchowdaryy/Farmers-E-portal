import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product }) => {
	let history = useHistory();

	const addToTrolleyHandler = () => {
		history.push(`/trolley/${product._id}?qty=1`);
	};

	return (
		<Card className='my-3 p-3 border-primary rounded'>
			<Link to={`/product/${product._id}`}>
				<Card.Img src={product.image} variant='top' />
			</Link>

			<Card.Body>
				<Link to={`/product/${product._id}`}>
					<Card.Title as='div' className='text-center'>
						<strong>{product.name}</strong>
					</Card.Title>
				</Link>

				<Card.Text as='div'>
					<Rating
						value={product.rating}
						text={`${product.numReviews} reviews`}
					/>
				</Card.Text>

				<Card.Text as='h4' className='text-center'>
					₹{product.price.toFixed(2)}
				</Card.Text>
			</Card.Body>

			<Button
				className='btn btn-sm'
				type='button'
				disabled={product.countInStock === 0}
				onClick={addToTrolleyHandler}
			>
				ADD TO <i className='fas fa-shopping-cart px-2'></i>
			</Button>
		</Card>
	);
};

export default Product;
