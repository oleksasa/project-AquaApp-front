import { useState, useEffect } from 'react';
import photo1 from '../../../public/img/userCount/photo1.webp';
import photo2 from '../../../public/img/userCount/photo2.webp';
import photo3 from '../../../public/img/userCount/photo3.webp';
import css from './UserCount.module.css';
import classNames from 'classnames';

const UserCount = () => {
  const [userCount, setUserCount] = useState();

  //   useEffect(() => {
  //     async function getCount() {
  //       try {
  //         const data = await requestUserCount();
  //         setUserCount(data.data.count);
  //       } catch (err) {
  //         console.log(err.message);
  //       }
  //     }

  //     getCount();
  //   });

  return (
    <div className={css.userCountComponent}>
      <ul className={css.userCountList}>
        <li className={css.userCountItem}>
          <img src={photo1} alt="user" />
        </li>
        <li className={css.userCountItem}>
          <img src={photo2} alt="user" />
        </li>
        <li className={css.userCountItem}>
          <img src={photo3} alt="user" />
        </li>
      </ul>
      <p className={classNames(css.countCustomers, css.userCountText)}>
        <span className={classNames(css.countSpan, css.userCountText)}>
          Our
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
