import Link from 'umi/link'
import styles from './index.css';

export default function() {
  const userList=[
    {id:1,name:'tim'},
    {id:2,name:'tom'}
  ]
  return (
    <div className={styles.normal}>
      <h1>users/Page index</h1>
      <ul>
        {
          userList.map((e,i)=>{
            return (
              <Link to={`/users/${e.name}`}>
                <li key={i}>{e.id}--{e.name}</li>
             </Link>
            )
          })
        }
      </ul>
    </div>
  );
}
