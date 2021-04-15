import { GetServerSideProps, GetStaticProps } from "next";
import {RichText} from 'prismic-dom';
import Head from "next/head";
import {  useSession } from "next-auth/client";
import { getPrismicClient } from "../../services/prismic";
import styles from "./post.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";




interface PostPreviewProps{
    posts:{
    slug: string;
    title: string;
    content: string;
    updateAt: string;
    }
}

export const getStaticPaths = () =>{

    return{
        paths:[],
        fallback: 'blocking'
    }
}

export default function PostPreview({posts}: PostPreviewProps){
    
const [session] = useSession()
const router = useRouter()

useEffect(() => {
    if (session?.activeSub){
     router.push(`/posts/preview/${posts.slug}`)
    }
}, [session])

    return(
        <>
     <Head>
       <title>{posts.title}| Ignews </title>
     </Head>
     <main className = {styles.container}>
         <article className= {styles.post}>
           <h1>{posts.title}</h1>
           <time>{posts.updateAt}</time>
          <div  className = {`${styles.postcontent} ${styles.previewcontent}`}
          dangerouslySetInnerHTML={{__html: posts.content}} />
          <div className= {styles.continueReading}>
              Waanna continue reading?
              <Link href="/">
              <a>subscribe now</a>
              </Link>    
              
          </div>
         </article>
     </main>
      </>
    );
}


export const getStaticProps: GetStaticProps = async ({params}) => {
   
    const { slug } = params;
   
   
    const prismic = getPrismicClient()

    const response = await prismic.getByUID('post', String(slug), {})

    const posts = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content.splice(0,3)),
        updateAt: new Date(response.last_publication_date).toLocaleDateString('pt-br',{
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    };
    return{
        props:{
            posts,
        },
        redirect: 60*30, //30 minutos
    }
}
