import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SidebarItem from '../SidebarItem';
import styles from './style.scss';

const Sidebar = ({
  accounts,
  isHidden,
  onRemoveAccount,
  location,
}) =>
  <div className={[styles.container, isHidden && styles.containerHidden].filter(v => !!v).join(' ')}>
    <Link to="/add-account" className={`${styles.tab} add-account`}>
      <div>
        <span>+</span>
      </div>
    </Link>

    {accounts
      .map(account => ({ ...account, path: `/mailbox/${account.username}` }))
      .map(account => ({ ...account, isActive: account.path === location.pathname }))
      .map(({ username, unreadEmails, path, isActive }, index) => (
        <SidebarItem
          key={index}
          href={path}
          isActive={isActive}
          onRemoveAccount={onRemoveAccount}
          unreadEmails={unreadEmails}
          username={username}
        />
      ))}

    <Link
      to="/settings"
      className={[styles.SettingsTab]}
    >
      settings
    </Link>
  </div>;

Sidebar.propTypes = {
  accounts: PropTypes.array.isRequired,
  isHidden: PropTypes.bool.isRequired,
  onRemoveAccount: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default Sidebar;
