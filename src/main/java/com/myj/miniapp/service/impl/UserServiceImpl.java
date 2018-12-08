package com.myj.miniapp.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.myj.miniapp.entity.UserInfo;
import com.myj.miniapp.mapper.UserMapper;
import com.myj.miniapp.service.UserServcie;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserServcie {

    @Autowired
    private UserMapper userMapper;

    @Override
    public List<UserInfo> listUserInfo() {
        return userMapper.listUserInfo();
    }

    @Override
    public void insertUserInfo(String userInfoStr, String nickName){
        UserInfo userInfo = JSON.parseObject(userInfoStr, UserInfo.class);
        if(StringUtils.isNotBlank(nickName)){
            userInfo.setNickName(nickName);
        }
        int updateCount = userMapper.updateUserInfo(userInfo);
        System.out.println("update count is " + updateCount);
        if(updateCount < 1){
            userMapper.insertUserInfo(userInfo);
        }
    }

    @Override
    public void insertUserInfo(String userInfoStr){
        insertUserInfo(userInfoStr, null);
    }
}
