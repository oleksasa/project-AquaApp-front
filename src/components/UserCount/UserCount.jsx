import { useState, useEffect } from 'react';
import photo1 from '../../../public/img/userCount/photo1.webp';
import photo2 from '../../../public/img/userCount/photo2.webp';
import photo3 from '../../../public/img/userCount/photo3.webp';
import css from './UserCount.module.css';
import classNames from 'classnames';
import { requestUserCount } from '../../api/auth';

const UserCount = () => {
  const [userCount, setUserCount] = useState();
  const [avatars, setAvatars] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCount() {
      try {
        const data = await requestUserCount();
        setUserCount(data.data.totalUsersCount);
        setAvatars(data.data.randomAvatars);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }

    getCount();
  }, []);

  return (
    <div className={css.userCountComponent}>
      <ul className={css.userCountList}>
        {loading ? (
          ''
        ) : avatars && avatars.length > 0 ? (
          avatars.map((photo, index) => (
            <li key={index} className={css.userCountItem}>
              <img src={photo} alt={`user ${index + 1}`} />
            </li>
          ))
        ) : (
          <>
            <li className={css.userCountItem}>
              <img src={photo1} alt="user" className={css.userCountPhoto} />
            </li>
            <li className={css.userCountItem}>
              <img src={photo2} alt="user" className={css.userCountPhoto} />
            </li>
            <li className={css.userCountItem}>
              <img src={photo3} alt="user" className={css.userCountPhoto} />
            </li>
          </>
        )}
      </ul>

      <p className={classNames(css.countCustomers, css.userCountText)}>
        <span className={classNames(css.countSpan, css.userCountText)}>
          {userCount}
        </span>{' '}
        <span className={classNames(css.grinSpan, css.userCountText)}>
          happy
        </span>{' '}
        customers
      </p>
    </div>
  );
};

export default UserCount;
