import { async } from '@angular/core/testing';
import { reducer } from './auth.reducer';
import * as fromReducer from './auth.reducer';
import * as actions from '../actions/auth.actions';


describe('test AuthReducer', () => {
  describe('未定义Action', () => {
    it('应该返回一个默认状态', async(() => {
      const action = {} as any;
      const result = reducer(undefined, action);
      expect(result).toEqual(fromReducer.initialState);
    }));
  });
  describe('登录成功', () => {
    it('应该返回一个Err 为undefined 而 UserId 不为空的Auth 对象', async(() => {
      const action = {
        type: actions.LOGIN_SUCCESS,
        payload: {
          token: '',
          user: {
            id: '1',
            email: 'dev@local.dev'
          }
        }
      } as any;
      const result = reducer(undefined, action);
      expect(result.auth.user).toEqual(action.payload.user);
      expect(result.auth.err).toBeUndefined();
    }));
  });
});
