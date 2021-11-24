package com.parame.rnb.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestMethod;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.builders.ResponseMessageBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.ResponseMessage;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;
import java.util.List;

// http://localhost:8080/swagger-ui.html
// https://j5a505.p.ssafy.io/api/swagger-ui.html
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    // Docket Bean 단위로 버전 관리
    private String version;
    private String title;

    /**
     * Swagger UI 헤더 정보
     */
    private ApiInfo commonApiInfo() {
        return new ApiInfoBuilder()
                .title(title)
                .description("<h3>RNB API Reference for Developers</h3>")
                .version(version)
                .contact(new Contact("RNB", "https://j5a505.p.ssafy.io", "rrace7@naver.com"))
                .license("SSAFY License")
                .licenseUrl("https://www.ssafy.com/ksp/jsp/swp/etc/swpPrivacy.jsp")
                .build();
    }

    /**
     * version 1
     */
    @Bean
    public Docket apiV1() {
        version = "V1";
        title = "RNB API " + version;

        // global response message 설정
        List<ResponseMessage> responseMessages = new ArrayList<>();
        responseMessages.add(new ResponseMessageBuilder()
                .code(200)
                .message("OK. 성공")
                .build()
        );
        responseMessages.add(new ResponseMessageBuilder()
                .code(400)
                .message("Bad Request. 잘못된 요청 구문")
                .build()
        );
        responseMessages.add(new ResponseMessageBuilder()
                .code(401)
                .message("Unauthorized. 인증 실패")
                .build()
        );
        responseMessages.add(new ResponseMessageBuilder()
                .code(404)
                .message("Not Found. 요청한 리소스를 찾을 수 없음")
                .build()
        );
        responseMessages.add(new ResponseMessageBuilder()
                .code(500)
                .message("Internal Server Error. 서버 에러")
                .build()
        );

        // swagger에서 제공해주는 status code에 대한 기본 메세지를 제거
        // 각 Docket Bean의 version
        // ApiSelectorBuilder를 생성
        // 현재 RequestMapping으로 할당된 모든 URL 리스트를 추출
        // URL 필터링
        return new Docket(DocumentationType.SWAGGER_2)
                .useDefaultResponseMessages(false)
//                .groupName(version)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.parame.rnb"))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(commonApiInfo())
                .globalResponseMessage(RequestMethod.GET, responseMessages)
                .globalResponseMessage(RequestMethod.POST, responseMessages)
                .globalResponseMessage(RequestMethod.PUT, responseMessages)
                .globalResponseMessage(RequestMethod.PATCH, responseMessages)
                .globalResponseMessage(RequestMethod.DELETE, responseMessages);
    }

}
