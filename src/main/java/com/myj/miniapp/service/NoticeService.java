package com.myj.miniapp.service;

import com.myj.miniapp.entity.Notice;

import java.util.List;

public interface NoticeService {
    Long createNotice(Notice notice);

    Notice getNotice(Long id);

    int relateGroup(String openGId, String noticeId);

    List<Notice> getMyCreateNotice(String openId);

    List<Notice> getGroupNotice(String openGId);
}
