package com.myj.miniapp.controller;

import com.alibaba.fastjson.JSONObject;
import com.myj.miniapp.entity.Activity;
import com.myj.miniapp.entity.UserInfo;
import com.myj.miniapp.exception.BaseException;
import com.myj.miniapp.service.ActivityService;
import com.myj.miniapp.util.TimeUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("activity")
public class ActivityController extends BaseController {

    @Autowired
    private ActivityService activityService;

    @RequestMapping("/create")
    public JSONObject createActivity(HttpServletRequest request){
        JSONObject result = new JSONObject();
        String openId = getOpenId(request);
        String title = request.getParameter("title");
        String activityDay = request.getParameter("activityDay");
        String activityHour = request.getParameter("activityHour");
        String position = request.getParameter("position");
        String nickName = request.getParameter("nickName");
        String phone = request.getParameter("phone");
        String remark = request.getParameter("remark");
        String limitNumber = request.getParameter("limitNumber");

        Activity activity = new Activity();
        activity.setOpenId(openId);
        activity.setNickName(nickName);
        activity.setTitle(title);
        activity.setActivityTime(generateTime(activityDay, activityHour));
        activity.setPosition(position);
        activity.setPhone(phone);
        activity.setRemark(remark);
        if(StringUtils.isNumeric(limitNumber)){
            activity.setLimitNumber(Integer.parseInt(limitNumber));
        }
        Long activityId = activityService.createActivity(activity);
        result.put("code", "200");
        result.put("msg", "success");
        result.put("activityId", activityId);
        return result;
    }


    @RequestMapping("/info")
    public JSONObject getActivity(HttpServletRequest request){
        JSONObject result = new JSONObject();
        String openId = getOpenId(request);
        Long activityId = Long.parseLong(request.getParameter("activityId"));
        Activity activity = activityService.getActivity(activityId);
        //查询当前用户的报名信息
        Integer enrollType = activityService.getEnrolledType(openId, activityId);
        //查询当前活动的报名人员和请假人员
        List<UserInfo> enrollList = activityService.getEnrolledInfo(activityId, 1);
        List<UserInfo> leaveList = activityService.getEnrolledInfo(activityId, 2);
        result.put("code", "200");
        result.put("msg", "success");
        result.put("activity", activity);
        result.put("enrollType", enrollType);
        result.put("enrollList", enrollList);
        result.put("leaveList", leaveList);
        return result;
    }

    @RequestMapping("/list")
    public JSONObject getActivityList(HttpServletRequest request){
        JSONObject result = new JSONObject();
        String openId = getOpenId(request);
        String openGId = request.getParameter("openGId");
        List<Activity> myCreate = activityService.getMyCreateAcitity(openId);
        List<Activity> group = null;
        if(StringUtils.isNotBlank(openGId)){
            group = activityService.getGroupActivity(openGId);
        }
        List<Activity> myJoin = activityService.getMyJoinActivity(openId);
        result.put("code", "200");
        result.put("msg", "success");
        result.put("myCreate", myCreate);
        result.put("group", group);
        result.put("myJoin", myJoin);
        return result;
    }

    @RequestMapping("enroll")
    public JSONObject enroll(HttpServletRequest request){
        JSONObject result = new JSONObject();
        String openId = getOpenId(request);
        Long activityId = Long.parseLong(request.getParameter("activityId"));
        Integer enrollType  = Integer.parseInt(request.getParameter("enrollType"));
        activityService.enroll(openId, activityId, enrollType);
        List<UserInfo> enrollList = activityService.getEnrolledInfo(activityId, 1);
        List<UserInfo> leaveList = activityService.getEnrolledInfo(activityId, 2);
        result.put("code", "200");
        result.put("msg", "success");
        result.put("enrollType", enrollType);
        result.put("enrollList", enrollList);
        result.put("leaveList", leaveList);
        return  result;

    }

    @RequestMapping("/relate/group")
    public JSONObject relateGroup(HttpServletRequest request){
        JSONObject result = new JSONObject();
        Long activityId = Long.parseLong(request.getParameter("activityId"));
        try{
            JSONObject groupObject = JSONObject.parseObject(decrpyt(request));
            String openGId = String.valueOf(groupObject.get("openGId"));
            activityService.relateGroup(activityId, openGId);
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

    /**
     * 转换时间
     * @param day
     * @param hour
     * @return
     */
    private Date generateTime(String day, String hour){
        if(StringUtils.isBlank(day) || StringUtils.isBlank(hour)){
            return null;
        }
        String timeStr = day + " " + hour;
        return TimeUtils.stringToDate(timeStr, TimeUtils.HOUR_FORMAT);
    }

}
