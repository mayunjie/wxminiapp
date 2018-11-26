package com.myj.miniapp.util;

import org.apache.commons.lang3.StringUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class TimeUtils {

    public static final String FORMAT = "yyyy-MM-dd hh:mm:ss";

    public static final String HOUR_FORMAT = "yyyy-MM-dd hh:mm";

    public static final String UNTIL_DAY = "yyyy-MM-dd";

    public static final String UNTIL_HOUR = "hh:mm";


    public static String convertDate(Date date){
        return convertDate(date, FORMAT);
    }
    public static String convertDate(Date date, String formatStr){
        if(date == null){
            return StringUtils.EMPTY;
        }
        if(StringUtils.isBlank(formatStr)){
            formatStr = FORMAT;
        }
        SimpleDateFormat format = new SimpleDateFormat(formatStr);
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
        Date date = new Date();
        System.out.println(convertDate(date, UNTIL_HOUR));
    }
}
