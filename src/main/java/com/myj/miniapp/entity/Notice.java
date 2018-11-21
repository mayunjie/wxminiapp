package com.myj.miniapp.entity;

import lombok.Data;

import java.util.Date;

@Data
public class Notice {

    private Long id;

    private String openId;

    private String nickName;

    private String title;

    private String content;

    private Integer status;

    private Date createTime;

    private Date updateTime;

    private String showTime;
}
