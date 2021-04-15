import { GetServerSideProps } from "next";
import {RichText} from 'prismic-dom';
import Head from "next/head";
import { getSession } from "next-auth/client";
import { getPrismicClient } from "../../../services/prismic";
import styles from "../post.module.scss";

import { useRouter } from "next/router";



interface PostProps{
    posts:{
    slug: string;
    title: string;
    content: string;
    updateAt: string;
    }
}

export default function Posts({posts}: PostProps){
    return(
        <>
     <Head>
       <title>{posts.title}| Ignews </title>
     </Head>
     <main className = {styles.container}>
         <article className= {styles.post}>
           <h1>{posts.title}</h1>
           <time>{posts.updateAt}</time>
          <div  className = {styles.postcontent}
          dangerouslySetInnerHTML={{__html: posts.content}} />
         </article>
     </main>
      </>
    );
}


export const getServerSideProps: GetServerSideProps = async ({req, params}) => {
    const session = await getSession ({req})
    const { slug } = params;
  
   
    
    if(!session?.activeSub){
        return{
            
            redirect:{
              destination: `/`,
              permanent:false,
            }
        }
    }

    const prismic = getPrismicClient(req)

    const response = await prismic.getByUID('post', String(slug), {})

    const posts = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
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
    }
}
