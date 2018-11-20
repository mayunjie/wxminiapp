package com.myj.miniapp.controller;

import com.alibaba.fastjson.JSONObject;
import com.myj.miniapp.entity.Session;
import com.myj.miniapp.exception.BaseException;
import com.myj.miniapp.service.SessionService;
import com.myj.miniapp.util.AESUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@Component
public class BaseController {

    @Autowired
    private SessionService sessionService;

    protected Session getSession(String token){
        if(StringUtils.isBlank(token)){
            return null;
        }
        return sessionService.getSession(token);
    }

    protected String getOpenId(String token){
        Session session = getSession(token);
        if(session == null){
            return StringUtils.EMPTY;
        }
        return session.getOpenId();
    }

    protected String getSessionKey(String token){
        Session session = getSession(token);
        if(session == null){
            return StringUtils.EMPTY;
        }
        return session.getSessionKey();
    }

    protected  String getOpenId(HttpServletRequest request){
        String token = request.getHeader("token");
        if(StringUtils.isBlank(token)){
            throw new BaseException("token empty");
        }
        String openId = getOpenId(token);
        if(StringUtils.isBlank(openId)){
            throw new BaseException("session error");
        }
        return openId;
    }

    protected String decrpyt(HttpServletRequest request){
        String token = request.getHeader("token");
        String encryptedData = request.getParameter("encryptedData");
        String iv = request.getParameter("iv");

        String wxSessionKey = getSessionKey(token);
        //查询不到session
        if(StringUtils.isEmpty(wxSessionKey)){
            throw new BaseException("session info error");
        }
        //解码获得群组信息
        try{
            String decrpyt =  AESUtils.decrypt(encryptedData, wxSessionKey, iv, "utf-8");
            if(StringUtils.isBlank(decrpyt)){
                throw new BaseException("decrpyt error");
            }
            return decrpyt;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new BaseException("decrpyt error");
        }
    }

}
