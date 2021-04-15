import {FaGithub} from 'react-icons/fa';
import { FiX }from 'react-icons/fi';
import styles from './styles.module.scss';
import { signIn, signOut, useSession } from 'next-auth/client'

export function SingInButton (){
    const [session] = useSession();
    
    

    return session ? (
        <button 
    type= "button"
    className= {styles.SignInButton}
   
    onClick={()=>signOut()}
    >
        <FaGithub  color ="#00FF7F"/>
       {session.user.name}
       <FiX color = "#737380" className = {styles.closeIncon} />
    </button>
    ): (
        <button 
    type= "button"
    className= {styles.SignInButton}
    onClick={()=>signIn('github')}
    >
        <FaGithub  color ="#eba407"/>
        Sing in with Github

    </button>
    )
}