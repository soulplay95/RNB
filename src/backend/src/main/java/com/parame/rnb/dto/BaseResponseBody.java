package com.parame.rnb.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 기본 응답 Body
 */
@Getter
@Setter
@ApiModel("Base Response")
public class BaseResponseBody {

	@ApiModelProperty(value = "응답 메시지", example = "OK")
	String message = null;
	@ApiModelProperty(value = "응답 코드", example = "200")
	Integer statusCode = null;
	
	public BaseResponseBody() {}
	
	public BaseResponseBody(Integer statusCode){
		this.statusCode = statusCode;
	}
	
	public BaseResponseBody(Integer statusCode, String message){
		this.statusCode = statusCode;
		this.message = message;
	}
	
	public static BaseResponseBody of(Integer statusCode, String message) {
		BaseResponseBody body = new BaseResponseBody();
		body.message = message;
		body.statusCode = statusCode;

		return body;
	}

}
