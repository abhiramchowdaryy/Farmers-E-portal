import React, { useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const SearchBar = () => {
	const [keyword, setKeyword] = useState('');
	let history = useHistory();

	const submitSearchHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			history.push(`/search/${keyword}`);
		} else {
			history.push('/');
		}
	};

	return (
		<Form inline onSubmit={submitSearchHandler}>
			<FormControl
				className='mr-sm-2 ml-sm-5'
				type='text'
				name='query'
				placeholder='Search Groceries'
				onChange={(e) => setKeyword(e.target.value)}
			></FormControl>
			<Button variant='secondary' type='submit'>
				Search
			</Button>
		</Form>
	);
};

export default SearchBar;
