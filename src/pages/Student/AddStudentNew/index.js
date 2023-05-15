import { Breadcrumb, Card, Col, Row, Space } from 'antd';
import ImageUploader from 'components/common/ImageUploader';
import PersonalInfo from 'components/Lecturer/PersonalInfo';
import StudentInfo from 'components/Student/StudentInfo';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const AddStudentNew = () => {
  const { idStudent } = useParams();
  const [imgUrl, setImgUrl] = useState('');

  return (
    <div>
      <Breadcrumb style={{ marginBottom: '20px' }}>
        <Breadcrumb.Item>
          <Link to="/">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/student">Student list</Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      {idStudent ? <h3>Edited student</h3> : <h3>Add new student</h3>}

      <Row gutter={[20, 20]}>
        <Col xs={24} xl={18}>
          {idStudent ? (
            <StudentInfo imgUrl={imgUrl} setImgUrl={setImgUrl} typeSubmit="edit" />
          ) : (
            <StudentInfo imgUrl={imgUrl} setImgUrl={setImgUrl} typeSubmit="create" />
          )}
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <Card>
            <h4>Avatar</h4>
            <ImageUploader onUploaded={setImgUrl} url={imgUrl} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddStudentNew;
