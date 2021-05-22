/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import ChatView from 'src/views/chat/';
import ContactForm from 'src/views/contact/Contact';
import DashboardView from 'src/views/reports/DashboardView';
import HomeView from 'src/views/home/HomeView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import About from 'src/views/aboutus/About';
import LoginView from 'src/views/auth/LoginView';
import AdminLoginView from 'src/views/auth/AdminLoginView';
import SettingsView from 'src/views/settings/SettingsView';
import NewQuiz from 'src/views/product/ProductListView/newQuiz';
import Collections from 'src/views/collection';
import GamePanel from 'src/views/game';
import VerifyForm from 'src/views/auth/VerifyForm';
import ClassView from 'src/views/classes';
import EditCollection from 'src/views/collection/edit';
import EditClass from 'src/views/classes/edit';
import AuthProtect from 'src/components/AuthProtect';
import StudentHome from 'src/views/student/quiz';
import Membership from 'src/views/membership';
import MembershipStu from 'src/views/student/membership';
import CustomerListView from 'src/views/customer/CustomerListView';
import TransactionListView from 'src/views/transaction/TransactionListView';
import ContactListView from 'src/views/contactData/ContactListView';
import QuizLayout from './layouts/QuizLayout';
import QuizLayoutStu from './layouts/QuizLayoutStu';
import AdminLayout from './layouts/AdminLayout';
import OnlyHeaderLayout from './layouts/OnlyHeaderLayout';
import ClassLayout from './layouts/ClassLayout';
import StudentLayout from './layouts/StudentLayout';
// import StoreContext from 'src/context/index';

// const { store } = React.useContext(StoreContext);

const routes = [
  {
    path: 'game',
    element: null,
    children: [
      { path: 'play', element: <GamePanel /> },
    ]
  },
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> }, // security selected
      { path: 'chat', element: <ChatView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/app/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'home', element: <HomeView /> },
      { path: 'signup', element: <RegisterView /> },
      { path: 'signin', element: <LoginView /> },
      { path: 'contact', element: <ContactForm /> },
      { path: 'verifyemail', element: <VerifyForm /> },
      { path: 'about', element: <About /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <HomeView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'teacher',
    element: <DashboardLayout />,
    children: [
      {
        path: 'home', element: <ProductListView /> // security selected
      },
      { path: 'account', element: <AccountView /> }, // security selected
      { path: 'signup', element: <RegisterView /> },
      { path: 'collections', element: <Collections /> }, // security selected
      { path: 'class', element: <ClassView /> }, // security selected
      { path: 'contact', element: <ContactForm /> },
      { path: 'membership', element: <Membership /> }, // security selected
      { path: 'signin', element: <LoginView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <HomeView /> },
      { path: '*', element: <Navigate to="/teacher/404" /> }
    ]
  },
  {
    path: 'teacher',
    element: <QuizLayout />,
    children: [
      { path: 'new', element: <NewQuiz /> }, // security selected
      { path: 'signup', element: <RegisterView /> },
      { path: 'signin', element: <LoginView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <HomeView /> },
      { path: '*', element: <Navigate to="/teacher/404" /> }
    ]
  },
  {
    path: 'collection',
    element: <OnlyHeaderLayout />,
    guard: AuthProtect,
    children: [
      { path: 'edit', element: <EditCollection /> }, // security selected
      { path: 'signup', element: <RegisterView /> },
      { path: 'signin', element: <LoginView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <HomeView /> },
      { path: '*', element: <Navigate to="/collection/404" /> }
    ]
  },
  {
    path: 'class',
    element: <ClassLayout />,
    guard: AuthProtect,
    children: [
      { path: 'edit', element: <EditClass /> }, // security selected
      { path: 'signup', element: <RegisterView /> },
      { path: 'signin', element: <LoginView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <HomeView /> },
      { path: '*', element: <Navigate to="/class/404" /> }
    ]
  },
  {
    path: 'student',
    element: <StudentLayout />,
    children: [
      { path: 'account', element: <AccountView /> }, // security selected
      { path: 'home', element: <StudentHome /> }, // security selected
      { path: 'chat', element: <ChatView /> }, // security selected
      { path: 'class', element: <ClassView /> }, // security selected
      { path: 'membership', element: <MembershipStu /> }, // security selected
      { path: 'edit', element: <EditClass /> }, // security selected
      { path: 'contact', element: <ContactForm /> },
      { path: 'signin', element: <LoginView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <StudentHome /> },
      { path: '*', element: <Navigate to="/student/404" /> }
    ]
  },
  {
    path: 'student',
    element: <QuizLayoutStu />,
    children: [
      { path: 'new', element: <NewQuiz /> }, // security selected
      { path: 'signup', element: <RegisterView /> },
      { path: 'signin', element: <LoginView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <HomeView /> },
      { path: '*', element: <Navigate to="/teacher/404" /> }
    ]
  },
  {
    path: 'admin',
    element: <AdminLayout />,
    children: [
      { path: '/', element: <DashboardView /> },
      { path: 'main', element: <DashboardView /> },
      { path: 'users', element: <CustomerListView /> },
      { path: 'transaction_history', element: <TransactionListView /> },
      { path: 'contact', element: <ContactListView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '*', element: <Navigate to="/teacher/404" /> }
    ]
  },
  {
    path: 'admin',
    children: [
      { path: 'signin', element: <AdminLoginView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
