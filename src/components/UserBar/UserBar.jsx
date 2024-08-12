import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Icon from '../Icon/Icon';
import { IoPersonCircleSharp } from 'react-icons/io5';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import css from './UserBar.module.css';
import { useSelector } from 'react-redux';
import { selectUserName } from '../../redux/auth/selectors.js';

export default function UserBar() {
  const [isShow, setIsShow] = useState(false);
  const [popoverWidth, setPopoverWidth] = useState(null);
  const buttonRef = useRef(null);
  const popoverRef = useRef(null);

  const userName = useSelector(selectUserName);

  const handlClick = () => {
    if (!isShow) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  };

  // useLayoutEffect(() => {
  //   if (buttonRef.current) {
  //     setPopoverWidth(buttonRef.current.offsetWidth);
  //   }
  // }, [isShow]);

  // useEffect(() => {
  //   const handleOutsideClick = event => {
  //     if (
  //       isShow &&
  //       popoverRef.current &&
  //       !popoverRef.current.contains(event.target) &&
  //       !buttonRef.current.contains(event.target)
  //     ) {
  //       setIsShow(false);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleOutsideClick);
  //   return () => {
  //     document.removeEventListener('mousedown', handleOutsideClick);
  //   };
  // }, [isShow]);

  return (
    <div className={css.wrapUserBar}>
      <button
        ref={buttonRef}
        className={css.button}
        type="button"
        onClick={handlClick}
      >
        {userName ? userName : 'User'}
        <div className={css.wrapAvatar}>
          <IoPersonCircleSharp className={css.avatar} />
        </div>
        <div className={css.wrapIcon}>
          {isShow ? (
            <Icon id="chevron-up" className={css.icon} />
          ) : (
            <Icon id="chevron-down" className={css.icon} />
          )}
        </div>
      </button>
      {isShow && (
        <div ref={popoverRef}>
          <UserBarPopover
            style={{
              width: popoverWidth !== null ? `${popoverWidth}px` : 'auto',
            }}
          />
        </div>
      )}
    </div>
  );
}
