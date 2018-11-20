package com.myj.miniapp.interceptor;

import com.alibaba.fastjson.JSONObject;
import com.myj.miniapp.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

@Component
public class SessionInterceptor implements HandlerInterceptor {

    @Autowired
    private SessionService sessionService;

    /**
     * 过滤session
     * @param request
     * @param response
     * @param handler
     * @return
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception{
        String token = request.getHeader("token");
        //token过期
        if(!sessionService.checkSession(token)){
            PrintWriter writer = null;
            try{
                JSONObject result = new JSONObject();
                result.put("code", "501");
                result.put("msg", "session timeout");
                writer = response.getWriter();
                writer.print(result);
                response.flushBuffer();
            }finally {
                if(writer != null){
                    writer.close();
                }
            }
            return false;
        }
        return true;
    }
}
