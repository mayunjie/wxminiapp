package com.myj.miniapp.service.impl;

import com.myj.miniapp.entity.Notice;
import com.myj.miniapp.entity.NoticeInGroup;
import com.myj.miniapp.mapper.NoticeMapper;
import com.myj.miniapp.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeServiceImpl implements NoticeService {

    @Autowired
    private NoticeMapper noticeMapper;

    /**
     * 创建公告，返回新创建的公告id
     * @param notice
     * @return
     */
    @Override
    public Long createNotice(Notice notice){
        noticeMapper.insertNotice(notice);
        return notice.getId();
    }

    @Override
    public Notice getNotice(Long id){
        return noticeMapper.getNoticeById(id);
    }

    @Override
    public int relateGroup(String openGId, String noticeId){
        NoticeInGroup noticeInGroup = new NoticeInGroup();
        noticeInGroup.setOpenGId(openGId);
        noticeInGroup.setNoticeId(noticeId);
        return noticeMapper.insertNoticeInGroup(noticeInGroup);
    }

    @Override
    public List<Notice> getMyCreateNotice(String openId){
        return noticeMapper.listMyCreateNotice(openId);
    }

    @Override
    public List<Notice> getGroupNotice(String openGId){
        return noticeMapper.listNoticeByGroup(openGId);
    }
}
