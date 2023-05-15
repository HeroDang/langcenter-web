import { Button, Card, Col, DatePicker, Form, Input, notification, Row, Select } from 'antd';
import ProvincePicker from 'components/common/ProvincePicker';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
// Edit: Start
import * as lecturerActions from 'redux/actions/lecturers';
import * as studentActions from 'redux/actions/students';
// Edit: End
import { getUsers } from 'redux/actions/users';
import { lecturerState$, studentState$, usersState$ } from 'redux/selectors';
import { converToUser } from 'utils';
import { checkUsernameIsExist, loadFieldsValue } from 'utils/loadFieldsValueForUser';
import { dateValidator, phoneNumberValidator } from 'utils/validator';
import styles from './index.module.less';
import { idRoleLecturer } from 'constant/roles';

const { Option } = Select;

const StudentInfo = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isSubmit, setIsSubmit] = useState(false);
  const [city, setCity] = useState('');

  // Edit: Start
  const lecturers = useSelector(lecturerState$);
  const students = useSelector(studentState$);
  const users = useSelector(usersState$);
  // Edit: End
  
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not validate email!',
      number: '${label} is not a validate number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  const [form] = Form.useForm();
  const { typeSubmit } = props;
  const { idStudent } = useParams();
  const dateFormat = 'DD/MM/YYYY';

  const handleSubmit = () => {
    const data = form.getFieldValue();
    const {
      displayName,
      gender,
      dob,
      phoneNumber,
      email,
      detailsAddress,
      district,
      city,
      username,
      password,
      confirmPassword,
    } = data;
    
    data.imageUrl = props.imgUrl;

    const currentDate = moment();
    if (currentDate < dob) {
      notification.error({ message: 'Date of birth is not greater than current date' });
    } else {
      // require all input not empty
      if (
        displayName &&
        gender &&
        dob &&
        phoneNumber &&
        email &&
        username &&
        password &&
        confirmPassword &&
        detailsAddress &&
        district &&
        city
      ) {
        if (typeSubmit === 'create') {
          if (!checkUsernameIsExist(users, username)) {
            if (confirmPassword !== password) {
              setIsSubmit(true);
              notification.error({ message: 'Confirm password does not match!' });
            } else {
              const createdStudent = converToUser(data, null);
              dispatch(studentActions.createStudents.createStudentsRequest(createdStudent));
              setCity(city);
              setIsSubmit(true);
            }
          } else {
            setIsSubmit(true);
            isSubmit === true ? notification.error({ message: 'Username is exist!' }) : '';
          }
        }
      }

      // edit lecturer
      if (typeSubmit === 'edit') {
        const student = students.data.find(student => student.idStudent === idStudent);

        const editedValue = {
          ...data,
          idUser: student.idUser,
          username: student.User.username,
          password: student.User.password,
          imageUrl: props.imgUrl,
        };
        const editedStudent = converToUser(editedValue, null);
        dispatch(studentActions.updateStudents.updateStudentsRequest(editedStudent));
        setCity(city);
        setIsSubmit(true);
      }
    }
  };

  // Load information lecturer to form
  React.useEffect(() => {
    if (idStudent && students.data.length !== 0) {
      const student = students.data.find(student => student.idStudent === idStudent);
      loadFieldsValue(student, setCity, form, props.setImgUrl);
    }
  }, [students.data]);

  // Redirect to employee list
  React.useEffect(() => {
    if (students.isSuccess && isSubmit) {
      if (idStudent) {
        notification.success({ message: 'Update student success!' });
        history.push('/student');
      } else {
        notification.success({ message: 'Create student success!' });
      }
      form.resetFields();
      props.setImgUrl(null);
    }
  }, [students, history]);

  React.useEffect(() => {
    dispatch(lecturerActions.getLecturers.getLecturersRequest());
    // dispatch(getUsers.getUsersRequest());

    dispatch(studentActions.getStudents.getStudentsRequest());
  }, []);

  return (
    <Card>
      <h3>Student information</h3>
      <Form form={form} layout="vertical" validateMessages={validateMessages}>
        <Input.Group>
          <Row gutter={20}>
            <Col xs={24} md={24} xl={10} lg={12}>
              <Form.Item label="Full name" name="displayName" rules={[{ required: true }]}>
                <Input placeholder="Full name" maxLength="255" />
              </Form.Item>
            </Col>

            <Col xs={12} md={12} xl={4} lg={6}>
              <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
                <Select placeholder="Gender" className={styles.maxwidth}>
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Others</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12} md={12} xl={10} lg={6}>
              <Form.Item
                label="DOB"
                name="dob"
                rules={[{ required: true }, { validator: dateValidator }]}>
                <DatePicker format={dateFormat} className={styles.maxwidth} />
              </Form.Item>
            </Col>
            <Col xs={12} md={12} lg={12} xl={8}>
              <Form.Item
                onKeyPress={event => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                label="Phone number"
                name="phoneNumber"
                rules={[{ required: true }, { validator: phoneNumberValidator }]}>
                <Input type="text" placeholder="Phone number" minLength={10} maxLength={10} />
              </Form.Item>
            </Col>
            <Col xs={12} md={12} lg={12} xl={8}>
              <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                <Input type="email" placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>
        </Input.Group>
        <ProvincePicker city={city} form={form} />

        {!idStudent && (
          <Input.Group>
            <Row gutter={20}>
              <Col xs={24} lg={8}>
                <Form.Item label="Username" name="username" rules={[{ required: true }]}>
                  <Input placeholder="Username" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={8}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true }, { min: 6 }]}>
                  <Input.Password placeholder="Password" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={8}>
                <Form.Item
                  label="Confirm password"
                  name="confirmPassword"
                  rules={[{ required: true }, { min: 6 }]}>
                  <Input.Password placeholder="Confirm password" />
                </Form.Item>
              </Col>
            </Row>
          </Input.Group>
        )}

        <Form.Item>
          <Button onClick={handleSubmit} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default StudentInfo;
