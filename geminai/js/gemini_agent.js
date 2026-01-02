import { GoogleGenerativeAI } from "@google/generative-ai";
import { registerAgent } from "./base.js";

// API 키 설정 (보안을 위해 실제 서비스 시에는 백엔드 사용 권장)
const api_key = Array();
api_key.push("input geminai key");

const genAI = new GoogleGenerativeAI(api_key[1]);

const geminiAgent = {
    code: 'gemini',
    name: '구글제미나이',
    version: '1.0.0',
    models : {
        'gemini-2.0-flash':"Gemini 2.0 Flash (권장)",
        'gemini-2.5-flash':"긴문장 gemini-2.5-flash",
        'gemini-2.5-flash-lite':"긴문장 gemini-2.5-flash-lite",
        'gemini-3-flash':"긴문장 gemini-3-flash",
        'gemma-3-27b':"짧은문장 gemma-3-27b",
        'gemma-3-12b':"짧은문장 gemma-3-12b",
    },
    // 공통 인터페이스인 translate 함수 구현
    async RequestToAgent(text, promptInput, modelName) {
        try {
            // 모델 객체 생성
            const model = genAI.getGenerativeModel({ model: modelName });
            
            // 프롬프트 구성
            const prompt = `${promptInput}:\n\n${text}`;
            
            // API 호출
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            throw this.errorEvent(error);
        }
    },

    // 제미나이 사용중 에러 메세지 출력
    errorEvent(error) {
        console.error("Gemini Agent Error:", error);
        if (error.message && error.message.includes('429')) {
            return new Error("⚠️ 무료 사용량이 초과되었습니다. 잠시 후 다시 시도해주세요.");
        } else if (error.message && error.message.includes('404')) {
            return new Error("⚠️ 지원하지 않는 모델이거나 모델명이 잘못되었습니다.");
        } else if (error.message && error.message.includes('SAFETY')) {
            return new Error("⚠️ 안전 정책에 의해 답변이 차단되었습니다.");
        }
        return error;
    }
};

// 'gemini'라는 이름으로 에이전트 등록
registerAgent('gemini', geminiAgent);
