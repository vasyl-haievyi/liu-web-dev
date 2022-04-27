import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import styles from './SearchOptions.module.css';

function SearchOptions ({ checked, onCheckedChange }) {
    let [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch("/api/categories")
        .then(response => response.json()
        .then(data => setCategories(data.categories)))
    }, []);

    let items = categories.map((category) => {
        let subitems = category.subcategories.map((subcategory) => {
            return (
                <li key={subcategory.id} className={styles.submenuItem}>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={checked.includes(subcategory.id)} 
                                onChange={(e) => {onCheckedChange(subcategory.id, e.target.checked)}} 
                            />
                            {subcategory.title}
                        </label>
                </li>
            )
        })

        return (
            <li key={category.id} className={styles.menuItem}>
                <label>
                    <input 
                        type="checkbox" 
                        checked={checked.includes(category.id)} 
                        onChange={(e) => {onCheckedChange(category.id, e.target.checked)}} 
                    />
                    {category.title}
                </label>
                <ul className={styles.submenu}>
                    {subitems}
                </ul>
            </li>
        )
    });

    return (
        <div className={styles.menu}>
            <ul>
                {items}
            </ul>
        </div>
    )
}


export default SearchOptions;