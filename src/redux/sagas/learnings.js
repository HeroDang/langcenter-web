import { call, put } from 'redux-saga/effects';
import learningApi from 'api/learningApi';
import * as learningActions from 'redux/actions/learnings';
import { takeLatest } from 'redux-saga/effects';

export function* learningSaga() {
  yield takeLatest(learningActions.getLearnings.getLearningsRequest, fetchLearnings);
  yield takeLatest(learningActions.createLearning.createLearningRequest, createLearning);
  // yield takeLatest(learningActions.updateLevel.updateLevelRequest, updateLevel);
  // yield takeLatest(learningActions.deleteLevel.deleteLevelRequest, deleteLevel);
}

function* fetchLearnings(action) {
  try {
    const learnings = yield call(learningApi.getAll);

    yield put(learningActions.getLevels.getLevelsSuccess(learnings));
  } catch (error) {
    yield put(learningActions.getLevels.getLevelsFailure(error));
  }
}

function* createLearning(action) {
  try {
    const newLearning = yield call(learningApi.create, action.payload);

    yield put(learningActions.createLevel.createLevelSuccess(newLearning));
  } catch (error) {
    yield put(learningActions.createLevel.createLevelFailure(error));
  }
}

// function* updateLevel(action) {
//   try {
//     yield call(learningApi.update, action.payload);
//     yield put(learningActions.updateLevel.updateLevelSuccess(action.payload));
//   } catch (error) {
//     yield put(learningActions.updateLevel.updateLevelFailure(error));
//   }
// }

// function* deleteLevel(action) {
//   try {
//     yield call(learningApi.delete, action.payload);

//     yield put(learningActions.deleteLevel.deleteLevelSuccess(action.payload));
//   } catch (error) {
//     yield put(learningActions.deleteLevel.deleteLevelFailure(error));
//   }
// }
