package com.myj.miniapp.controller;

import com.alibaba.fastjson.JSONObject;
import com.myj.miniapp.entity.Activity;
import com.myj.miniapp.entity.Notice;
import com.myj.miniapp.service.ActivityService;
import com.myj.miniapp.util.TimeUtils;
import com.sun.xml.internal.rngom.parse.host.Base;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

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
        String comment = request.getParameter("comment");

        Activity activity = new Activity();
        activity.setOpenId(openId);
        activity.setNickName(nickName);
        activity.setTitle(title);
        activity.setActivityTime(generateTime(activityDay, activityHour));
        activity.setPosition(position);
        activity.setPhone(phone);
        activity.setRemark(comment);
        Long activityId = activityService.createActivity(activity);
        result.put("code", "200");
        result.put("msg", "success");
        result.put("activityId", activityId);
        return result;
    }


    @RequestMapping("/info")
    public JSONObject getActivity(Long activityId){
        JSONObject result = new JSONObject();
        Activity activity = activityService.getActivity(activityId);
        result.put("code", "200");
        result.put("msg", "success");
        result.put("activity", activity);
        return result;
    }

    public void getGroupActivity(){

    }

    public void getMyCreateActivity(HttpServletRequest request){
        String openId = getOpenId(request);

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
