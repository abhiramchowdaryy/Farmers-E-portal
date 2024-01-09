import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ keyword = '', pages, page, isAdmin = false }) => {
	return (
		pages > 1 && (
			<Pagination>
				{[...Array(pages).keys()].map((n) => (
					<LinkContainer
						key={n + 1}
						to={
							!isAdmin
								? keyword
									? `/search/${keyword}/page/${n + 1}`
									: `/page/${n + 1}`
								: `/products/${n + 1}`
						}
					>
						<Pagination.Item size='sm' active={n + 1 === page}>
							{n + 1}
						</Pagination.Item>
					</LinkContainer>
				))}
			</Pagination>
		)
	);
};

export default Paginate;
