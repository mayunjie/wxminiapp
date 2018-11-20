package com.myj.miniapp.mapper;

import com.myj.miniapp.entity.Notice;
import com.myj.miniapp.entity.NoticeInGroup;

import java.util.List;

public interface NoticeMapper {

    int insertNotice(Notice notice);

    List<Notice> listNoticeByGroup(String openGId);

    Notice getNoticeById(Long id);

    int insertNoticeInGroup(NoticeInGroup noticeInGroup);

    List<Notice> listMyCreateNotice(String openId);
}
