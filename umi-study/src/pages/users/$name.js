
import styles from './$name.css';

export default function(props) {
  return (
    <div className={styles.normal}>
      <h1>Page 动态路由页面</h1>
      <div>欢迎{props.match.params.name}来到小滴课堂</div>
      <button onClick={()=>props.history.goBack()}>返回</button>
    </div>
  );
}
