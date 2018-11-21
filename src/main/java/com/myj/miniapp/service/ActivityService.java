package com.myj.miniapp.service;

import com.myj.miniapp.entity.Activity;

public interface ActivityService {
    Long createActivity(Activity activity);

    Activity getActivity(Long id);
}
