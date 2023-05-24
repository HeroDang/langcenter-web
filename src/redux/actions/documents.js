import { createActions } from 'redux-actions';

export const getType = reduxAction => {
  return reduxAction().type;
};

export const getDocumentsByClass = createActions({
  getDocumentsByClassRequest: undefined,
  getDocumentsByClassSuccess: payload => payload,
  getDocumentsByClassFailure: error => error,
});

export const createDocument = createActions({
  createDocumentRequest: payload => payload,
  createDocumentSuccess: payload => payload,
  createDocumentFailure: error => error,
});

export const updateDocument = createActions({
  updateDocumentRequest: payload => payload,
  updateDocumentSuccess: payload => payload,
  updateDocumentFailure: error => error,
});

export const deleteDocument = createActions({
  deleteDocumentRequest: payload => payload,
  deleteDocumentSuccess: payload => payload,
  deleteDocumentFailure: error => error,
});
