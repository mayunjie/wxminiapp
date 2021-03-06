package com.myj.miniapp.controller;

import com.alibaba.fastjson.JSONObject;
import com.myj.miniapp.entity.Session;
import com.myj.miniapp.exception.BaseException;
import com.myj.miniapp.service.SessionService;
import com.myj.miniapp.service.UserServcie;
import com.myj.miniapp.util.AESUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
public class UserController extends BaseController {

    private static Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private SessionService sessionService;

    @Autowired
    private UserServcie userServcie;

    @RequestMapping("/regist")
    public JSONObject registUser(HttpServletRequest request){
        JSONObject result = new JSONObject();
        String encryptedData = request.getParameter("encryptedData");
        String iv = request.getParameter("iv");
        String nickName = request.getParameter("nickName");
        String token = request.getHeader("token");
        String wxSessionKey = getSessionKey(token);
        //查询不到session
        if(StringUtils.isEmpty(wxSessionKey)){
            result.put("code", "500");
            result.put("msg", "session error");
            logger.info("regist user, session error");
            return result;
        }

        //通过解码encryptedData获得用户信息
        try{
            String decrypt = AESUtils.decrypt(encryptedData, wxSessionKey, iv, "utf-8");
            if(StringUtils.isNotBlank(decrypt)){
                logger.info("regist user, decrypt string: {}", decrypt);
                //新增用户信息,由于nickName中存在emoji表情，所以需要明文传输
                long startTime = System.currentTimeMillis();
                userServcie.insertUserInfo(decrypt, nickName);
                long endTime = System.currentTimeMillis();
                logger.info("regist user, cost {}ms", endTime - startTime);
                result.put("code", "200");
                result.put("msg", "success");
            }else{
                result.put("code", "500");
                result.put("msg", "decrypt encryptedData error, empty");
                logger.info("regist user, decrypt encryptedData error, empty");
            }
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            result.put("code", "500");
            result.put("msg", "decrypt encryptedData error, exception");
            logger.error("regist user, decrypt encryptedData error, exception:", e.getMessage());

        }
        return result;
    }
}
