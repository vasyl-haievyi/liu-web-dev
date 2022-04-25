import styles from './Main.module.css';

import NavBar from './NavBar';
import SearchBar from './SearchBar';
import Categories from './Categories';

function getCategories() {
  return [{id: "transport", prettyName: "Transport"}, {id: "real_estate", prettyName: "Real Estate"}, {id: "electronics", prettyName: "Electronics"}, {id: "fascion", prettyName: "Fascion" }, {id: "sport_and_hobbies", prettyName: "Sport & Hobbies"},]
}

function Main() {
  return (
    <div className={styles.main}>
      <NavBar />
      <SearchBar />
      <Categories categories={getCategories()} />
    </div>
  );
}

export default Main;
