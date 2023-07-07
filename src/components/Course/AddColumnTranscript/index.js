import { Button, Col, Form, Input, InputNumber, notification,Select, Row } from 'antd';
import { validateMessages } from 'constant/validationMessage';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { createColumnTranscript, updateColumnTranscript } from 'redux/actions/columnTranscripts';
import { columnTranscriptState$, courseTypeState$ } from 'redux/selectors';


const { Option } = Select;
const AddColumnTranscript = ({ trigger, idColumn }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { data: columnTranscripts, isSuccess } = useSelector(columnTranscriptState$);
  const { data: courseTypeList } = useSelector(courseTypeState$);
  // const { idColumn } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const history = useHistory();

  const [min, setMin] = useState();
  const [max, setMax] = useState(Math.max());

  useEffect(() => {
    if (idColumn) {
      setIsEdit(true);
      const columnTranscript = columnTranscripts.find(
        columnTranscript => columnTranscript.idColumn === idColumn
      );

      console.log("columnTranscript : " + columnTranscript)

      const courseType = courseTypeList.find(
        courseType => columnTranscript.idCourseType === courseType.idCourseType
      );

      form.setFieldsValue({
        columnName: columnTranscript.columnName,
        min: columnTranscript.min,
        max: columnTranscript.max,
        typeName: courseType.typeName,
      });
    }
  }, [idColumn, trigger]);

  const handleSubmit = () => {
    const { columnName, min, max, typeName } = form.getFieldValue();

    const courseType = courseTypeList.find(
      courseType => courseType.typeName === typeName
    );

    if (columnName) {
      if (isEdit) {
        dispatch(
          updateColumnTranscript.updateColumnTranscriptRequest({
            idColumn: idColumn,
            columnName: columnName,
            min: min,
            max: max,
            idCourseType: courseType.idCourseType,
          })
        );
      } else {
        dispatch(
          createColumnTranscript.createColumnTranscriptRequest({
            columnName: columnName,
            min: min,
            max: max,
            idCourseType: courseType.idCourseType,
          })
        );
      }
      if (isSuccess) {
        notification.success({
          message: isEdit ? 'Updated successfully' : 'Add column successfully',
        });
        isEdit ? history.push('/columntranscript/') : '';
      } else {
        notification.error({
          message: 'Error',
        });
      }
      form.resetFields();
    }
  };

  const handleReset = () => {
    form.resetFields();
    if (isEdit) {
      history.push('/columntranscript/');
    }
  };

  const uniqueValidator = (rule, value, callback) => {
    try {
      const { columnName, min, max, typeName } = form.getFieldValue();

      const courseType = courseTypeList.find(
        courseType => courseType.typeName === typeName
      );

      const res = columnTranscripts.find(
        column => column.columnName === columnName && column.min === min && column.max === max && column.idCourseType === courseType.idCourseType
      );
      if (res) {
        callback('');
        notification.error({ message: 'Column must be unique' });
      } else {
        callback();
      }
    } catch {
      callback();
    }
  };
  return (
    <>
      <h3>{isEdit ? 'Update column' : 'Add column'}</h3>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        validateMessages={validateMessages}>
        <Row gutter={[20, 0]}>
          <Col span={24}>
            <Form.Item
              label="Column name"
              name="columnName"
              rules={[{ required: true },{ validator: uniqueValidator }]}>
              <Input placeholder="Column name" maxLength="255" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Course type name"
              name="typeName"
              rules={[{ required: true },{ validator: uniqueValidator }]}
              >
            <Select showSearch >
              {courseTypeList.map((type, index) => (
                <Option key={index} value={type.typeName}>
                  {type.typeName}
                </Option>
              ))}
            </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Min"
              name="min"
              rules={[{ required: true },{ validator: uniqueValidator }]}>
              <InputNumber
                min={0}
                max={max - 1}
                placeholder="Min"
                style={{ minWidth: '100%' }}
                onChange={e => setMin(e)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Max"
              name="max"
              rules={[{ required: true },{ validator: uniqueValidator }]}>
              <InputNumber
                min={0 || min + 1}
                placeholder="Max"
                style={{ minWidth: '100%' }}
                onChange={e => setMax(e)}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <div className="flex">
                <Button htmlType="submit" block type="primary" size="large">
                  {isEdit ? 'Update' : 'Add'}
                </Button>
                <Button htmlType="reset" size="large" onClick={handleReset}>
                  Cancel
                </Button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default AddColumnTranscript;
