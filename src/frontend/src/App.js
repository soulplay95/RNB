import React from 'react';
import RecMain from './components/rec_main/RecMain';
import FindPeople from './components/FindPeople/FindPeople';
import Search from './components/Search/Search';
import MyPage from './components/MyPage/MyPage';
import Login from './components/User/Login';
import Main from './components/Main/Main';
import FindPeopleDetail from './components/FindPeople/FindPeopleDetail';
import FindPeopleAdd from './components/FindPeople/FindPeopleAdd';
import Join from './components/User/Join'
import { BrowserRouter, Route } from 'react-router-dom';

const App = () => {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Main} />
        <Route path="/recmain" component={RecMain} />
        <Route path="/findpeople" component={FindPeople} />
        <Route path="/search" component={Search} />
        <Route path="/mypage" component={MyPage} />
        <Route path="/login" component={Login} />
        <Route path="/findpeopledetail/:id" component={FindPeopleDetail} />
        <Route path="/findpeopleadd" component={FindPeopleAdd} />
        <Route path="/join" component={Join} />
      </BrowserRouter>
    );
}

export default App;
