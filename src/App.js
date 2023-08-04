import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import NotFound from './Pages/NotFound/NotFound';
import Header from './Components/Header/Header';
import RequireAuth from './Components/PrivateRoute/RequireAuth';
import PostDetails from './Pages/PostDetails/PostDetails';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        ></Route>
        <Route
          path='/post/:postId'
          element={
            <RequireAuth>
              <PostDetails />
            </RequireAuth>
          }
        ></Route>
        <Route path='register' element={<Register />}></Route>
        <Route path='login' element={<Login />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
