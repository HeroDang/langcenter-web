import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  notification,
  Progress,
  Row,
  Select,
  Upload,
} from 'antd';
import { validateMessages } from 'constant/validationMessage';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { createDocument, updateDocument } from 'redux/actions/documents';
import { examState$, documentState$ } from 'redux/selectors';
import { storage } from 'utils/firebase';
import { v4 as uuidv4 } from 'uuid';
import styles from './index.module.less';

const AddFileDocument = ({ isVisible, setIsVisible, classData, selectedDocument }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [progress, setProgress] = useState(0);
  const { idClass } = useParams();
  const checkFileSize = file => {
    if (file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        notification.error({
          message: 'File(s) must be smaller than 2MB!',
        });
      }
      return isLt2M ? true : Upload.LIST_IGNORE;
    }
    return Upload.LIST_IGNORE;
  };

  const handleOnChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const removeUrl = url => {
    const res = fileUrls.filter(fileUrl => fileUrl.url !== url);
    setFileUrls(res);
  };

  const FileRendered = (url, index) => (
    <Row key={index} gutter={[20, 20]}>
      <Col span={22}>
        <a className={styles['text-url']} href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      </Col>
      <Col span={2}>
        <Button type="text" icon={<DeleteOutlined />} onClick={() => removeUrl(url)} />
      </Col>
    </Row>
  );

  const uploadFiles = options => {
    const { onSuccess, onError, file, onProgress } = options;
    if (!file) return;
    const fileName = `files/documents/${idClass}/${uuidv4()}${file.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        onProgress(prog);
        setProgress(prog);
        if (prog === 100) {
        }
      },
      error => {
        console.log(error);
        onError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          const tmp = [...fileUrls, { uid: file.uid, url: downloadURL }];
          setFileUrls(tmp);
        });
        onSuccess('Ok');
      }
    );
  };

  const dispatch = useDispatch();
  const { isLoading: isDocLoading, isSuccess: isDocSuccess } = useSelector(documentState$);
  const handleSubmit = () => {
    form.validateFields().then(values => {
      const { docName, postedDate } = values;
      const date = moment(postedDate).format('MM-DD-YYYY');
      const res = fileUrls.map(element => element.url);

      // check test date between start and end date
      const isValidDate = moment(postedDate).isSameOrAfter(classData.startDate, 'day');
      if (!isValidDate) {
        notification.warning({
          message: 'Invalid post date',
          description: `Post date must same or before starting date (${moment(
            classData.startDate
          ).format('DD/MM/YYYY')}).`,
        });
      } else {
        if (isEdit) {
          dispatch(
            updateDocument.updateDocumentRequest({
              idDoc: selectedDocument.idDoc,
              docName,
              fileUrl: res,
              postedDate: date,
              idClass
            })
          );
        } else {
          dispatch(
            createDocument.createDocumentRequest({
              docName,
              fileUrl: res,
              postedDate: moment().toDate(),
              idClass,
            })
          );
        }
        setIsCompleted(true);
        form.resetFields();
      }
    });
  };

  // load selected exam
  useEffect(() => {
    if (selectedDocument) {
      setIsEdit(true);
      const date = moment(selectedDocument.postedDate).format('DD/MM/YYYY');
      form.setFieldsValue({
        docName: selectedDocument.docName,
        postedDate: moment(date, 'DD/MM/YYYY'),
        file: selectedDocument.fileUrl,
      });
      if (selectedDocument.fileUrl.length > 0) {
        const tmp = [];
        selectedDocument.fileUrl.map(file => tmp.push({ url: file, uid: uuidv4() }));
        setFileUrls(tmp);
      }else{
        setFileUrls([]);
      }
    } else {
      setIsEdit(false);
      setFileUrls([]);
      form.resetFields();
    }
  }, [isVisible]);

  // handle message
  useEffect(() => {
    if (!isDocLoading && isCompleted) {
      isDocSuccess
        ? notification.success({
            message: `${isEdit ? 'Edited' : 'Added'} exam successfully`,
          })
        : notification.error({ message: 'There is an error' });
    }
    setIsCompleted(false);
    setIsVisible(false);
  }, [isDocLoading]);

  // init value for select options
  useEffect(() => {
    if (!classData && classData.idCourse) {
      return;
    }
    form.resetFields();
  }, []);

  return (
    <Modal
      centered
      visible={isVisible}
      title={isEdit ? 'Edit document' : 'Add document'}
      okText="Submit"
      cancelText="Cancel"
      onCancel={() => {
        setIsVisible(false);
        form.resetFields();
        setFileUrls([]);
        setFileList([]);
      }}
      onOk={handleSubmit}>
      <Form
        form={form}
        onFinish={handleSubmit}
        validateMessages={validateMessages}
        layout="vertical">
        <Form.Item name="docName" label="Document name" rules={[{ required: true }]}>
          <Input placeholder="Document name" maxLength="255" />
        </Form.Item>
        {isEdit && <Form.Item name="postedDate" label="Posted date" rules={[{ required: false }]}>
          <DatePicker allowClear={false} format={'DD/MM/YYYY'} />
        </Form.Item>}
        
        <Form.Item name="file" label="File">
          <Upload
            multiple={true}
            fileList={fileList}
            onChange={handleOnChange}
            showUploadList={false}
            beforeUpload={checkFileSize}
            customRequest={uploadFiles}>
            <Button block size="middle" icon={<UploadOutlined />}>
              Upload
            </Button>
          </Upload>
        </Form.Item>
        {progress === 0 || progress === 100 ? '' : <Progress percent={progress} />}
        {fileUrls.length > 0 ? fileUrls.map((file, index) => FileRendered(file.url, index)) : ''}
      </Form>
    </Modal>
  );
};

export default AddFileDocument;
