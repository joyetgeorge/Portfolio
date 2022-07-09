import { GraphQLClient, gql } from "graphql-request";
import styles from "../../styles/blog.module.css";
import Head from "next/head";
import NavBar from "../components/navbar";

const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      datePublished
      content {
        html
      }
      author {
        avathar {
          url
        }
      }
      coverPhoto {
        url
      }
    }
  }
`;

const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

const endpoint =
  "https://api-ap-south-1.graphcms.com/v2/cl4jhde3u4s2201yr3ncu5jcx/master";

const graphQLClient = new GraphQLClient(endpoint);

export const getStaticProps = async ({ params }) => {
  const slug = params.slug;

  const data = await graphQLClient.request(QUERY, { slug });
  const post = data.post;
  return {
    props: {
      post,
    },
    revalidate: 10,
  };
};

export async function getStaticPaths() {
  const { posts } = await graphQLClient.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
}

export default function BlogPost({ post }) {
  return (
    <div className={styles.main}>
        <NavBar></NavBar>
        <Head>
          <title>{post.title}</title>
        </Head>
        <div className={styles.article}>
          <div className="header">
            <div className={styles.coverPhoto}>
              <img src={post.coverPhoto.url} alt="" />
            </div>
          </div>
          <div className={styles.contentDiv}>
            <h1>{post.title}</h1>
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: post.content.html }}
            ></div>
          </div>
        </div>
      </div>
  );
}
