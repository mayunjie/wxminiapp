package com.myj.miniapp.service.impl;

import com.myj.miniapp.entity.Activity;
import com.myj.miniapp.entity.ActivityEnroll;
import com.myj.miniapp.entity.ActivityInGroup;
import com.myj.miniapp.entity.UserInfo;
import com.myj.miniapp.mapper.ActivityMapper;
import com.myj.miniapp.service.ActivityService;
import com.myj.miniapp.util.TimeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ActivityServiceImpl implements ActivityService {

    @Autowired
    private ActivityMapper activityMapper;

    @Override
    public Long createActivity(Activity activity){
        activityMapper.insertActivity(activity);
        return activity.getId();
    }

    @Override
    public Activity getActivity(Long id){
        Activity activity =  activityMapper.getActivityById(id);
        activity.setDay(getDay(activity.getActivityTime()));
        activity.setHour(getHour(activity.getActivityTime()));
        return activity;
    }


    @Override
    public List<Activity> getMyCreateAcitity(String openId){
        List<Activity> activityList = activityMapper.getMyCreateActivity(openId);
        for(Activity activity : activityList){
            activity.setDay(getDay(activity.getActivityTime()));
            activity.setHour(getHour(activity.getActivityTime()));
        }
        return activityList;
    }

    @Override
    public List<Activity> getGroupActivity(String openGId){
        List<Activity> activityList = activityMapper.getGroupActivity(openGId);
        for(Activity activity : activityList){
            activity.setDay(getDay(activity.getActivityTime()));
            activity.setHour(getHour(activity.getActivityTime()));
        }
        return activityList;
    }

    @Override
    public List<Activity> getMyJoinActivity(String openId){
        List<Activity> activityList = activityMapper.getMyJoinActivity(openId);
        for(Activity activity : activityList){
            activity.setDay(getDay(activity.getActivityTime()));
            activity.setHour(getHour(activity.getActivityTime()));
        }
        return activityList;
    }

    @Override
    public void enroll(String openId, Long activityId, Integer type){
        ActivityEnroll enroll = new ActivityEnroll();
        enroll.setActivityId(activityId);
        enroll.setOpenId(openId);
        enroll.setType(type);
        activityMapper.insertEnroll(enroll);
    }

    @Override
    public List<UserInfo> getEnrolledInfo(Long activityId, Integer type){
        Map<String, Object> param = new HashMap<>();
        param.put("activityId", activityId);
        param.put("type", type);
        return activityMapper.getEnrolledUserInfo(param);
    }

    @Override
    public Integer getEnrolledType(String openId, Long activityId){
        Map<String, Object> param = new HashMap<>();
        param.put("activityId", activityId);
        param.put("openId", openId);
        return activityMapper.getEnrollType(param);
    }

    @Override
    public void relateGroup(Long activityId, String openGId){
        ActivityInGroup activityInGroup = new ActivityInGroup();
        activityInGroup.setActivityId(activityId);
        activityInGroup.setOpenGId(openGId);
        activityMapper.insertActivityInGroup(activityInGroup);
    }

    private String getDay(Date activityTime){
        return TimeUtils.convertDate(activityTime, TimeUtils.UNTIL_DAY);
    }

    private String getHour(Date activityTime){
        return TimeUtils.convertDate(activityTime, TimeUtils.UNTIL_HOUR);
    }
}
