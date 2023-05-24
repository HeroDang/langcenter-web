import INIT_STATE from 'redux/constant';
import { getType } from 'redux/actions/documents';
// import * as documentActions from 'redux/actions/documents';
import * as documentActions from 'redux/actions/documents';

export default function documentsReducer(state = INIT_STATE.documents, action) {
  switch (action.type) {
    //get
    case getType(documentActions.getDocumentsByClass.getDocumentsByClassRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(documentActions.getDocumentsByClass.getDocumentsByClassSuccess):
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isSuccess: true,
      };
    case getType(documentActions.getDocumentsByClass.getDocumentsByClassFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    // create
    case getType(documentActions.createDocument.createDocumentRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(documentActions.createDocument.createDocumentSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
        isLoading: false,
        isSuccess: true,
      };
    case getType(documentActions.createDocument.createDocumentFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    //update
    case getType(documentActions.updateDocument.updateDocumentRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(documentActions.updateDocument.updateDocumentSuccess):
      return {
        ...state,
        data: state.data.map(document =>
          document.idDoc === action.payload.idDoc ? action.payload : document
        ),
        isLoading: false,
        isSuccess: true,
      };
    case getType(documentActions.updateDocument.updateDocumentFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    // delete
    case getType(documentActions.deleteDocument.deleteDocumentRequest):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case getType(documentActions.deleteDocument.deleteDocumentSuccess):
      return {
        ...state,
        data: state.data.filter(document => document.idDoc !== action.payload),
        isLoading: false,
        isSuccess: true,
      };
    case getType(documentActions.deleteDocument.deleteDocumentFailure):
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    default:
      return state;
  }
}
