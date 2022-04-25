import React from 'react';
import { Link } from 'react-router-dom'

import styles from './Categories.module.css'

class Categories extends React.Component {
    render() { 
        let categories = this.props.categories.map((category) => {
            return (
                <div className={styles.category}>
                    <div className={styles.categoryImage}></div>
                    <div className={styles.categoryName}>
                        <Link to={category.id}>{category.prettyName}</Link>  
                    </div>
                </div>
            )
        });
        return (
            <div className={styles.categoriesContainer}>
                {categories}
            </div>
        )
    }
}

export default Categories;