package com.myj.miniapp.service;

import com.myj.miniapp.entity.UserInfo;

import java.util.List;

public interface UserServcie {

    List<UserInfo> listUserInfo();

    void insertUserInfo(String userInfoStr);
}
