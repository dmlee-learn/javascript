// 등록된 에이전트들을 저장할 객체
export const agents = {};

// 에이전트를 등록하는 함수
export function registerAgent(name, agent) {
    agents[name] = agent;
    selectBoxSetup();
    console.log(`Agent registered: ${name}`);
}

function selectBoxSetup() {
    //document.getElementById('agent')
    let agentSelectBox = document.getElementById('agent');
    if (!agentSelectBox) return;

    agentSelectBox.innerHTML = "";
    //agents에 등록된 항목을 셀렉트 박스로 추가하기
    for (let key in agents) {
        agentSelectBox.innerHTML += `<option value="${key}">${agents[key].name}</option>`;
    }
}

document.getElementById('agent').addEventListener('change', () =>{
    let modelSelectBox = document.getElementById('model');
    const selectetAgent = document.getElementById('agent').value;
    if (!modelSelectBox) return;

    modelSelectBox.innerHTML = "";
    //agents에 등록된 항목을 셀렉트 박스로 추가하기
    const models = agents[selectetAgent]['models'];
    for (let key in models) {
        modelSelectBox.innerHTML += `<option value="${key}">${models[key]}</option>`;
    }
});

// 모델 이름에 따라 적절한 에이전트를 찾는 함수
function getAgentForModel(modelName) {
    // 예: 모델명이 'gemini'나 'gemma'로 시작하면 gemini 에이전트 반환
    if (modelName.startsWith('gemini') || modelName.startsWith('gemma')) {
        return agents['gemini'];
    }
    // 추후 'gpt'로 시작하면 openai 에이전트 반환 등의 로직 추가 가능
    return null;
}

// UI 이벤트 리스너 설정
document.addEventListener('DOMContentLoaded', () => {
    const translateBtn = document.getElementById('translateBtn');
    
    if (translateBtn) {
        translateBtn.addEventListener('click', async () => {
            const text = document.getElementById('inputText').value;
            const selectedAgent = document.getElementById('agent').value;
            const selectedModel = document.getElementById('model').value;
            const promptInput = document.getElementById('prompt').value;
            const resultDiv = document.getElementById('result');

            if (!text) {
                alert("요청 내용을 입력해주세요.");
                return;
            }

            resultDiv.innerText = "진행 중...";

            const agent = getAgentForModel(selectedAgent);
            if (!agent) {
                resultDiv.innerText = `오류: '${selectedAgent}' 에이전트가 선택되지 않았습니다.`;
                return;
            }

            try {
                // 에이전트에게 번역 요청
                const result = await agent.RequestToAgent(text, promptInput, selectedModel);
                resultDiv.innerText = result;
            } catch (error) {
                console.error(error);
                agent.errorEvent(error);
                resultDiv.innerText = error.message;
            }
        });
    }
});