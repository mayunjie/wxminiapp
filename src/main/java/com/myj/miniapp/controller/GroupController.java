package com.myj.miniapp.controller;

import com.alibaba.fastjson.JSONObject;
import com.myj.miniapp.util.AESUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("group")
public class GroupController extends BaseController{

    /**
     * 关联群组和公告信息
     * @param request
     * @return
     */
    @RequestMapping("/id")
    public JSONObject getGroupId(HttpServletRequest request){
        JSONObject result = new JSONObject();
        String token = request.getHeader("token");
        String encryptedData = request.getParameter("encryptedData");
        String iv = request.getParameter("iv");

        String wxSessionKey = getSessionKey(token);
        //查询不到session
        if(StringUtils.isEmpty(wxSessionKey)){
            result.put("code", "500");
            result.put("msg", "session error");
            return result;
        }
        //解码获得群组信息
        try{
            String decrypt = AESUtils.decrypt(encryptedData, wxSessionKey, iv, "utf-8");
            if(StringUtils.isNotBlank(decrypt)){
                System.out.println("group info:" + decrypt);
                JSONObject group = JSONObject.parseObject(decrypt);
                result.put("openGId", group.get("openGId"));
                result.put("code", "200");
                result.put("msg", "success");
            }else{
                result.put("code", "500");
                result.put("msg", "decrypt encryptedData error, empty");
            }
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            result.put("code", "500");
            result.put("msg", "decrypt encryptedData error, exception");
        }
        return result;
    }
}
