package com.myj.miniapp.entity;

import lombok.Data;

import java.util.Date;

@Data
public class NoticeInGroup{

    private Long id;

    private String openGId;

    private String noticeId;

    private Date createTime;

    private Date updateTime;

    private Notice notice;
}
