import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Product from '../../components/Product';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Paginate from '../../components/Paginate';
import banner from '../../assets/fm-banner.png';
import { listProducts } from '../../redux/actions/productActions';

const Home = () => {
	const { keyword } = useParams();
	const { pageNumber } = useParams() || 1;
	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, page, pages } = productList;

	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber));
	}, [dispatch, keyword, pageNumber]);

	return (
		<div className='home'>
			<Container fluid>
				<Image className='banner' src={banner} fluid />
			</Container>
			<Nav className='nav-tab mt-4 mb-3'>
				<Nav.Item>
					<LinkContainer to='/'>
						<Nav.Link className='navtab bg-primary' data-toggle='tab'>
							<h2>All Products</h2>
						</Nav.Link>
					</LinkContainer>
				</Nav.Item>

				<Nav.Item>
					<LinkContainer to='/category/meat'>
						<Nav.Link className='navtab bg-light' data-toggle='tab'>
							<h2>Meat</h2>
						</Nav.Link>
					</LinkContainer>
				</Nav.Item>

				<Nav.Item>
					<LinkContainer to='/category/vegetable'>
						<Nav.Link className='navtab bg-light' data-toggle='tab'>
							<h2>Vegetables</h2>
						</Nav.Link>
					</LinkContainer>
				</Nav.Item>

				<Nav.Item>
					<LinkContainer to='/category/fruit'>
						<Nav.Link className='navtab bg-light' data-toggle='tab'>
							<h2>Fruit</h2>
						</Nav.Link>
					</LinkContainer>
				</Nav.Item>

				<Nav.Item>
					<LinkContainer to='/category/cupboard'>
						<Nav.Link className='navtab bg-light' data-toggle='tab'>
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
					<Paginate
						pages={pages}
						page={page}
						keyword={keyword ? keyword : ''}
					/>
				</>
			)}
		</div>
	);
};

export default Home;
