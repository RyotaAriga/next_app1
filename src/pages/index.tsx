import Header from './components/Header'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Link from "next/link";
import { useRouter } from "next/router"
import axios from "axios";

interface Post {
  id: string;
  title: string;
  content: string;
}

type Props = {
  posts: Post[];
};

export async function getStaticProps(){
  try {
    const res = await fetch("https://rails-api-dw8w.onrender.com/api/v1/posts");
    const data = await res.text(); // テキストとして取得

    console.log('Response data:', data);

    const posts = JSON.parse(data); // 手動で解析

    return {
      props:{
        posts,
      },
      revalidate: 60 * 60 * 24,
    };
  } catch (error) {
    console.error('Data fetch error:', error);
    return {
      props: {
        posts: [],
      },
    };
  }
}

export default function Home({ posts }: Props){
  const router = useRouter();

  const handleDelete = async (postId: string) =>{
    try{
     await axios.delete(`https://rails-api-dw8w.onrender.com/api/v1/posts/${postId}`);
     router.reload();
    }catch(err){
      alert("削除に失敗しました");
    }

  }
  return (
    <>
      <Header />

      <div className={styles.homeContainer}>
      <Link href="/create-post" className={styles.createButton}>
        Create new Post
      </Link>
        <div>
          {posts.map((post: Post) =>(
            <div key={post.id} className={styles.postCard}>
              <Link href={`posts/${post.id}`} className={styles.postCardBox}>
                <h2>{post.title}</h2>
              </Link>
              <p>{post.content}</p>
              <Link href={`/edit-post/${post.id}`}>
                <button className={styles.editButton}>Edit</button>
              </Link>
              
              <button className={styles.deleteButton}
              onClick={() => handleDelete(post.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
    );
  }
