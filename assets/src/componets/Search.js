import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

import NavBar from './NavBar'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults';
import SearchOptions from './SearchOptions';
import axios from 'axios';

function Search () {
    let [searchParams, setSearchParams] = useSearchParams();
    let [searchResults, setSearchResults] = useState([]);
    let [categoriesFilter, setCategoriesFilter] = useState([])
    let [searchTerm, setSearchTerm] = useState("")
    let [justRendered, setJustRendered] = useState(true)

    let loadSearchResults = (q = searchTerm, catF = categoriesFilter) => {
        if (!q && !catF) {
            return
        }
        q = q? q : ""
        catF = catF? catF : []
        let searchURL = '/api/items?q=' + q + '&' + catF.map(c => 'category=' + c).join('&')
        axios.get(searchURL)
        .then(response => {
            setSearchResults(response.data.items)
        }).catch(error => {
            alert(JSON.stringify(error))
        })
    }

    if (justRendered) {
        setCategoriesFilter(searchParams.getAll('category'))
        setSearchTerm(searchParams.get('q'))
        loadSearchResults(searchParams.get('q'), searchParams.getAll('category'))
        setJustRendered(false)
    }

    let onCategoryChecked = (id ,checked) => {
        if (checked) {
            searchParams.append('category', id)
        } else {
            let newSelectedCategories = searchParams.getAll('category').filter(catId => catId !== id)
            searchParams.delete('category')
            newSelectedCategories.forEach(category => {searchParams.append('category', category)})
        }

        searchParams.sort()
        setCategoriesFilter(searchParams.getAll('category'))
        setSearchParams(searchParams)
    }

    let onSearchClicked = (searchTerm) => {
        searchParams.set('q', searchTerm)
        setSearchParams(searchParams)
        setSearchTerm(searchTerm)

        loadSearchResults(searchTerm, searchParams.getAll('category'))
    }

    return (
        <Container fluid>
            <Row>
                <NavBar />
            </Row>
            <Row>
                <SearchBar onSearchClicked={onSearchClicked}/>
            </Row>
            <Row>
                <Col xs="7" md="4" xl="2">
                    <SearchOptions checked={searchParams.getAll('category')} onCheckedChange={onCategoryChecked} />
                </Col>
                <Col>
                    <SearchResults results={searchResults ?? []} />
                </Col>
            </Row>
        </Container>
    )
}

export default Search;