import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { AnyAction } from 'redux';
import colors from '../../colors';
import { GlobalStore, IAppState } from '../../store';
import IDispatchFunc from '../../store/IDispatchFunc';

const styles = {
  container: {
    display: 'inline-block',
  } as React.CSSProperties,
  navBarList: {
    listStyleType: 'none',
    paddingLeft: 0,
    color: colors.leagueLight,
  } as React.CSSProperties,
  navItem: {
    display: 'inline',
    marginRight: 15,
    cursor: 'pointer',
    fontSize: 14,
    textShadow: '2px 2px 2px #000',
  } as React.CSSProperties,
  currentNavItem: {
    borderBottom: `1px solid ${colors.leagueSuperLight}`,
    color: colors.leagueSuperLight,
  } as React.CSSProperties,
};

interface IStoreProps {
  globalStore: GlobalStore.State;
}

interface IStoreActionProps {
  globalStoreActions: GlobalStore.IActionCreators;
  pushRoute: (routeName: string) => void;
}

interface IProps extends IStoreProps, IStoreActionProps {}

interface IState {
  route: string;
}

const routes = [
  { route: '/', title: 'HOME' },
  { route: '/browse', title: 'BROWSE' },
  { route: '/settings', title: 'SETTINGS' },
];

class NavBar extends React.Component<IProps, IState> {
  public state = {
    route: '/',
  };

  public handleRoute = (routeName: string) => {
    // tslint:disable-next-line:no-console
    console.log(this);
    this.props.pushRoute(routeName);
    this.setState({ route: routeName });
  }

  public render() {
    return (
      <div style={styles.container}>
        <ul style={styles.navBarList}>
          {routes.map((r, i) =>
            <li
              key={i}
              onClick={() => this.handleRoute(r.route)}
              style={this.getStyleForNavItem(r.route)}
            >
              {r.title}
            </li>,
          )}
        </ul>
      </div>
    );
  }

  private getStyleForNavItem(routeName: string) {
    if (this.state.route === routeName) {
      return Object.assign({}, styles.navItem, styles.currentNavItem);
    }
    return styles.navItem;
  }
}

export default connect(
  (state: IAppState) => ({
    globalStore: state.global,
  } as IStoreProps),
  (dispatch: IDispatchFunc<AnyAction>) => ({
    globalStoreActions: GlobalStore.actionCreators(dispatch),
    pushRoute: (route: string) => dispatch(push(route)),
  } as IStoreActionProps),
)(NavBar);
