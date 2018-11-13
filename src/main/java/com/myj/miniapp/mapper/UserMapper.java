package com.myj.miniapp.mapper;

import com.myj.miniapp.entity.UserInfo;

import java.util.List;

public interface UserMapper {


    List<UserInfo> listUserInfo();

    int updateUserInfo(UserInfo userInfo);

    int insertUserInfo(UserInfo userInfo);
}
