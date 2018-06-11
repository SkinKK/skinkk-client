import * as React from "react";
import colors from '../colors';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AnyAction } from "redux";
import routes from '../routes';
import {
  GlobalStore, IAppState,
} from '../store';
import IDispatchFunc from "../store/IDispatchFunc";
import Titlebar from "./Titlebar";

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    color: '#EEE',
    border: `1px solid ${colors.leagueLight}`,
    borderTop: `3px solid ${colors.leagueLight2}`,
    overflow: 'hidden',
  } as React.CSSProperties,
  backgroundContainer: {
    backgroundImage: 'url(./assets/img/background.png)',
    filter: 'blur(10px)',
    // We need the transform to remove the halo effect with blur(). (White glowing effect at the sides)
    transform: 'scale(1.1)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh',
  } as React.CSSProperties,
  contentContainer: {
    position: 'relative',
    bottom: '100vh',
  } as React.CSSProperties,
  routeContainer: {
    width: '100%',
    height: '100%',
  } as React.CSSProperties,
};

interface IStoreProps {
  globalStore: GlobalStore.State;
}

interface IStoreActions {
  globalStoreActions: GlobalStore.IActionCreators;
}

// tslint:disable-next-line:no-empty-interface
interface IProps extends IStoreProps, IStoreActions {
}

interface IState {
  loading: boolean;
}

class App extends React.Component<IProps, IState> {
  public state = {
    loading: false,
  };

  public componentDidMount() {
    // tslint:disable-next-line:max-line-length
    this.props.globalStoreActions.setBackgroundImage('linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Pyke_0.jpg)');
  }

  public render() {
    if (this.state.loading) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div style={styles.container}>
        <div style={this.getBackgroundContainerStyle()} />
        <div style={styles.contentContainer}>
          <Titlebar />
          <div style={styles.routeContainer}>
            {routes}
          </div>
        </div>
      </div>
    );
  }

  private getBackgroundContainerStyle() {
    // This will optionally set the background for the entire application
    if (this.props.globalStore.backgroundImage) {
      return Object.assign(
        {},
        styles.backgroundContainer,
        { backgroundImage: this.props.globalStore.backgroundImage! } as React.CSSProperties,
      );
    }

    return styles.backgroundContainer;
  }
}

export default withRouter(connect(
  (state: IAppState) => ({
    globalStore: state.global,
  } as IStoreProps),
  (dispatch: IDispatchFunc<AnyAction>) => ({
    globalStoreActions: GlobalStore.actionCreators(dispatch),
  } as IStoreActions),
)(App) as any);
