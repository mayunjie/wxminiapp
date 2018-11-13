package com.myj.miniapp.entity;

import lombok.Data;

import java.util.Date;

@Data
public class UserInfo {

    private Long id;

    private Date createTime;

    private Date updateTime;

    private String openId;

    private String nickName;

    private Integer gender;

    private String language;

    private String city;

    private String province;

    private String country;

    private String avatarUrl;

    private Integer age;

    private Integer grade;
}
