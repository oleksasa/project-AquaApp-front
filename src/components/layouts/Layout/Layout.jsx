import React from 'react';
import { Link } from 'react-router-dom';
import css from './Layout.module.css';
import classNames from 'classnames';

export const Layout = ({ leftComponent, rightComponent }) => {
  return (
    <div className={css.layoutWrapper}>
      <div
        className={classNames(
          css.leftComponentStyle,
          css.component,
          css.paddingLeft,
        )}
        style={{
          backgroundColor: leftComponent.bg,
          display: leftComponent.hide ? 'none' : 'flex',
        }}
      >
        <Link to="/" className={css.logo}>
          AquaTrack
        </Link>
        {leftComponent.component}
      </div>
      <div
        className={classNames(css.rightComponentStyle, css.component)}
        style={{
          backgroundColor: rightComponent.bg,
          display: rightComponent.hide ? 'none' : 'flex',
        }}
      >
        {rightComponent.component}
      </div>
    </div>
  );
};
