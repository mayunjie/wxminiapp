package com.myj.miniapp.mapper;

import com.myj.miniapp.entity.Activity;
import com.myj.miniapp.entity.ActivityEnroll;
import com.myj.miniapp.entity.ActivityInGroup;
import com.myj.miniapp.entity.UserInfo;

import java.util.List;
import java.util.Map;

public interface ActivityMapper {

    int insertActivity(Activity activity);

    Activity getActivityById(Long id);

    List<Activity> getMyCreateActivity(String openId);

    List<Activity> getGroupActivity(String openGId);

    List<Activity> getMyJoinActivity(String openId);

    int insertEnroll(ActivityEnroll enroll);

    List<UserInfo> getEnrolledUserInfo(Map<String, Object> param);

    Integer getEnrollType(Map<String, Object> param);

    int insertActivityInGroup(ActivityInGroup activityInGroup);
}
