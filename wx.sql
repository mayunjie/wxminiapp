CREATE TABLE `activity` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增主键id',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `open_id` varchar(50) NOT NULL COMMENT '用户wxopenid',
  `nick_name` varchar(100) DEFAULT NULL COMMENT '昵称',
  `title` varchar(50) DEFAULT NULL COMMENT '活动标题',
  `activity_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '活动时间',
  `position` varchar(100) DEFAULT NULL COMMENT '活动地点',
  `phone` varchar(20) DEFAULT NULL COMMENT '联系方式',
  `remark` varchar(512) DEFAULT NULL COMMENT '备注',
  `limit_number` int(11) DEFAULT NULL COMMENT '限制人数',
  `status` tinyint(4) DEFAULT '1' COMMENT '活动状态 0-已删除 1-正常',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='活动表';

CREATE TABLE `activity_enroll` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增主键id',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `activity_id` bigint(20) NOT NULL COMMENT '活动id',
  `open_id` varchar(100) NOT NULL COMMENT '用户openid',
  `type` tinyint(4) NOT NULL COMMENT '类型 1-报名 2-请假',
  PRIMARY KEY (`id`),
  UNIQUE KEY `activity_user` (`activity_id`,`open_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='群活动报名请假表';

CREATE TABLE `group_activity_relation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增主键id',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `open_group_id` varchar(50) NOT NULL COMMENT '微信群组id',
  `activity_id` bigint(20) NOT NULL COMMENT '活动',
  `status` tinyint(4) DEFAULT '1' COMMENT '群组活动状态 0-已删除 1-正常',
  PRIMARY KEY (`id`),
  UNIQUE KEY `activity_group` (`activity_id`,`open_group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='群活动关联表';

CREATE TABLE `group_notice_relation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增主键id',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `open_group_id` varchar(50) NOT NULL COMMENT '微信群组id',
  `notice_id` bigint(20) NOT NULL COMMENT '公告id',
  `status` tinyint(4) DEFAULT '1' COMMENT '群组公告状态 0-已删除 1-正常',
  PRIMARY KEY (`id`),
  UNIQUE KEY `notice_group` (`notice_id`,`open_group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='群组公告关联表';

CREATE TABLE `notice` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增主键id',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `open_id` varchar(50) NOT NULL COMMENT '微信id',
  `nick_name` varchar(100) NOT NULL COMMENT '昵称',
  `title` varchar(100) DEFAULT '' COMMENT '标题',
  `content` text COMMENT '内容',
  `status` tinyint(4) DEFAULT '1' COMMENT '公告状态 0-已删除 1-正常',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='公告';

CREATE TABLE `wx_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增主键id, user_id',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `open_id` varchar(50) NOT NULL COMMENT '微信id',
  `nick_name` varchar(100) NOT NULL COMMENT '昵称',
  `gender` tinyint(4) DEFAULT '1' COMMENT '性别 1-男，2-女',
  `language` varchar(50) DEFAULT NULL COMMENT '语言',
  `city` varchar(50) DEFAULT NULL COMMENT '城市',
  `province` varchar(50) DEFAULT NULL COMMENT '省份',
  `country` varchar(50) DEFAULT NULL COMMENT '国家',
  `avatar_url` varchar(500) DEFAULT NULL COMMENT '头像封面地址',
  `age` int(11) DEFAULT NULL COMMENT '年龄',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='用户表';