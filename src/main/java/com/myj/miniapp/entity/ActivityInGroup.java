package com.myj.miniapp.entity;

import lombok.Data;

import java.util.Date;

@Data
public class ActivityInGroup {

    private Long id;

    private String openGId;

    private Long activityId;

    private Date createTime;

    private Date updateTime;

    private Activity activity;
}
