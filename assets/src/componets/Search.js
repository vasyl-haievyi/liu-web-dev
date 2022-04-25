import React from 'react';

import styles from './Search.module.css';

import NavBar from './NavBar'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults';
import SearchOptions from './SearchOptions';

class Search extends React.Component {
    render() {
        return (
            <div>
                <NavBar />
                <SearchBar />
                <div className={styles.resultsArea}>
                    <div className={styles.searchOptions}>
                        <SearchOptions categories={getCategories()} />
                    </div>
                    <div className={styles.searchResults}>
                        <SearchResults results={getSearchResults()} />
                    </div>
                </div>
            </div>
        )
    }
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

function getCategories() {
    let res = [];
    for (var i = 0; i < 10; i++) {
        let obj = {
            id: i.toString(),
            title: "Category " + i.toString() + (i % 5 === 0? " lablablabla" : ""),
            subcategories: []
        }

        for(var j = 0; j < Math.random() * 5; j++) {
            obj.subcategories.push({
                id: j.toString(),
                title: "Subcategory " + j.toString() + (j % 2 === 0? " balblablablabla" : ""),
            })
        }

        res.push(obj)
    }

    return res; 
}

export default Search;