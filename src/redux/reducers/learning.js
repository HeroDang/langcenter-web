import INIT_STATE from 'redux/constant';
import { getType } from 'redux/actions/learnings';
import * as learningActions from 'redux/actions/learnings';

export default function learningsReducer(state = INIT_STATE.learnings, action) {
  switch (action.type) {
    //get
    case getType(learningActions.getLearnings.getLearningsRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(learningActions.getLearnings.getLearningsSuccess):
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isSuccess: true,
      };
    case getType(learningActions.getLearnings.getLearningsFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    // create
    case getType(learningActions.createLearning.createLearningRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(learningActions.createLearning.createLearningSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
        isLoading: false,
        isSuccess: true,
      };
    case getType(learningActions.createLearning.createLearningFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    //update
    // case getType(learningActions.updateLevel.updateLevelRequest):
    //   return {
    //     ...state,
    //     isLoading: true,
    //     isSuccess: false,
    //   };
    // case getType(learningActions.updateLevel.updateLevelSuccess):
    //   return {
    //     ...state,
    //     data: state.data.map(learning =>
    //         learning.idLevel === action.payload.idLevel ? action.payload : learning
    //     ),
    //     isLoading: false,
    //     isSuccess: true,
    //   };
    // case getType(learningActions.updateLevel.updateLevelFailure):
    //   return {
    //     ...state,
    //     isLoading: false,
    //     isSuccess: false,
    //   };
    // // delete
    // case getType(learningActions.deleteLevel.deleteLevelRequest):
    //   return {
    //     ...state,
    //     isLoading: true,
    //     isSuccess: false,
    //   };
    // case getType(learningActions.deleteLevel.deleteLevelSuccess):
    //   return {
    //     ...state,
    //     data: state.data.filter(learning => learning.idLevel !== action.payload),
    //     isLoading: false,
    //     isSuccess: true,
    //   };
    // case getType(learningActions.deleteLevel.deleteLevelFailure):
    //   return {
    //     ...state,
    //     isLoading: false,
    //     isSuccess: false,
    //   };
    default:
      return state;
  }
}
