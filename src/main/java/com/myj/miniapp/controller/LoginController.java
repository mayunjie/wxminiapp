package com.myj.miniapp.controller;

import com.alibaba.fastjson.JSONObject;
import com.myj.miniapp.service.SessionService;
import com.myj.miniapp.service.UserServcie;
import com.myj.miniapp.service.WxManageService;
import com.myj.miniapp.util.AESUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping("/login")
public class LoginController {

    private static Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private WxManageService wxManageService;

    @Autowired
    private SessionService sessionService;

    //通过微信登录
    @RequestMapping("/wx_login")
    public JSONObject wxLogin(String code, String encryptedData, String iv){
        JSONObject result = new JSONObject();
        //通过code去微信服务器请求openid和sessionkey
        Long starTtime = System.currentTimeMillis();
        Map<String, Object> wxSession = wxManageService.getWxSession(code);
        Long wxTime = System.currentTimeMillis();
        logger.info("get wx session，cost {}ms",  wxTime- starTtime);
        if(wxSession == null){
            result.put("code", "500");
            result.put("msg", "get weixin session error");
            logger.error("wxSession error, null session");
            return result;
        }

        if(wxSession.containsKey("errcode")){
            result.put("code", "500");
            result.put("msg", wxSession.get("errcode"));
            logger.error("wxSession error, errcode:{}", wxSession.get("errcode"));
            return result;
        }
        String wxOpenId = String.valueOf(wxSession.get("openid"));
        String wxSessionKey = String.valueOf(wxSession.get("session_key"));

        //创建第三方session
        String token = sessionService.createThirdSession(wxSessionKey, wxOpenId);
        result.put("code", "200");
        result.put("msg", "success");
        result.put("token", token);
        Long endTime = System.currentTimeMillis();
        logger.info("create session success, token:{}, cost {}ms", token, endTime - starTtime);
        return result;
    }
}
