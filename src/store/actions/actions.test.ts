import configureStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { userLogoutAction } from 'store/actions/actions';
import { AnyAction } from 'redux';
import { expectedLogoutActions } from 'mocks/index';

const middlewares = [thunk];

describe('login user redux', () => {
  const initialState = { loggedIn: false };
  type State = typeof initialState;
  const mockStore = configureStore<State, ThunkDispatch<State, any, AnyAction>>(middlewares);
  const store = mockStore(initialState);

  beforeEach(() => {
    store.clearActions();
  });

  describe('logout user action', () => {
    it('should dispatch the logout user action', () => {
      return store.dispatch(userLogoutAction())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual(expectedLogoutActions);
        });
    });
  });
});
