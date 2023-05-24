import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Col, Modal, notification, Row, Table, Tooltip } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { deleteDocument, getDocumentsByClass } from 'redux/actions/documents';
import { examState$, documentState$ } from 'redux/selectors';
import AddFileDocument from '../AddFileDocument';

const { confirm } = Modal;

const ClassDocument = ({ classData }) => {
  const columns = [
    {
      title: 'Document name',
      dataIndex: 'docName',
    },
    {
      title: 'Posted date',
      dataIndex: 'postedDate',
      align: 'center',
      width: '15%',
    },
    {
      title: '',
      dataIndex: ['idDoc'],
      align: 'center',
      width: '10%',
      render: (idDoc, currentDoc) => {
        return (
          <div className="flex">
            <Tooltip title="Edit document">
              <Button
                type="primary"
                ghost
                icon={<EditOutlined />}
                onClick={() => {
                  setIsVisible(true);
                  const resDoc = documentList.find(document => document.idDoc === idDoc);
                  setSelectedDocument(resDoc);
                }}
              />
            </Tooltip>
            <Tooltip title="Delete document">
              <Button
                ghost
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(currentDoc)}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const [dataSourceDoc, setDataSourceDoc] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState();

  const { idClass } = useParams();
  const dispatch = useDispatch();
  const { data: examList, isLoading, isSuccess } = useSelector(examState$);
  const { data: documentList, isLoading: isDocLoading, isSuccess: isDocSuccess } = useSelector(documentState$);

  useEffect(() => {
    dispatch(getDocumentsByClass.getDocumentsByClassRequest(idClass));
  }, []);

  useEffect(() => {
    mappingDocData(documentList);
  }, [documentList]);

  const mappingDocData = documents => {
    const res = [];
    documents.map(document =>
      res.push({
        idDoc: document.idDoc,
        docName: document.docName,
        fileUrl: document.fileUrl,
        postedDate: moment(document.postedDate).format('DD/MM/YYYY'),
      })
    );
    setDataSourceDoc(res);
  };

  const handleDelete = document => {
    confirm({
      title: `Do you want to delete "${document.docName}"?`,
      icon: <ExclamationCircleOutlined />,
      centered: true,
      content: '',
      onOk() {
        dispatch(deleteDocument.deleteDocumentRequest(document.idDoc));

        isDocSuccess
          ? notification.success({
              message: 'Deleted successfully',
            })
          : notification.error({
              message: 'Failed to delete',
            });
      },
      onCancel() {},
    });
  };

  return (
    <Row gutter={[20, 20]}>
      <Col span={6}>
        <h3 className="heading">Class documents</h3>
      </Col>
      <Col flex="auto" />
      <Col span={6}>
        <Button
          block
          type="primary"
          size="large"
          onClick={() => {
            setSelectedDocument(null);
            setIsVisible(true);
          }}>
          Add document
        </Button>
      </Col>
      <Col span={24}>
        <Table
          bordered
          loading={isDocLoading}
          columns={columns}
          dataSource={dataSourceDoc}
          rowKey={row => row.idDoc}
        />
      </Col>
      <AddFileDocument
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        classData={classData}
        selectedDocument={selectedDocument}
      />
    </Row>
  );
};

export default ClassDocument;
