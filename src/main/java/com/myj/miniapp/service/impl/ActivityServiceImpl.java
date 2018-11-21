package com.myj.miniapp.service.impl;

import com.myj.miniapp.entity.Activity;
import com.myj.miniapp.mapper.ActivityMapper;
import com.myj.miniapp.mapper.NoticeMapper;
import com.myj.miniapp.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        return activityMapper.getActivityById(id);
    }
}
