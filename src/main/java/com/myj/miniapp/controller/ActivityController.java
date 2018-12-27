package com.myj.miniapp.controller;

import com.alibaba.fastjson.JSONObject;
import com.myj.miniapp.entity.Activity;
import com.myj.miniapp.entity.UserInfo;
import com.myj.miniapp.exception.BaseException;
import com.myj.miniapp.service.ActivityService;
import com.myj.miniapp.util.TimeUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("activity")
public class ActivityController extends BaseController {

    private Logger logger = LoggerFactory.getLogger(ActivityController.class);

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
        String latitude = request.getParameter("latitude");
        String longitude = request.getParameter("longitude");


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
        if(StringUtils.isNotBlank(latitude) && StringUtils.isNotBlank(longitude)){
            activity.setLatitude(new BigDecimal(latitude));
            activity.setLongitude(new BigDecimal(longitude));
        }
        Long activityId = activityService.createActivity(activity);
        result.put("code", "200");
        result.put("msg", "success");
        result.put("activityId", activityId);
        return result;
    }


    @RequestMapping("/info")
    public JSONObject getActivity(HttpServletRequest request){
        long startTime = System.currentTimeMillis();
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
        long endTime = System.currentTimeMillis();
        logger.info("get activity info, cost {}ms", endTime - startTime);
        return result;
    }

    @RequestMapping("/list")
    public JSONObject getActivityList(HttpServletRequest request){
        JSONObject result = new JSONObject();
        String openId = getOpenId(request);
        String openGId = request.getParameter("openGId");
        long startTime = System.currentTimeMillis();
        List<Activity> myCreate = activityService.getMyCreateAcitity(openId);
        if(StringUtils.isNotBlank(openGId)){
            List<Activity> group = activityService.getGroupActivity(openGId);
            result.put("group", group);
        }
        List<Activity> myJoin = activityService.getMyJoinActivity(openId);
        long endTime = System.currentTimeMillis();
        logger.info("get activity list, cost {}ms", endTime - startTime);
        result.put("code", "200");
        result.put("msg", "success");
        result.put("myCreate", myCreate);
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
