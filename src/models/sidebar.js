import {
    getProjectByCode,
    getSuiteByCode,
  } from '../services/sidebar';
  
  export default {
    namespace: 'dynamicSidebarRedux',
    state: {
      testcases: [],
      suites: []
    },
    effects: {
        *fetchListSuiteByProjectCode({ projectCode }, { call, put }) {
            const response = yield call(getProjectByCode, projectCode);
            yield put({
                type: 'saveListSuite',
                data: response.data.suite_entities
            })
        },
        *fetchListTestCaseBySuiteCode({ suiteCode }, { call, put }) {
            const response = yield call(getSuiteByCode, suiteCode);
            yield put({
                type: 'saveListTestCase',
                data: response.data.testcase_entities
            })
        }
      
    },
    reducers: {
        saveListSuite(state, action) {
            return {
                ...state, suites: action.data
            }
        },
        saveListTestCase(state, action) {
            return {
                ...state, testcases: action.data
            }
        }
    },
  };
  