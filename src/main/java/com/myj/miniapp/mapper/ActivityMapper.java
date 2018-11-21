package com.myj.miniapp.mapper;

import com.myj.miniapp.entity.Activity;

import java.util.List;

public interface ActivityMapper {

    int insertActivity(Activity activity);

    Activity getActivityById(Long id);

    List<Activity> getMyCreateActivity(String openId);

    List<Activity> getGroupActivity(String openGId);
}
