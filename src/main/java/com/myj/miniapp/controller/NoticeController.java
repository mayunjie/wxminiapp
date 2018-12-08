package com.myj.miniapp.controller;

import com.alibaba.fastjson.JSONObject;
import com.myj.miniapp.entity.Notice;
import com.myj.miniapp.exception.BaseException;
import com.myj.miniapp.service.NoticeService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("notice")
public class NoticeController extends BaseController {

    @Autowired
    private NoticeService noticeService;

    @RequestMapping("/info")
    public JSONObject getNotice(Long noticeId){
        JSONObject result = new JSONObject();
        Notice notice = noticeService.getNotice(noticeId);
        result.put("code", "200");
        result.put("msg", "success");
        result.put("notice", notice);
        return result;
    }

    @RequestMapping("/create")
    public JSONObject createNotice(HttpServletRequest request){
        JSONObject result = new JSONObject();

        String nickName = request.getParameter("nickName");
        String title = request.getParameter("title");
        String content = request.getParameter("content");

        String token = request.getHeader("token");
        String openId = getOpenId(token);
        //查询不到session
        if(StringUtils.isEmpty(openId)){
            result.put("code", "500");
            result.put("msg", "session error");
            return result;
        }

        Notice notice = new Notice();
        notice.setOpenId(openId);
        notice.setNickName(nickName);
        notice.setTitle(title);
        notice.setContent(content);
        Long id = noticeService.createNotice(notice);

        result.put("code", "200");
        result.put("msg", "success");
        result.put("noticeId", id);
        return result;
    }

    @RequestMapping("/relate/group")
    public JSONObject relateGroup(HttpServletRequest request){
        JSONObject result = new JSONObject();
        Long noticeId = Long.parseLong(request.getParameter("noticeId"));
        try{
            JSONObject groupObject = JSONObject.parseObject(decrpyt(request));
            String openGId = String.valueOf(groupObject.get("openGId"));
            noticeService.relateGroup(openGId, noticeId);
            result.put("code", "200");
            result.put("msg", "success");
        }catch (BaseException e){
            e.printStackTrace();
            result.put("code", "500");
            result.put("msg", e.getMessage());
        }catch (Exception e){
            e.printStackTrace();
            result.put("code", "500");
            result.put("msg", "服务器错误");
        }
        return result;
    }

    @RequestMapping("/list")
    public JSONObject getList(HttpServletRequest request){
        JSONObject result = new JSONObject();
        String openId =getOpenId(request);
        List<Notice> myCreateList = noticeService.getMyCreateNotice(openId);
        result.put("myCreateList", myCreateList);
        String openGId = request.getParameter("openGId");
        if(StringUtils.isNotBlank(openGId)){
            List<Notice> groupList = noticeService.getGroupNotice(openGId);
            result.put("groupList", groupList);
        }
        result.put("code", "200");
        result.put("msg", "success");
        return result;
    }

}
