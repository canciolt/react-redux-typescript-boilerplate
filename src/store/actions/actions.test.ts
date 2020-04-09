import configureStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { userLoginAction } from 'store/actions/actions';
import { AnyAction } from 'redux';
import { expectedLoginActions, userLoginReducerData } from 'mocks/index';

const middlewares = [thunk];

describe('login user redux', () => {
  const initialState = { loggedIn: false };
  type State = typeof initialState;
  const mockStore = configureStore<State, ThunkDispatch<State, any, AnyAction>>(middlewares);
  const store = mockStore(initialState);

  beforeEach(() => {
    store.clearActions();
  });

  describe('login correct user action', () => {
    it('should dispatch the login user action', () => {
      return store.dispatch(userLoginAction(userLoginReducerData))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual(expectedLoginActions);
        });
    });
  });
});
