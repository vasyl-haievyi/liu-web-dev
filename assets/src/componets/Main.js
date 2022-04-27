import styles from './Main.module.css';

import NavBar from './NavBar';
import SearchBar from './SearchBar';
import Categories from './Categories';

function Main() {
  return (
    <div className={styles.main}>
      <NavBar />
      <SearchBar />
      <Categories />
    </div>
  );
}

export default Main;
