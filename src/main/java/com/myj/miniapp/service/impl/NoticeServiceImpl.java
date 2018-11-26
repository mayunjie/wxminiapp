package com.myj.miniapp.service.impl;

import com.myj.miniapp.entity.Notice;
import com.myj.miniapp.entity.NoticeInGroup;
import com.myj.miniapp.mapper.NoticeMapper;
import com.myj.miniapp.service.NoticeService;
import com.myj.miniapp.util.TimeUtils;
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
        Notice notice = noticeMapper.getNoticeById(id);
        notice.setShowTime(TimeUtils.convertDate(notice.getCreateTime()));
        return  notice;
    }

    @Override
    public int relateGroup(String openGId, Long noticeId){
        NoticeInGroup noticeInGroup = new NoticeInGroup();
        noticeInGroup.setOpenGId(openGId);
        noticeInGroup.setNoticeId(noticeId);
        return noticeMapper.insertNoticeInGroup(noticeInGroup);
    }

    @Override
    public List<Notice> getMyCreateNotice(String openId){
        List<Notice> noticeList = noticeMapper.listMyCreateNotice(openId);
        setShowTime(noticeList);
        return noticeList;
    }

    @Override
    public List<Notice> getGroupNotice(String openGId){
        List<Notice> noticeList = noticeMapper.listNoticeByGroup(openGId);
        setShowTime(noticeList);
        return noticeList;
    }

    private void setShowTime(List<Notice> noticeList){
        for (Notice notice : noticeList){
            notice.setShowTime(TimeUtils.convertDate(notice.getCreateTime()));
        }
    }
}
