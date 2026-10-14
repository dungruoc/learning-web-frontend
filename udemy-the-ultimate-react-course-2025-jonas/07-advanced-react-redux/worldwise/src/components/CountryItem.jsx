import styles from "./CountryItem.module.css";

export default function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>{country.flag}</span>
      <span>{country.name}</span>
    </li>
  );
}
