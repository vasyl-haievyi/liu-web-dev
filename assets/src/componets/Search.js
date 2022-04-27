import React from 'react';
import { useSearchParams } from 'react-router-dom'

import styles from './Search.module.css';

import NavBar from './NavBar'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults';
import SearchOptions from './SearchOptions';

function Search () {
    let [searchParams, setSearchParams] = useSearchParams();
    let selectedCategories = searchParams.getAll("category")

    let onCategoryChecked = (id ,checked) => {
        if (checked) {
            selectedCategories.push(id);
        } else {
            selectedCategories = selectedCategories.filter(catId => catId !== id)
        }

        setSearchParams({category: selectedCategories})
    }

    return (
        <div>
            <NavBar />
            <SearchBar />
            <div className={styles.resultsArea}>
                <div className={styles.searchOptions}>
                    <SearchOptions checked={selectedCategories} onCheckedChange={onCategoryChecked} />
                </div>
                <div className={styles.searchResults}>
                    <SearchResults results={getSearchResults()} />
                </div>
            </div>
        </div>
    )
}

function getSearchResults() {
    let res = [];
    for (var i = 0; i < 30; i++) {
        res.push({
            id: i.toString(),
            title: "Result " + i.toString() + (i % 5 === 0? " blablblalbalbalbalblablablabla" : ""),
        })
    }

    return res;
}

export default Search;