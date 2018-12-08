package com.myj.miniapp.entity;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 活动
 */
@Data
public class Activity {
    private Long id;

    private Date createTime;

    private Date updateTime;

    private String openId;

    private String title;

    private Date activityTime;

    private String position;

    private String nickName;

    private String phone;

    private String remark;

    private Integer limitNumber;

    private Integer status;

    private String day;

    private String hour;

    private BigDecimal latitude;

    private BigDecimal longitude;

    /**
     * 判断是否过期
     */
    private boolean deadLine;
}
