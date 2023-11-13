import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import MyPage from "../pages/MyPage";
import Layout from "../layout/Layout";
import LoginPage from "../pages/LoginPage";
import BookRecommendPage from "../pages/BookRecommendPage";
import BookExchangePage from "../pages/BookExchangePage";
import MyProfileEditPage from "../pages/MyProfileEditPage";
import BookDetailPage from "../pages/BookDetailPage";
import SearchPage from "../pages/SearchPage";
import FollowerPage from "../pages/FollowerPage";
import FollowingPage from "../pages/FollowingPage";
import SignUpPage from "../pages/SignUpPage";
import DeclarationPage from "../pages/DeclarationPage";
import JournalsUploadPage from "../pages/JournalsPage";
import SearchListPage from "../pages/SearchListPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/follower" element={<FollowerPage />} />
        <Route path="/following" element={<FollowingPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/detail/:id" element={<BookDetailPage />} />
        <Route path="/edit" element={<MyProfileEditPage />} />
        <Route path="/recommend" element={<BookRecommendPage />} />
        <Route path="/journals" element={<JournalsUploadPage />} />
        <Route path="/exchange/:id" element={<BookExchangePage />} />
        <Route path="/declaration" element={<DeclarationPage/>} />
        <Route path="/exchange" element={<SearchListPage/>} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
