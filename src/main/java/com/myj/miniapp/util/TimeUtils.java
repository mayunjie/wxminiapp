package com.myj.miniapp.util;

import org.apache.commons.lang3.StringUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class TimeUtils {

    public static final String FORMAT = "yyyy-MM-dd hh:mm:ss";

    public static final String HOUR_FORMAT = "yyyy-MM-dd hh:mm";

    public static String convertDate(Date date){
        if(date == null){
            return StringUtils.EMPTY;
        }
        SimpleDateFormat format = new SimpleDateFormat(FORMAT);
        return format.format(date);
    }

    public static Date stringToDate(String timeStr, String formatStr){
        SimpleDateFormat format = new SimpleDateFormat(formatStr);
        try{
            return format.parse(timeStr);
        }catch (ParseException e){
            e.printStackTrace();
            return null;
        }
    }


    public static void main(String[] args) {
        String str = "2018-11-11 21:29";
        System.out.println(stringToDate(str, HOUR_FORMAT));
    }
}
