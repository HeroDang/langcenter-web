import { createActions } from 'redux-actions';

export const getType = reduxAction => {
  return reduxAction().type;
};

export const getLearnings = createActions({
  getLearningsRequest: undefined,
  getLearningsSuccess: payload => payload,
  getLearningsFailure: error => error,
});

export const createLearning = createActions({
  createLearningRequest: payload => payload,
  createLearningSuccess: payload => payload,
  createLearningFailure: error => error,
});

export const updateLearning = createActions({
  updateLearningRequest: payload => payload,
  updateLearningSuccess: payload => payload,
  updateLearningFailure: error => error,
});

export const deleteLearning = createActions({
  deleteLearningRequest: payload => payload,
  deleteLearningSuccess: payload => payload,
  deleteLearningFailure: error => error,
});
