import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>School Management App</h1>
      <p className={styles.paragraph}>Welcome! Choose an option below:</p>
      <ul className={styles.list}>
        <li>
          <Link href="/form">Add a new School</Link>
        </li>
        <li>
          <Link href="/schools">View all schools</Link>
        </li>
      </ul>
    </div>
  );
}
