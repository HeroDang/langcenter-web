import { call, put } from 'redux-saga/effects';
// import examApi from 'api/examApi';
import documentApi from 'api/documentApi';
import * as documentActions from 'redux/actions/documents';
import { takeLatest } from 'redux-saga/effects';

export function* documentSaga() {
  yield takeLatest(documentActions.getDocumentsByClass.getDocumentsByClassRequest, fetchDocumentsByClassSaga);
  yield takeLatest(documentActions.createDocument.createDocumentRequest, createDocumentSaga);
  yield takeLatest(documentActions.updateDocument.updateDocumentRequest, updateDocumentSaga);
  yield takeLatest(documentActions.deleteDocument.deleteDocumentRequest, deleteDocumentSaga);
}

export function* fetchDocumentsByClassSaga(action) {
  try {
    const documents = yield call(documentApi.getByClass, action.payload);

    yield put(documentActions.getDocumentsByClass.getDocumentsByClassSuccess(documents));
  } catch (error) {
    yield put(documentActions.getDocumentsByClass.getDocumentsByClassFailure(error));
  }
}

export function* createDocumentSaga(action) {
  try {
    const newDocument = yield call(documentApi.create, action.payload);

    yield put(documentActions.createDocument.createDocumentSuccess(newDocument));
  } catch (error) {
    yield put(documentActions.createDocument.createDocumentFailure(error));
  }
}

export function* updateDocumentSaga(action) {
  try {
    const updatedDocument = yield call(documentApi.update, action.payload);

    yield put(documentActions.updateDocument.updateDocumentSuccess(updatedDocument));
  } catch (error) {
    yield put(documentActions.updateDocument.updateDocumentFailure(error));
  }
}

export function* deleteDocumentSaga(action) {
  try {
    yield call(documentApi.delete, action.payload);

    yield put(documentActions.deleteDocument.deleteDocumentSuccess(action.payload));
  } catch (error) {
    yield put(documentActions.deleteDocument.deleteDocumentFailure(error));
  }
}
