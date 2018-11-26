package com.myj.miniapp.entity;

import lombok.Data;

import java.util.Date;

/**
 * 活动报名
 */
@Data
public class ActivityEnroll {

    private Long id;

    private Date createTime;

    private Date updateTime;

    private Long activityId;

    private String openId;

    private Integer type;
}
