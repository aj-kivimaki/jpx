import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        navigate('/', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isLoggedIn, navigate]);

  return (
    <div className={styles.notFound}>
      <h1>404 - Sivua ei löydy</h1>
      <p>Sinut ohjataan pian eteenpäin...</p>
    </div>
  );
};

export default NotFound;
