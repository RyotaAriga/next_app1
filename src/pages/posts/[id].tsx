
import { useRouter } from "next/router";
import { Post } from "@/types";
import React from "react";
import styles from "../../styles/Post.module.css"

type Props = {
  post: Post;
};

//pages/posts/[id].tsx

export async function getStaticPaths() {
  try {
    const res = await fetch("https://rails-api-dw8w.onrender.com/api/v1/posts");
    if (!res.ok) {
      throw new Error("Network response was not ok" + res.statusText);
    }
    const posts: Post[] = await res.json();
    const paths = posts.map((post) => ({
      params: { id: post.id.toString() },
    }));
    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return {
      paths: [],
      fallback: true,
    };
  }
}

export async function getStaticProps({params }: { params: { id: string } }) {
  const res = await fetch(`https://rails-api-dw8w.onrender.com/api/v1/posts/${params.id}`);
  const post = await res.json();

  console.log(post);

  return {
    props:{
      post,
    },
    revalidate: 60,
  };
}
const Post = ({ post }: Props) => {
  const router = useRouter();

  if(router.isFallback){
    return <div>Loading...</div>
  }

  return <div className={styles.container}>
    <div className={styles.title}>{post.title}</div>
    <div className={styles.date}>{post.created_at}</div>
    <p className={styles.date}>{post.content}</p>
  </div>;

};

export default Post;