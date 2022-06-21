import { GraphQLClient, gql } from "graphql-request";
import BlogCard from "../components/BlogCard";
import Head from "next/head";
import styles from "../styles/BlogPage.module.css";
import NavBar from "../components/navbar";

const QUERY = gql`
  {
    posts {
      id
      title
      datePublished
      slug
      coverPhoto {
        url
      }
      author {
        name
        avathar {
          url
        }
      }
    }
  }
`;

export const getStaticProps = async () => {
  const endpoint = `https://api-ap-south-1.graphcms.com/v2/${process.env.SECRET_KEY}`;

  const graphQLClient = new GraphQLClient(endpoint);

  const data = await graphQLClient.request(QUERY);
  return {
    props: {
      data,
    },
    revalidate: 10,
  };
};

export default function Blog({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Digital Scribbles</title>
        <meta name="description" content="A blog tutorial made with JAMstack" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar></NavBar>
      <div className={styles.title}>
        <h1>
        <span style={{ color: "#FFFFFF" }}>Blogs</span><span style={{ color: "#EA0F1E" }}>.</span>
        </h1>
      </div>
      <main className={styles.main}>
        {data.posts.map((post) => (
          <BlogCard
            title={post.title}
            author={post.author}
            coverPhoto={post.coverPhoto}
            datePublished={post.datePublished}
            slug={post.slug}
          />
        ))}
      </main>
    </div>
  );
}
