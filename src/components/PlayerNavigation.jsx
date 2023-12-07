import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './PlayerNavigation.module.css';

function PlayerNavigation() {
  const isLogin = useSelector((state) => state.auth.authenticated);
  console.log('isLogin', isLogin);
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/player/main"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/player/apply"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Apply
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/player/apply/result"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Apply Result
            </NavLink>
          </li>
        </ul>
      </nav>
      {isLogin && (
        <div>
          <Form action="/logout" method="post">
            <button>Logout</button>
          </Form>
        </div>
      )}
    </header>
  );
}

export default PlayerNavigation;
