import styles from "../styles/home.module.css";

export default function Home() {
  return (
    <>
     <div className={styles.container}>
      <h1 className={styles.title}>School Management app</h1>
      <p className={styles.paragraph}>Welcome!  Choose an Option below:</p>
      <ul className={styles.list}>
        <li><a href="/form">Add a new School</a></li>
        <li><a href="/schools">View all schools</a></li>
      </ul>
     </div>
    </>
  );
}
