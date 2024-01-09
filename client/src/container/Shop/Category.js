import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Product from '../../components/Product';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import banner from '../../assets/fm-banner.png';
import { listCategoryProducts } from '../../redux/actions/productActions';

const Category = () => {
	const { keyword } = useParams();
	const dispatch = useDispatch();

	const productCategoryList = useSelector((state) => state.productCategoryList);
	const { loading, error, products } = productCategoryList;

	useEffect(() => {
		dispatch(listCategoryProducts(keyword));
	}, [dispatch, keyword]);

	return (
		<div className='home'>
			<Container fluid>
				<Image className='banner' src={banner} fluid />
			</Container>
			<Nav className='nav-tab mt-4 mb-3'>
				<Nav.Item>
					<LinkContainer to='/' exact>
						<Nav.Link className='navtab bg-light' data-toggle='tab'>
							<h2>All Products</h2>
						</Nav.Link>
					</LinkContainer>
				</Nav.Item>

				<Nav.Item>
					<LinkContainer to='/category/meat'>
						<Nav.Link
							className={
								keyword === 'meat'
									? 'navtab active bg-primary'
									: 'navtab bg-light'
							}
							data-toggle='tab'
						>
							<h2>Meat</h2>
						</Nav.Link>
					</LinkContainer>
				</Nav.Item>

				<Nav.Item>
					<LinkContainer to='/category/vegetable'>
						<Nav.Link
							className={
								keyword === 'vegetable'
									? 'navtab active bg-primary'
									: 'navtab bg-light'
							}
							data-toggle='tab'
						>
							<h2>Vegetables</h2>
						</Nav.Link>
					</LinkContainer>
				</Nav.Item>

				<Nav.Item>
					<LinkContainer to='/category/fruit'>
						<Nav.Link
							className={
								keyword === 'fruit'
									? 'navtab active bg-primary'
									: 'navtab bg-light'
							}
							data-toggle='tab'
						>
							<h2>Fruit</h2>
						</Nav.Link>
					</LinkContainer>
				</Nav.Item>

				<Nav.Item>
					<LinkContainer to='/category/cupboard'>
						<Nav.Link
							className={
								keyword === 'cupboard'
									? 'navtab active bg-primary'
									: 'navtab bg-light'
							}
							data-toggle='tab'
						>
							<h2>Cupboard</h2>
						</Nav.Link>
					</LinkContainer>
				</Nav.Item>
			</Nav>

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Row>
						{products.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product} />
							</Col>
						))}
					</Row>
				</>
			)}
		</div>
	);
};

export default Category;
