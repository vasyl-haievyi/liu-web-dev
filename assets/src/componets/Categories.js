import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'

import styles from './Categories.module.css'

function Categories()  {
    let [categories, setCategories] = useState([])
    useEffect(() => {
        fetch("/api/categories")
        .then(response => response.json()
        .then(data => setCategories(data.categories)))
    }, [])

    let categoriesItems = categories.map((category) => {
        return (
            <div className={styles.category}>
                <div className={styles.categoryImage}></div>
                <div className={styles.categoryName}>
                    <Link to={`/search?category=${category.id}`}>{category.title}</Link>  
                </div>
            </div>
        )
    });
    return (
        <div className={styles.categoriesContainer}>
            {categoriesItems}
        </div>
    )
}

export default Categories;