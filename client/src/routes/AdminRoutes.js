import Icon from '@ant-design/icons';
import Class from 'pages/Class';
import AddClass from 'pages/Class/AddClass';
import Course from 'pages/Course';
import AddCourse from 'pages/Course/AddCourse';
import CourseType from 'pages/Course/CourseType';
import Level from 'pages/Course/Level';
import Dashboard from 'pages/Dashboard';
import Employee from 'pages/Employee';
import AddEmployee from 'pages/Employee/AddEmployee';
import Lecturer from 'pages/Lecturer';
import AddLecturer from 'pages/Lecturer/AddLecturer';
import React from 'react';
import { classSvg, courseSvg, dashboardSvg, employeeSvg, lecturerSvg } from 'utils/iconsvg';

const DashboardIcon = props => <Icon component={dashboardSvg} {...props} />;
const LecturerIcon = props => <Icon component={lecturerSvg} {...props} />;
const CourseIcon = props => <Icon component={courseSvg} {...props} />;
const EmployeeIcon = props => <Icon component={employeeSvg} {...props} />;
const ClassIcon = props => <Icon component={classSvg} {...props} />;

const adminRoutes = [
  {
    path: '/',
    exact: true,
    page: () => <Dashboard />,
  },
  {
    path: '/lecturer/',
    exact: true,
    page: () => <Lecturer />,
  },
  {
    path: '/lecturer/add',
    exact: true,
    page: () => <AddLecturer />,
  },
  {
    path: '/course/',
    exact: true,
    page: () => <Course />,
  },
  {
    path: '/course/add',
    exact: true,
    page: () => <AddCourse />,
  },
  {
    path: '/course/add/:idCourse',
    exact: true,
    page: () => <AddCourse />,
  },
  {
    path: '/coursetype/',
    exact: true,
    page: () => <CourseType />,
  },
  {
    path: '/coursetype/:idCourseType',
    exact: true,
    page: () => <CourseType />,
  },
  {
    path: '/level/',
    exact: true,
    page: () => <Level />,
  },
  {
    path: '/level/:idLevel',
    exact: true,
    page: () => <Level />,
  },
  {
    path: '/employee/',
    exact: true,
    page: () => <Employee />,
  },
  {
    path: '/employee/add',
    exact: true,
    page: () => <AddEmployee />,
  },
  {
    path: '/class/',
    exact: true,
    page: () => <Class />,
  },
  {
    path: '/class/add',
    exact: true,
    page: () => <AddClass />,
  },
  {
    path: '/class/add/:idClass',
    exact: true,
    page: () => <AddClass />,
  },
];

const adminMenuItems = {
  path: '/',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      icon: <DashboardIcon />,
      component: <Dashboard />,
    },
    {
      name: 'Lecturer',
      icon: <LecturerIcon />,
      routes: [
        {
          path: '/lecturer/',
          name: 'Lecturer list',
          component: <Lecturer />,
        },
        {
          path: '/lecturer/add',
          name: 'Add lecturer',
          component: <AddLecturer />,
        },
      ],
    },
    {
      name: 'Course',
      icon: <CourseIcon />,
      routes: [
        {
          path: '/course/',
          name: 'Course list',
          component: <Course />,
        },
        {
          path: '/course/add',
          name: 'Add course',
          component: <AddCourse />,
        },
        {
          path: '/coursetype/',
          name: 'Course type',
          component: <CourseType />,
        },
        {
          path: '/level/',
          name: 'Level',
          component: <Level />,
        },
      ],
    },
    {
      name: 'Employee',
      icon: <EmployeeIcon />,
      routes: [
        {
          path: '/employee/',
          name: 'Employee list',
          component: <Employee />,
        },
        {
          path: '/employee/add',
          name: 'Add Employee',
          component: <AddEmployee />,
        },
      ],
    },
    {
      name: 'Class',
      icon: <ClassIcon />,
      routes: [
        {
          path: '/class/',
          name: 'Class list',
          component: <Class />,
        },
      ],
    },
  ],
};
export { adminRoutes, adminMenuItems };
