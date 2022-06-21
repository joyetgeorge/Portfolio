import Link from "next/link";
import styles from "../styles/blogCard.module.css";
import Image from "next/image";
import moment from "moment";

export default function BlogCard({
  title,
  author,
  coverPhoto,
  datePublished,
  slug,
}) {
  return (
    <div className={styles.card}>
      <Link href={`/blogs/${slug}`}>
        <div>
          <div className={styles.imgContainer}>
            <Image unoptimized layout="fill" src={coverPhoto.url} alt="" />
          </div>
          <div className={styles.text}>
            <div className={styles.title}>
              <h2>{title}</h2>
            </div>
            <div className={styles.details}>
              <div className={styles.author}>
                <img unoptimized src={author.avathar.url} alt={author.name} />
                <p>{author.name}</p>
              </div>
              <div className={styles.date}>
                <p>{moment(datePublished).format("MMMM d, YYYY")}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
