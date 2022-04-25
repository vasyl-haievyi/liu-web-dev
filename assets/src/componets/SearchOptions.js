import React from 'react';
import { Link } from 'react-router-dom'

import styles from './SearchOptions.module.css';

class SearchOptions extends React.Component {
    render() {
        let items = this.props.categories.map((category) => {
            let subitems = category.subcategories.map((subcategory) => {
                return (
                    <li key={subcategory.id} className={styles.submenuItem}>
                            <label>
                                <input type="checkbox" />
                                {subcategory.title}
                            </label>
                    </li>
                )
            })

            return (
                <li key={category.id} className={styles.menuItem}>
                    <label>
                        <input type="checkbox" />
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
}


export default SearchOptions;