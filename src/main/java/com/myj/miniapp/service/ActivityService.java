package com.myj.miniapp.service;

import com.myj.miniapp.entity.Activity;
import com.myj.miniapp.entity.UserInfo;

import java.util.List;

public interface ActivityService {
    Long createActivity(Activity activity);

    Activity getActivity(Long id);

    List<Activity> getMyCreateAcitity(String openId);

    List<Activity> getGroupActivity(String openGId);

    List<Activity> getMyJoinActivity(String openId);

    void enroll(String openId, Long activityId, Integer type);

    List<UserInfo> getEnrolledInfo(Long activityId, Integer type);

    Integer getEnrolledType(String openId, Long activityId);

    void relateGroup(Long activityId, String openGId);
}
